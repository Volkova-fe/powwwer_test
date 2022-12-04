import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLoginFormValue, singIn } from '../../services/actions/auth';
import { Link, Redirect, useLocation } from 'react-router-dom';
import styles from './login.module.css';


export const Login = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const { email, password } = useSelector(state => state.auth.form);
	const { auth } = useSelector(state => state.auth);

	//put input value in store Auth
	const onChange = (e) => {
		dispatch(setLoginFormValue(e.target.name, e.target.value));
	}
	//login request
	const onFormSubmit = (e) => {
		e.preventDefault();
		dispatch(singIn(email, password));
	}
	//Redirect user to Profile if auth true
	if (auth) {
		return (<Redirect to={location.state?.from || '/profile'} />);
	}

	return (
		<div className={styles.container}>
			<h2 className={`${styles.title} text text_type_main-medium pb-6`}>Вход</h2>
			<form
				className={styles.form}
				autoComplete="off"
				onSubmit={onFormSubmit}
			>
				<div className="pb-6">
					<EmailInput
						onChange={onChange}
						value={email}
						name={'email'}
						size="default"

					/>
				</div>
				<div className="pb-6">
					<PasswordInput
						onChange={onChange}
						value={password}
						name={'password'}
						size="default"

					/>
				</div>
				<Button
					htmlType="submit"
					type="primary"
					size="medium"
				>
					Войти
				</Button>
			</form>
			<p className="text text_type_main-default text_color_inactive pt-20 pb-4">
				Вы — новый пользователь?
				<Link
					className={styles.link}
					to='/register'
				>
					Зарегистрироваться
				</Link>
			</p>
		</div >)
}