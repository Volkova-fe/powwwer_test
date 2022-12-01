import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { getUser, removeUser, singOut } from '../../services/actions/auth';
import { getCookie } from '../../utils/utils';
import styles from './profile.module.css';
import { Calendar } from './calendar/calendar';
import { trackerUser } from '../../API/report-api';
import { intlFormat, getHours, getMinutes, getYear, getMonth, getDate } from 'date-fns'
import { getReport } from '../../services/actions/report';




export const Profile = () => {
	const dispatch = useDispatch();

	const cookie = getCookie('token');
	const { email, id } = useSelector(state => state.auth.user);
	const { auth } = useSelector(state => state.auth);

	const [start, setStart] = useState(false)
	const [breakWork, setBreakWork] = useState(false)

	const [activeCalendar, setActiveCalendar] = useState(false);
	const createDate = new Date()
	const currentDay = `${getYear(createDate)}-${getMonth(createDate)}-${getDate(createDate)}`
	const currentTime = `${getHours(createDate)}:${getMinutes(createDate)}`
	
	const currentDweek = '2022-12-01'
	const actionType = {
		start: 'Начало дня',
		breakStart: 'Ушел на перерыв',
		breakEnd: 'Вернулся с перерыва',
		end: 'Закончил смену',
		removeProfile: 'Удалил профиль'
	}

	const onGetCurrentReport = useCallback(() => {
		dispatch(getReport(currentDay, id))
	}, [])


	const onStartDay = useCallback(() => {
		setStart(!start);
		trackerUser(actionType.start, currentTime, currentDay, id)
	}, [start]);

	const onEndDay = useCallback(() => {
		trackerUser(actionType.end, currentTime, currentDay, id)
		setStart(!start);
	}, [start]);

	const onBreakStart = useCallback(() => {
		trackerUser(actionType.breakStart, currentTime, currentDay, id)
		setBreakWork(!breakWork);
	}, [breakWork]);

	const onBreakEnd = useCallback(() => {
		trackerUser(actionType.breakEnd, currentTime, currentDay, id)
		setBreakWork(!breakWork);
	}, [breakWork]);

	const onLogoutClick = useCallback(() => {
		dispatch(singOut());
		trackerUser(actionType.end, currentTime, currentDay, id)
	}, []);

	const onRemoveUser = useCallback(() => {
		dispatch(removeUser(email));
		trackerUser(actionType.removeProfile, currentTime, currentDay, id)
	}, [cookie]);

	const onOpenCalendar = useCallback(() => {
		setActiveCalendar(!activeCalendar)
	}, [activeCalendar]);


	if (!auth && !cookie) {
		return <Redirect to="/" />
	}

	return (
		<div className={`${styles.content}`}>
			<div className={`${styles.header}`}>
				<div className={`${styles.btn_group}`}>
					{
						start ? (
							<Button htmlType="button" extraClass={`${styles.btn} mr-2`} type="primary" size="small" onClick={onEndDay}>
								Конец дня
							</Button>)
							: (<Button htmlType="button" extraClass={`${styles.btn} mr-2`} type="primary" size="small" onClick={onStartDay}>
								Начало дня
							</Button>)
					}
					{
						breakWork ? (
							<Button htmlType="button" extraClass={`${styles.btn} mr-2`} type="primary" size="small" onClick={onBreakStart}>
								Вернулся
							</Button>)
							: (<Button htmlType="button" extraClass={`${styles.btn} `} type="primary" size="small" onClick={onBreakEnd}>
								Перерыв
							</Button>)
					}

				</div>
				<div className={`${styles.btn_group}`}>
					<Button htmlType="button" extraClass={`${styles.btn} ml-5`} type="primary" size="small">
						<NavLink to='/' exact className={`${styles.link}`} onClick={onRemoveUser}>
							Удалить аккаунт
						</NavLink>
					</Button>
					<Button htmlType="button" extraClass={`${styles.btn} ml-5`} type="primary" size="small">
						<NavLink to='/' exact className={`${styles.link}`} onClick={onLogoutClick} >
							Выйти
						</NavLink>
					</Button>
				</div>
			</div>
			<div className={`${styles.container}`}>
				<div className={`${styles.report}`}>
					<div className={`${styles.group}`}>
						<p>
							Отчет
						</p>
						<div className={`${styles.btn_group}`}>
							<Button htmlType="button" extraClass={`${styles.btn} mr-2`} type="primary" size="small" onClick={onGetCurrentReport}>
								За день
							</Button>
							<Button htmlType="button" extraClass={`${styles.btn} `} type="primary" size="small" onClick={onOpenCalendar}>
								За период...
							</Button>
							{
								activeCalendar &&
								<Calendar />
							}
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