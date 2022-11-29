import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { removeUser, singOut } from '../../services/actions/auth';
import { deleteCookie, getCookie } from '../../utils/utils';
import styles from './profile.module.css';

export const Profile = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const cookie = getCookie('token');
	const { email } = useSelector(state => state.auth.user);
	const { auth } = useSelector(state => state.auth);

	const onLogoutClick = useCallback(() => {
		dispatch(singOut());
	}, []);

	const onRemoveUser = useCallback(() => {
		dispatch(removeUser(email));
	}, [cookie]);


	if (!auth && !cookie) {
		return <Redirect to="/" />
	}

	return (
		<div>
			<Button htmlType="button" extraClass={`${styles.btn} mt-10 ml-5`} type="primary" size="small">
				<NavLink to='/' exact className={`${styles.link}`} onClick={onRemoveUser}>
					Удалить аккаунт
				</NavLink>
			</Button>
			<Button htmlType="button" extraClass={`${styles.btn} mt-10 ml-5`} type="primary" size="small">
				<NavLink to='/' exact className={`${styles.link}`} onClick={onLogoutClick} >
					Выйти
				</NavLink>
			</Button>
			<div className={`${styles.container} pt-20 pl-5 pr-5 pb-20`}>
				<div className={`${styles.report}`}>
					<div className={`${styles.group}`}>
						<p>
							Действия
						</p>
						<div className={`${styles.btn_group}`}>
							<Button htmlType="button" extraClass={`${styles.btn} mr-2`} type="primary" size="medium">
								Начало дня
							</Button>
							<Button htmlType="button" extraClass={`${styles.btn} `} type="primary" size="medium">
								Перерыв
							</Button>
						</div>
					</div>
					<div className={`${styles.table}`}>
						<p className={`${styles.column}`}>Время</p>
						<p className={`${styles.column}`}>Действие</p>
					</div>
				</div>
				<div className={`${styles.report}`}>
					<div className={`${styles.group}`}>
						<p>
							Отчет
						</p>
						<div className={`${styles.btn_group}`}>
							<Button htmlType="button" extraClass={`${styles.btn} mr-2`} type="primary" size="medium">
								За день
							</Button>
							<Button htmlType="button" extraClass={`${styles.btn} `} type="primary" size="medium">
								За период...
							</Button>
						</div>
					</div>
					<div className={`${styles.table}`}>
						<p className={`${styles.column}`}>Начало дня</p>
						<p className={`${styles.column}`}>Количество перерывов</p>
						<p className={`${styles.column}`}>Окончание дня</p>
						<p className={`${styles.column}`}>Общее время перерывов</p>
						<p className={`${styles.column}`}>Общее рабочее время</p>
					</div>
				</div>
			</div >
		</div >
	)
}