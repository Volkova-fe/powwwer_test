import React, { createRef, forwardRef, useCallback, useEffect, useState } from 'react';
import styles from './profile-report.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getReport } from '../../services/actions/report';
import { ReportElement } from '../report-element/report-element';
import { currentDay } from '../../utils/constants';
import { reportDay } from '../../utils/utils';

import { startOfWeek, lastDayOfWeek } from 'date-fns'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import { getReportRequest } from '../../API/report-api';
import { getUser } from '../../services/actions/auth';

export const ProfileReport = () => {
	const dispatch = useDispatch();
	const { report } = useSelector(state => state.report);
	const { id } = useSelector(state => state.auth.user);

	const [startDate, setStartDate] = useState(new Date());
	const [reportCurrDay, setReportCurrDay] = useState(false);
	const [reportSelectDay, setReportSelectDay] = useState(false);
	const ref = createRef();

	const CalendarInput = forwardRef(({ onClick }, ref) => (
		<div ref={ref}>
			<Button
				onClick={onClick}
				disabled={reportCurrDay}
				htmlType="button"
				extraClass={`${styles.btn} `}
				type="primary"
				size="small"
			>
				По дате
			</Button>
		</div>
	));

	const onGetCurrentReport =() => {
		dispatch(getUser())
		dispatch(getReport(reportDay(currentDay), id))
		setReportCurrDay(!reportCurrDay)
		setReportSelectDay(false)
	}

	const onChangeDate = (date) => {
		setStartDate(date)
		dispatch(getUser())
		dispatch(getReport(reportDay(date), id))
		setReportSelectDay(true)
	}

	registerLocale('ru', ru)

	return (
		<div className={`${styles.report}`}>
			<div className={`${styles.group}`}>
				<p>
					Отчет
				</p>
				<div className={`${styles.btn_group}`}>
					{reportCurrDay ? (
						<Button
							htmlType="button"
							extraClass={`${styles.btn} mr-2`}
							type="primary"
							size="small"
							onClick={onGetCurrentReport}
						>
							Скрыть отчет
						</Button>)
						: (<Button
							htmlType="button"
							extraClass={`${styles.btn} mr-2`}
							type="primary"
							size="small"
							onClick={onGetCurrentReport}
						>
							За день
						</Button>)
					}
					<DatePicker
						locale='ru'
						selected={startDate}
						onChange={onChangeDate}
						withPortal
						minDate={startOfWeek(startDate, { weekStartsOn: 1 })}
						maxDate={lastDayOfWeek(startDate, { weekStartsOn: 1 })}
						customInput={<CalendarInput ref={ref} />}
					/>
				</div>
			</div>
			<div>
				{report &&
					(reportCurrDay || reportSelectDay) &&
					report?.map((elem) => { return <ReportElement key={elem.id} item={elem} /> })}
			</div>
		</div>
	)
}