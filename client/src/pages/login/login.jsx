import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import styles from './login.module.css';
import { authAPI } from '../../services/authServices';
import { setInputFormValue } from '../../services/actions/authActions';
import { getCookie } from '../../utils/utils';


export const Login = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const { email, password } = useSelector(state => state.auth.form);
	const { auth } = useSelector(state => state.auth);
	const cookie = getCookie('token')

	const [loginUser] = authAPI.useLoginUserMutation();

	//put input value in store Auth
	const onChange = (e) => {
		dispatch(setInputFormValue(e.target.name, e.target.value));
	}

	//login request
	const onFormSubmit = async (e) => {
		e.preventDefault();
		await loginUser({ email, password })
	}

	//Redirect user to Profile if auth true
	if (cookie && auth) {
		return (<Redirect to={location.state?.from || '/profile'} />);
	}

	return (
		<div className={styles.container}>
			<h2 className={`${styles.title} text text_type_main-medium pb-6`}>Вход</h2>
			<form
				className={styles.form}
				autoComplete="off"
				onSubmit={onFormSubmit}
				data-cy="form"
			>
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
					data-cy="login"
					disabled={!email || !password}
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