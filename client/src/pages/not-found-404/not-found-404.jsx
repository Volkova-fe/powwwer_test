
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found-404.module.css';

export const NotFound404 = () => {

	return (
		<div className={`${styles.container} pt-30 pb-30`}>
			<p className="text text_type_digits-large">404</p>
			<p className="text text_type_main-medium">Страница не найдена</p>
			<Link
				to='/'
				className={`${styles.link} text text_type_main-medium text_color_inactive pt-10`}
			>
				Перейти на главную страницу
			</Link>
		</div >
	)
}