describe('<ServantPage />', () => {
  before(() => cy.visit('/servant'))

  it('show "Servant" text in page', () => {
    cy.contains('Servant')
  })
})
