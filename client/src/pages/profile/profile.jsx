import React from 'react';
import { Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/utils';
import styles from './profile.module.css';
import { ProfileHeader } from '../../components/profile-header/profile-header';
import { ProfileReport } from '../../components/profile-report/profile-report';
import { authAPI } from '../../services/authServices';
import { useSelector } from 'react-redux';



export const Profile = () => {
	const cookie = getCookie('token');
	const { } = authAPI.useCheckUserAuthQuery({ skip: cookie });
	const { auth } = useSelector(state => state.auth);


	//Redirect user to initial page login if delete cookie and auth false
	if (!cookie && !auth) {
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