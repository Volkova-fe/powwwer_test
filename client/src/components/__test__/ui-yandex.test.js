import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

describe('Тестирование компонента Login', () => {

	it('Кнопка без текста рендерится без ошибок', () => {
		const button = TestRenderer
			.create(<Button />)
			.toJSON()
		expect(button).toMatchSnapshot()
	})

	it('Кнопка c типом secondary рендерится без ошибок', () => {
		const button = TestRenderer
			.create(<Button type="secondary"/>)
			.toJSON()
		expect(button).toMatchSnapshot()
	})

	it('Кнопка с htmlType="button" рендерится без ошибок', () => {
		const button = TestRenderer
			.create(<Button htmlType="button"/>)
			.toJSON()
		expect(button).toMatchSnapshot()
	})

	it('Кнопка с htmlType="submit" рендерится без ошибок', () => {
		const button = TestRenderer
			.create(<Button htmlType="submit"/>)
			.toJSON()
		expect(button).toMatchSnapshot()
	})

	it('Кнопка без текста рендерится без ошибок', () => {
		const button = TestRenderer
			.create(<Button />)
			.toJSON()
		expect(button).toMatchSnapshot()
	})

	it('Кнопка size="small" рендерится без ошибок', () => {
		const button = TestRenderer
			.create(<Button size="small"/>)
			.toJSON()
		expect(button).toMatchSnapshot()
	})

	it('Кнопка size="medium" рендерится без ошибок', () => {
		const button = TestRenderer
			.create(<Button size="medium"/>)
			.toJSON()
		expect(button).toMatchSnapshot()
	})

	it('Кнопка size="large" рендерится без ошибок', () => {
		const button = TestRenderer
			.create(<Button size="large"/>)
			.toJSON()
		expect(button).toMatchSnapshot()
	})

	it('Нажатие на кнопку вызывает колбек', () => {
		window.alert = jest.fn();

		render(<Button data-testId="button" onClick={() => { alert('Успешный вызов колбека') }} />)

		const button = screen.getByTestId("button");
		fireEvent.click(button);

		expect(window.alert).toHaveBeenCalledWith('Успешный вызов колбека');
	});

	it('EmailInput без текста рендерится без ошибок', () => {
		const emailInput = TestRenderer
			.create(<EmailInput />)
			.toJSON()
		expect(emailInput).toMatchSnapshot()
	})

	it('PasswordInput без текста рендерится без ошибок', () => {
		const passwordInput = TestRenderer
			.create(<PasswordInput />)
			.toJSON()
		expect(passwordInput).toMatchSnapshot()
	})
})