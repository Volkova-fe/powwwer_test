import React from 'react'
import styles from './report-element.module.css';

export const ReportElement = ({ item }) => {
	const { date, time, type } = item;

	return (
		<div className={styles.container}>
			<div className={styles.report_elements}>
				<p className="text text_type_main-small">{date} </p>
				<p className="text text_type_main-small">{time} </p>
				<p className="text text_type_main-small"> {type} </p>
			</div>
		</div>
	)
}