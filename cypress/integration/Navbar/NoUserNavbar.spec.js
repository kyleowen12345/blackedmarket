describe('Nav Menus', () => {
    context('720p resolution', () => {
      beforeEach(() => {
        cy.visit(`${Cypress.env('base_url')}`)
        // run these tests as if in a desktop
        // browser with a 720p monitor
        cy.viewport(1280, 720)
      })
  
      it('displays full header', () => {
    cy.get('#navbar').contains('Register').should('be.visible')
    cy.get('#navbar').contains('Stores').should('be.visible')
    cy.get('#navbar').contains('Products').should('be.visible')
    cy.get('#navbar').contains('Login').should('be.visible')
      })
    })
  
    context('iphone-5 resolution', () => {
      beforeEach(() => {
        cy.visit(`${Cypress.env('base_url')}`)
        // run these tests as if in a mobile browser
        // and ensure our responsive UI is correct
        cy.viewport('iphone-5')
      })
  
      it('displays mobile menu on click', () => {
        cy.get('#navbar').contains('Register').should('be.visible')
        cy.get('#humberger-icon').should('be.visible').click()
        cy.contains('BlackedMarket')
        cy.get('a').contains('Stores')
        cy.get('a').contains('Products')
        cy.get('a').contains('Login')
      })
    })
  })
  