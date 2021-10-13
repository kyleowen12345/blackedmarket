describe('Nav Menus', () => {
    context('720p resolution', () => {
      beforeEach(() => {
        cy.login('postman@gmail.com', 'postman')
        // run these tests as if in a desktop
        // browser with a 720p monitor
        cy.viewport(1280, 720)
      })
  
      it('displays full header', () => {
        cy.get('#usercart').should('be.visible')
        cy.get('#usermenu').should('be.visible')
      })
    })
  
    context('iphone-5 resolution', () => {
      beforeEach(() => {
        cy.login('postman@gmail.com', 'postman')
        // run these tests as if in a mobile browser
        // and ensure our responsive UI is correct
        cy.viewport('iphone-5')
      })
  
      it('displays mobile menu on click', () => {
        cy.get('#usercart').should('be.visible')
        cy.get('#humberger-icon').should('be.visible').click()
        cy.get('img').should('be.visible')
        cy.contains('Log Out')
      })
    })
  })
  