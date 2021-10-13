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

Cypress.Commands.add('login', (email, password) => {
    cy.visit(`${Cypress.env('base_url')}login`)
    
    cy.get('#navbar').contains('Register')
    cy.get('#navbar').contains('Stores')
    cy.get('#navbar').contains('Products')
    cy.get('#navbar').contains('Login')
  

    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('button').contains('Sign in').click()
    cy.url().should('contain', '/')

    cy.get('#usercart').should('be.visible')
    cy.get('#usermenu').should('be.visible')
  })
  