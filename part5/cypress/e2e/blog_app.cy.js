describe("Blog app", function () {
  const user1 = {
    name: "Din Djarin",
    password: "thecreed",
    username: "mando",
  };

  const user2 = {
    name: "Sheev Palpatine",
    password: "unlimitedpower",
    username: "the_senate",
  };

  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user1);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);
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

      cy.get("html").should("not.contain", `Logged in as ${user1.username}`);
    });
  });

  describe("When logged in", function () {
    let token;
    const blog = {
      author: "Cypress",
      title: "A blog created by Cypress",
      url: "https://cypress.com/i-created-this-blog",
    };

    beforeEach(function () {
      cy.login(user1).then((value) => (token = value));
    });

    it("a blog can be created", function () {
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

    describe("When a blog is created", function () {
      beforeEach(function () {
        cy.createBlog(blog, token);
      });

      it("blog details can be shown", function () {
        cy.get(".blogDetailsButton").click();

        cy.get(".hiddenBlogDetails")
          .should("contain", blog.url)
          .and("contain", user1.username);
      });

      it("a blog can be liked", function () {
        cy.get(".blogDetailsButton").click();

        cy.get(".blogLikes").contains("0");

        cy.get(".blogLikeButton").click();

        cy.get(".blogLikes").contains("1");
      });

      it("the user who created it can delete it", function () {
        cy.contains(`${blog.title} ${blog.author}`);

        cy.get(".blogDetailsButton").click();
        cy.get("#blogDeleteButton").click();

        cy.get("html").should("not.contain", `${blog.title} ${blog.author}`);
      });

      it("other users cannot see the delete button", function () {
        cy.get("#logoutButton").click();

        cy.login(user2);

        cy.get(".blogDetailsButton").click();
        cy.get(".hiddenBlogDetails")
          .should("contain", blog.url)
          .and("contain", user1.username);
        cy.get("#blogDeleteButton").should("not.exist");
      });
    });
  });
});
