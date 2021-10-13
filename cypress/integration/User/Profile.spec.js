describe('My First Test', () => {
  context('macbook-15 resolution', () => {
  beforeEach(() => {
    cy.login('postman@gmail.com', 'postman')
    cy.viewport('macbook-15')
  })
    it('Visit to Blacked Market Profile Page', () => {
        cy.visit(`${Cypress.env('base_url')}user/profile`)

        cy.contains('My Profile')

        cy.get('a').contains('Edit Details').click()
        cy.url().should('contain', `${Cypress.env('base_url')}user/profile?page=update`)
        cy.get('#username').clear().type('postman_on_macbook15')
        cy.get('button').contains('Confirm').click()
        cy.get('.css-ujci2j').type('postman')
        cy.get('button').contains('Submit').click()
        cy.get('.css-5qumcq').contains('Save Changes').click()
        cy.url().should('contain', `${Cypress.env('base_url')}user/profile`)

            
    })
  })
  context('iphone-5 resolution', () => {
    beforeEach(() => {
      cy.login('postman@gmail.com', 'postman')
      cy.viewport('iphone-5')
    })
      it('Visit to Blacked Market Profile Page', () => {
          cy.visit(`${Cypress.env('base_url')}user/profile`)
  
          cy.contains('My Profile')
  
          cy.get('a').contains('Edit Details').click({force: true})
          cy.url().should('contain', `${Cypress.env('base_url')}user/profile?page=update`)
          cy.get('#username').clear({force: true}).type('postman_on_ip5')
          cy.get('button').contains('Confirm').click({force: true})
          cy.get('.css-ujci2j').type('postman')
          cy.get('button').contains('Submit').click({force: true})
          cy.get('.css-5qumcq').contains('Save Changes').click({force: true})
          cy.url().should('contain', `${Cypress.env('base_url')}user/profile`)
  
              
      })
    })
  })