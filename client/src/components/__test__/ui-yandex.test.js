import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

describe('Тестирование компонента Login', () => {

	it('Кнопка без текста рендерится без ошибок', () => {
		const button = TestRenderer
			.create(<Button htmlType="button"/>)
			.toJSON()
		expect(button).toMatchSnapshot()
	})

	it('Кнопка c типом secondary рендерится без ошибок', () => {
		const button = TestRenderer
			.create(<Button htmlType="button" type="secondary"/>)
			.toJSON()
		expect(button).toMatchSnapshot()
	})

	it('Кнопка с htmlType="submit" рендерится без ошибок', () => {
		const button = TestRenderer
			.create(<Button htmlType="submit"/>)
			.toJSON()
		expect(button).toMatchSnapshot()
	})

	it('Кнопка size="small" рендерится без ошибок', () => {
		const button = TestRenderer
			.create(<Button htmlType="button" size="small"/>)
			.toJSON()
		expect(button).toMatchSnapshot()
	})

	it('Кнопка size="medium" рендерится без ошибок', () => {
		const button = TestRenderer
			.create(<Button htmlType="button" size="medium"/>)
			.toJSON()
		expect(button).toMatchSnapshot()
	})

	it('Кнопка size="large" рендерится без ошибок', () => {
		const button = TestRenderer
			.create(<Button htmlType="button" size="large"/>)
			.toJSON()
		expect(button).toMatchSnapshot()
	})

	it('EmailInput рендерится без ошибок', () => {
		const emailInput = TestRenderer
			.create(<EmailInput value='test'/>)
			.toJSON()
		expect(emailInput).toMatchSnapshot()
	})

	it('PasswordInput рендерится без ошибок', () => {
		const passwordInput = TestRenderer
			.create(<PasswordInput value='test'/>)
			.toJSON()
		expect(passwordInput).toMatchSnapshot()
	})
})