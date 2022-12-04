import React, { useCallback, useState } from 'react'
import styles from './profile-header.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { trackerUser } from '../../API/report-api';
import { ACTIONTYPE, CURRENTDAY } from '../../utils/constants';
import { NavLink } from 'react-router-dom';
import { removeUser, singOut } from '../../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { reportDay, reportTime } from '../../utils/utils';


export const ProfileHeader = () => {
	const dispatch = useDispatch();

	const [start, setStart] = useState(false)
	const [breakWork, setBreakWork] = useState(false)

	const { email, id } = useSelector(state => state.auth.user);

	const onStartDay = useCallback(() => {
		setStart(!start);
		trackerUser(ACTIONTYPE.start, reportTime(CURRENTDAY), reportDay(CURRENTDAY), id)
	}, [start, id]);

	const onEndDay = useCallback(() => {
		trackerUser(ACTIONTYPE.end, reportTime(CURRENTDAY), reportDay(CURRENTDAY), id)
		setStart(!start);
	}, [start, id]);

	const onBreakStart = useCallback(() => {
		trackerUser(ACTIONTYPE.breakStart, reportTime(CURRENTDAY), reportDay(CURRENTDAY), id)
		setBreakWork(!breakWork);
	}, [breakWork, id]);

	const onBreakEnd = useCallback(() => {
		trackerUser(ACTIONTYPE.breakEnd, reportTime(CURRENTDAY), reportDay(CURRENTDAY), id)
		setBreakWork(!breakWork);
	}, [breakWork, id]);

	const onRemoveUser = useCallback(() => {
		trackerUser(ACTIONTYPE.removeProfile, reportTime(CURRENTDAY), reportDay(CURRENTDAY), id)
		dispatch(removeUser(email));
	}, [id, dispatch, email]);

	const onLogoutClick = useCallback(() => {
		dispatch(singOut());
	}, [dispatch]);

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