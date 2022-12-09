import React, { useCallback, useState } from 'react'
import styles from './profile-header.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ACTIONTYPE } from '../../utils/constants';
import { NavLink } from 'react-router-dom';
import { removeUser, singOut } from '../../services/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { reportDay, reportTime } from '../../utils/utils';
import { trackAction } from '../../services/actions/reportActions';


export const ProfileHeader = () => {
	const dispatch = useDispatch();

	const [start, setStart] = useState(false)
	const [breakWork, setBreakWork] = useState(false)

	const { email, id } = useSelector(state => state.auth.user);

	const onStartDay = useCallback(() => {
		setStart(!start);
		dispatch(trackAction(
			ACTIONTYPE.start,
			reportTime(new Date()),
			reportDay(new Date()), id)
		)
	}, [start, id, dispatch]);

	const onEndDay = useCallback(() => {
		dispatch(trackAction(
			ACTIONTYPE.end,
			reportTime(new Date()),
			reportDay(new Date()), id)
		)
		setStart(!start);
	}, [start, id, dispatch]);

	const onBreakStart = useCallback(() => {
		dispatch(trackAction(
			ACTIONTYPE.breakStart,
			reportTime(new Date()),
			reportDay(new Date()), id)
		)
		setBreakWork(!breakWork);
	}, [breakWork, id, dispatch]);

	const onBreakEnd = useCallback(() => {
		dispatch(trackAction(
			ACTIONTYPE.breakEnd,
			reportTime(new Date()),
			reportDay(new Date()), id)
		)
		setBreakWork(!breakWork);
	}, [breakWork, id, dispatch]);

	const onRemoveUser = useCallback(() => {
		dispatch(trackAction(
			ACTIONTYPE.removeProfile,
			reportTime(new Date()),
			reportDay(new Date()), id)
		)
		dispatch(removeUser(email));
	}, [id, dispatch, email]);

	const onLogoutClick = useCallback(() => {
		dispatch(trackAction(
			ACTIONTYPE.logout,
			reportTime(new Date()),
			reportDay(new Date()), id)
		)
		dispatch(singOut());
	}, [dispatch, id]);

	return (
		<div className={`${styles.header}`}>
			<div className={`${styles.btn_group}`}>
				{/* Button rendering based on state, 
				if day start it will be change on Button 
				with text Закончил, if state breake true 
				it disabled*/}
				{
					start ? (
						<Button
							htmlType="button"
							extraClass={`${styles.btn} mr-2`}
							type="primary"
							size="small"
							onClick={onEndDay}
							disabled={breakWork}
							data-cy="endtDay"
						>
							Закончил
						</Button>)
						: (<Button
							htmlType="button"
							extraClass={`${styles.btn} mr-2`}
							type="primary"
							size="small"
							onClick={onStartDay}
							data-cy="startDay"
						>
							Начал
						</Button>)
				}
				{/* Button rendering based on state, 
				if day breake it will be change on Button 
				with text Перекур окончен, if state start false 
				it disabled*/}
				{
					breakWork ? (
						<Button
							htmlType="button"
							extraClass={`${styles.btn} `}
							type="primary"
							size="small"
							onClick={onBreakEnd}
							disabled={!start}
							data-cy="breakEnd"
						>
							Перекур окончен
						</Button>)
						: (<Button
							htmlType="button"
							extraClass={`${styles.btn} mr-2`}
							type="primary"
							size="small"
							onClick={onBreakStart}
							disabled={!start}
							data-cy="breakStart"
						>
							Ушёл курить
						</Button>)
				}
			</div>
			<div className={`${styles.btn_group}`}>
				{/* Button rendering based on state, 
				if state start true it disabled*/}
				<Button
					htmlType="button"
					extraClass={`${styles.btn} ml-5`}
					type="primary"
					size="small"
					disabled={start}
					data-cy="removeUser"
				>
					<NavLink
						to='/'
						exact
						className={`${styles.link}`}
						onClick={onRemoveUser}
					>
						Удалить аккаунт
					</NavLink>
				</Button>
				<Button
					htmlType="button"
					extraClass={`${styles.btn} ml-5`}
					type="primary"
					size="small"
					disabled={start}
					data-cy="logout"
				>
					<NavLink
						to='/'
						exact
						className={`${styles.link}`}
						onClick={onLogoutClick}
					>
						Выйти
					</NavLink>
				</Button>
			</div>
		</div>

	)
}