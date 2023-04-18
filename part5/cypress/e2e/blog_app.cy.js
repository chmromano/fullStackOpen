describe("Blog app", function () {
  const user = {
    name: "Din Djarin,",
    password: "thecreed",
    username: "mando",
  };

  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("login form is shown", function () {
    cy.contains("Log in to the application");
    cy.contains("Username:");
    cy.contains("Password:");
    cy.contains("Login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("mando");
      cy.get("#password").type("thecreed");
      cy.contains("Login").click();

      cy.get(".success")
        .should("contain", "Successfully logged in")
        .and("have.css", "color", "rgb(0, 128, 0)");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("yoda");
      cy.get("#password").type("theforce");
      cy.contains("Login").click();

      cy.get(".error")
        .should("contain", "Incorrect credentials")
        .and("have.css", "color", "rgb(255, 0, 0)");

      cy.get("html").should("not.contain", `Logged in as ${user.username}`);
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", `${Cypress.env("BACKEND")}/login`, user).then(
        (response) => {
          localStorage.setItem(
            "loggedBlogAppUser",
            JSON.stringify(response.body)
          );
          cy.visit("");
        }
      );
    });

    it("a blog can be created", function () {
      const blog = {
        author: "Cypress",
        title: "A blog created by Cypress",
        url: "https://cypress.com/i-created-this-note",
      };

      cy.get(".togglableComponentShowButton").click();

      cy.get("#blogTitle").type(blog.title);
      cy.get("#blogAuthor").type(blog.author);
      cy.get("#blogUrl").type(blog.url);

      cy.get(".blogFormSubmitButton").click();

      cy.get(".success")
        .should(
          "contain",
          `Successfully added blog "${blog.title}" by ${blog.author}`
        )
        .and("have.css", "color", "rgb(0, 128, 0)");
      cy.contains(`${blog.title} ${blog.author}`);
    });
  });
});
