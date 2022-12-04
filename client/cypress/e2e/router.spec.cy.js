describe('Сервер доступен', function () {
	beforeEach(() => {
		cy.visit('');
	})
	it('Доступен по адресу localhost:3000/registration', function () {
		cy.contains('Зарегистрироваться')
		cy.get('a[href*="/register"]').click()
		cy.contains('Регистрация')
	});
	it('Не доступен по адресу localhost:3000/profile без авторизации', function () {
		cy.visit('/profile');
		cy.contains('Вход')
	});
});