import { dataCyForm, dataCyInputEmail, dataCyInputPassword, dataCyLogin } from "../constants";

describe('Correct operation login page', () => {
	beforeEach(() => {
		cy.visit(`/`)
	});
	it('Inputs are empty, then the login button is disabled', function () {
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInputEmail).should('have.value', '')
				cy.get(dataCyInputPassword).should('have.value', '')
				cy.get(dataCyLogin).should('be.disabled')
			})
	})
	it('Input email are empty, then the login button is disabled', function () {
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInputEmail).should('have.value', '')
				cy.get(dataCyInputPassword).type('hello123')
				cy.get(dataCyLogin).should('be.disabled')
			})
	})
	it('Input password are empty, then the login button is disabled', function () {
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInputEmail).type('hello123@ya.ru')
				cy.get(dataCyInputPassword).should('have.value', '')
				cy.get(dataCyLogin).should('be.disabled')
			})
	})
	it('Inputs are full, the mail is incorrect, an error appears', function () {
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInputEmail).type('hello123')
				cy.get(dataCyInputPassword).type('hello123')
				cy.get('.pb-6').children().contains('p','Ой, произошла ошибка!')
			})
	})
	it('Success login', function () {
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInputEmail).type('hello1@ya.ru')
				cy.get(dataCyInputPassword).type('hello123')
				cy.get(dataCyLogin).should('be.not.disabled').click()
				cy.visit('/profile')
			})
	})
}); 