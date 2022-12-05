import React from 'react'
import styles from './report-element.module.css';

export const ReportElement = ({ item }) => {
	const { date, time, type } = item;

	return (
		<div className={styles.container}>
			<div className={styles.report_elements}>
				<p className="text text_type_main-default">{date} </p>
				<p className="text text_type_main-default">{time} </p>
				<p className="text text_type_main-default"> {type} </p>
			</div>
		</div>
	)
}