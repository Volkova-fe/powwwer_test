import { dataCyForm, dataCyInputEmail, dataCyInputName, dataCyInputPassword, dataCyRegister } from "../constants";

describe('Correct operation registration page', () => {
	beforeEach(() => {
		cy.visit(`/register`)
	});
	it('Inputs are empty, then the registration button is disabled', function () {
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInputName).should('have.value', '')
				cy.get(dataCyInputEmail).should('have.value', '')
				cy.get(dataCyInputPassword).should('have.value', '')
				cy.get(dataCyRegister).should('be.disabled')
			})
	})
	it('Input name are empty, then the registration button is disabled', function () {
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInputName).should('have.value', '')
				cy.get(dataCyInputEmail).type('hello123@ya.ru')
				cy.get(dataCyInputPassword).type('hello123')
				cy.get(dataCyRegister).should('be.disabled')
			})
	})
	it('Input email are empty, then the registration button is disabled', function () {
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInputName).type('Maria')
				cy.get(dataCyInputEmail).should('have.value', '')
				cy.get(dataCyInputPassword).type('hello123')
				cy.get(dataCyRegister).should('be.disabled')
			})
	})
	it('Input password are empty, then the registration button is disabled', function () {
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInputName).type('Maria')
				cy.get(dataCyInputEmail).type('hello123@ya.ru')
				cy.get(dataCyInputPassword).should('have.value', '')
				cy.get(dataCyRegister).should('be.disabled')
			})
	})
	it('Inputs are full, the mail is incorrect, an error appears', function () {
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInputName).type('Maria')
				cy.get(dataCyInputEmail).type('hello123')
				cy.get(dataCyInputPassword).type('hello123')
				cy.get('.pb-6').children().contains('p','Ой, произошла ошибка!')
			})
	})
	it('Success registration', function () {
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInputName).type('Maria')
				cy.get(dataCyInputEmail).type('hello123@ya.ru')
				cy.get(dataCyInputPassword).type('hello123')
				cy.get(dataCyRegister).should('be.not.disabled').click()
				cy.visit('/profile')
			})
	})
}); 