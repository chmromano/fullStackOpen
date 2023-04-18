describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to the application");
    cy.contains("Username:");
    cy.contains("Password:");
    cy.contains("Login").click();
  });

  it("Login with incorrect credentials displays error", function () {
    cy.contains("Login").click();
    cy.get(".error")
      .should("contain", "Incorrect credentials")
      .and("have.css", "color", "rgb(255, 0, 0)");
  });
});
