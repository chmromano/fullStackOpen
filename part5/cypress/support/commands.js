// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (user) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, user).then(
    (response) => {
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(response.body)
      );
      cy.visit("");

      return cy.wrap(response.body);
    }
  );
});

Cypress.Commands.add("logout", (blog, token) => {
  cy.request({
    body: blog,
    headers: {
      authorization: `Bearer ${token.token}`,
    },
    method: "POST",
    url: `${Cypress.env("BACKEND")}/blogs`,
  }).then(() => cy.visit(""));
});

Cypress.Commands.add("createBlog", (blog, token) => {
  cy.request({
    body: blog,
    headers: {
      authorization: `Bearer ${token.token}`,
    },
    method: "POST",
    url: `${Cypress.env("BACKEND")}/blogs`,
  }).then(() => cy.visit(""));
});
