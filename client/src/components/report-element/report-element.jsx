import React from 'react'
import styles from './report-element.module.css';

export const ReportElement = ({ createdAt, type }) => {

	return (
		<div className={styles.container}>
			<div className={styles.report_elements}>
				<p className="text text_type_main-small">{createdAt} </p>
				<p className="text text_type_main-small"> {type} </p>
			</div>
		</div>
	)
}