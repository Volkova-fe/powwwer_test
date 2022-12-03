import React, { useCallback, useState } from 'react'
import styles from './profile-header.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { trackerUser } from '../../API/report-api';
import { actionType, currentDay } from '../../utils/constants';
import { NavLink } from 'react-router-dom';
import { removeUser, singOut } from '../../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie, reportDay, reportTime } from '../../utils/utils';


export const ProfileHeader = () => {
	const dispatch = useDispatch();
	const cookie = getCookie('token');

	const [start, setStart] = useState(false)
	const [breakWork, setBreakWork] = useState(false)

	const { email, id } = useSelector(state => state.auth.user);

	const onStartDay = useCallback(() => {
		setStart(!start);
		trackerUser(actionType.start, reportTime(currentDay), reportDay(currentDay), id)
	}, [start]);

	const onEndDay = useCallback(() => {
		trackerUser(actionType.end, reportTime(currentDay), reportDay(currentDay), id)
		setStart(!start);
	}, [start]);

	const onBreakStart = useCallback(() => {
		trackerUser(actionType.breakStart, reportTime(currentDay), reportDay(currentDay), id)
		setBreakWork(!breakWork);
	}, [breakWork]);

	const onBreakEnd = useCallback(() => {
		trackerUser(actionType.breakEnd, reportTime(currentDay), reportDay(currentDay), id)
		setBreakWork(!breakWork);
	}, [breakWork]);

	const onRemoveUser = useCallback(() => {
		trackerUser(actionType.removeProfile, reportTime(currentDay), reportDay(currentDay), id)
		dispatch(removeUser(email));
	}, [cookie]);

	const onLogoutClick = useCallback(() => {
		dispatch(singOut());
	}, []);

	return (
		<div className={`${styles.header}`}>
			<div className={`${styles.btn_group}`}>
				{
					start ? (
						<Button
							htmlType="button"
							extraClass={`${styles.btn} mr-2`}
							type="primary"
							size="small"
							onClick={onEndDay}
							disabled={breakWork}
						>
							Закончил
						</Button>)
						: (<Button
							htmlType="button"
							extraClass={`${styles.btn} mr-2`}
							type="primary"
							size="small"
							onClick={onStartDay}
						>
							Начал
						</Button>)
				}
				{
					breakWork ? (
						<Button
							htmlType="button"
							extraClass={`${styles.btn} `}
							type="primary"
							size="small"
							onClick={onBreakEnd}
							disabled={!start}
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
						>
							Ушёл курить
						</Button>)
				}
			</div>
			<div className={`${styles.btn_group}`}>
				<Button
					htmlType="button"
					extraClass={`${styles.btn} ml-5`}
					type="primary"
					size="small"
					disabled={start}
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