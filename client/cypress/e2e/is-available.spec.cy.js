it('Must be available at localhost:3000', function () {
	cy.visit('/');
	cy.contains('Вход')
});