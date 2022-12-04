import React from 'react';
import { Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/utils';
import styles from './profile.module.css';
import { ProfileHeader } from '../../components/profile-header/profile-header';
import { ProfileReport } from '../../components/profile-report/profile-report';
import { useSelector } from 'react-redux';


export const Profile = () => {
	const cookie = getCookie('token');
	const { auth } = useSelector(state => state.auth);

	//Redirect user to initial page login if delete cookie and auth false
	if (!auth && !cookie) {
		return <Redirect to="/" />
	}

	return (
		<div className={`${styles.content}`}>
			<h1 className='text text_type_main-medium pl-5 pt-5'>Профиль учета рабочего времени</h1>
			<ProfileHeader />
			<div className={`${styles.container}`}>
				<ProfileReport />
			</div >
		</div >
	)
}