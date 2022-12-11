import React, { useCallback, useState } from 'react'
import styles from './profile-header.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ACTIONTYPE } from '../../utils/constants';
import { NavLink } from 'react-router-dom';
import { reportAPI } from '../../services/reportServices';
import { authAPI } from '../../services/authServices';
import { useSelector } from 'react-redux';


export const ProfileHeader = () => {
	const [start, setStart] = useState(false)
	const [breakWork, setBreakWork] = useState(false)

	const { email } = useSelector(state => state.auth.user);

	const [createTrackAction] = reportAPI.useCreateTrackActionMutation();
	const [logoutUser] = authAPI.useLogoutUserMutation();
	const [removeUser] = authAPI.useRemoveUserMutation();


	const onStartDay = useCallback(async () => {
		setStart(!start);
		await createTrackAction(ACTIONTYPE.start)
	}, [start, createTrackAction])

	const onEndDay = useCallback(async () => {
		await createTrackAction(ACTIONTYPE.end)
		setStart(!start);
	}, [start, createTrackAction]);

	const onBreakStart = useCallback(async () => {
		await createTrackAction(ACTIONTYPE.breakStart)
		setBreakWork(!breakWork);
	}, [breakWork, createTrackAction]);

	const onBreakEnd = useCallback(async () => {
		await createTrackAction(ACTIONTYPE.breakEnd)
		setBreakWork(!breakWork);
	}, [breakWork, createTrackAction]);

	const onRemoveUser = useCallback(async () => {
		await createTrackAction(ACTIONTYPE.removeProfile)
		await removeUser({ email })
	}, [createTrackAction]);

	const onLogoutClick = useCallback(async () => {
		await createTrackAction(ACTIONTYPE.logout)
		await logoutUser()
	}, [createTrackAction]);

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