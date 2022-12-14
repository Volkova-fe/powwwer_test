import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { registerUser, setRegisterFormValue } from '../../services/actions/auth';
import styles from './register.module.css';


export const Register = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const { email, password, name } = useSelector(state => state.auth.form);
	const { auth } = useSelector(state => state.auth);

	//put input value in store Auth
	const onChange = e => {
		dispatch(setRegisterFormValue(e.target.name, e.target.value));
	}

	const onFormSubmit = e => {
		e.preventDefault();
		dispatch(registerUser(email, password, name));
	}
	//Redirect user to Profile if auth true
	if (auth) {
		return (<Redirect to={location.state?.from || '/profile'} />);
	}

	return (
		<div className={styles.container}>
			<h2 className={`${styles.title} text text_type_main-medium pb-6`}>Регистрация</h2>
			<form
				className={styles.form}
				onSubmit={onFormSubmit}
				data-cy="form"
			>
				<div className="pb-6">
					<Input
						type={'text'}
						placeholder={'Имя'}
						onChange={onChange}
						value={name}
						name={'name'}
						error={false}
						size={'default'}
						data-cy="inputName"
					/>
				</div>
				<div className="pb-6">
					<EmailInput
						onChange={onChange}
						value={email}
						name={'email'}
						size="default"
						data-cy="inputEmail"

					/>
				</div>
				<div className="pb-6">
					<PasswordInput
						onChange={onChange}
						value={password}
						name={'password'}
						size="default"
						data-cy="inputPassword"
					/>
				</div>
				<Button
					htmlType="submit"
					type="primary"
					size="medium"
					data-cy="register"
					disabled={!email || !password || !name}
				>
					Зарегистрироваться
				</Button>
			</form>
			<p className="text text_type_main-default text_color_inactive pt-20 pb-4">
				Уже зарегистрированы?
				<Link
					className={styles.link}
					to='/'>
					Войти
				</Link>
			</p>
		</div >)
}