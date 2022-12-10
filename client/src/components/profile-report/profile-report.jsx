import React from 'react';
import styles from './profile-report.module.css';

import { ReportSelectDay } from '../report-select-day/report-select-day';
import { ReportRangeDays } from '../report-range-days/report-range-days';

export const ProfileReport = () => {

	return (
		<div className={`${styles.report}`}>
			<div className={`${styles.group}`}>
				<p>
					Отчет
				</p>
				<div className={`${styles.btn_group}`}>
					<ReportSelectDay />
					<ReportRangeDays />
				</div>
			</div>
		</div>
	)
}