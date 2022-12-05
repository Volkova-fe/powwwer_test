import { 
	dataCyBreakEnd, 
	dataCyBreakStart, 
	dataCyEndDay, 
	dataCyForm, 
	dataCyInputEmail, 
	dataCyInputPassword, 
	dataCyLogin, 
	dataCyLogout, 
	dataCyRemoveUser, 
	dataCyReportRangeDay, 
	dataCyReportSelectDay, 
	dataCyStartDay 
} from "../constants";

describe('Correct operation registration page', () => {
	beforeEach(() => {
		cy.visit(`/`)
		cy.get(dataCyForm)
		.within(() => {
			cy.get(dataCyInputEmail).type('hello123@ya.ru')
			cy.get(dataCyInputPassword).type('hello123')
			cy.get(dataCyLogin).should('be.not.disabled').click()
			cy.visit('/profile')
		})
	});

	it('Button start day working correctly', function () {
		cy.get(dataCyStartDay).click().should('have.text', 'Закончил')
		cy.get(dataCyBreakStart).should('be.not.disabled')
		cy.get(dataCyReportSelectDay).should('be.not.disabled')
		cy.get(dataCyReportRangeDay).should('be.not.disabled')
		cy.get(dataCyLogout).should('be.disabled')
		cy.get(dataCyRemoveUser).should('be.disabled')
	})

	it('Button end day working correctly', function () {
		cy.get(dataCyStartDay).click().should('have.text', 'Закончил')
		cy.get(dataCyEndDay).click().should('have.text', 'Начал')
		cy.get(dataCyBreakStart).should('be.disabled')
		cy.get(dataCyReportSelectDay).should('be.not.disabled')
		cy.get(dataCyReportRangeDay).should('be.not.disabled')
		cy.get(dataCyLogout).should('be.not.disabled')
		cy.get(dataCyRemoveUser).should('be.not.disabled')
	})

	it('Button breake start working correctly', function () {
		cy.get(dataCyStartDay).click().should('have.text', 'Закончил')
		cy.get(dataCyBreakStart).should('be.not.disabled').click()
		cy.get(dataCyEndDay).should('be.disabled')
		cy.get(dataCyReportSelectDay).should('be.not.disabled')
		cy.get(dataCyReportRangeDay).should('be.not.disabled')
		cy.get(dataCyLogout).should('be.disabled')
		cy.get(dataCyRemoveUser).should('be.disabled')
	})

	it('Button breake end working correctly', function () {
		cy.get(dataCyStartDay).click().should('have.text', 'Закончил')
		cy.get(dataCyBreakStart).should('be.not.disabled').click()
		cy.get(dataCyBreakEnd).should('be.not.disabled').click()
		cy.get(dataCyEndDay).should('be.not.disabled')
		cy.get(dataCyReportSelectDay).should('be.not.disabled')
		cy.get(dataCyReportRangeDay).should('be.not.disabled')
		cy.get(dataCyLogout).should('be.disabled')
		cy.get(dataCyRemoveUser).should('be.disabled')
	})
	it('Button report select day correctly', function () {
		cy.get(dataCyReportSelectDay).should('be.not.disabled').click()

	})
	it('Button report range day correctly', function () {
		cy.get(dataCyReportRangeDay).should('be.not.disabled').click()
	})
}); 