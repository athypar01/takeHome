describe('friends-profile', () => {
  beforeEach(() => cy.visit('/'));

  it('should display title', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.contains('Users');
  });
});
