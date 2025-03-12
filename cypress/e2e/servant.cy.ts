describe('template spec', () => {
  it('passes', () => {
    cy.visit('/servant')
    cy.contains('Servant').should('be.visible')
  })
})
