describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Din Djarin,",
      password: "thecreed",
      username: "mando",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("Login form is shown", function () {
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
    });
  });
});
