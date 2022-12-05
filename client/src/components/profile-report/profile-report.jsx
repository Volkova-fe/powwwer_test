import React, { createRef, forwardRef, useEffect, useState } from 'react';
import styles from './profile-report.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getRangeDaysReport, getSelectDayReport } from '../../services/actions/report';
import { ReportElement } from '../report-element/report-element';
import { reportDay } from '../../utils/utils';
//Imports for Calendar
import { startOfWeek, lastDayOfWeek } from 'date-fns'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';

export const ProfileReport = () => {
	const dispatch = useDispatch();
	const { report } = useSelector(state => state.report);
	const { id } = useSelector(state => state.auth.user);

	//States for report 
	const [startDate, setStartDate] = useState(new Date());

	const [reportSelectDay, setReportSelectDay] = useState(false);

	const [dateRange, setDateRange] = useState([null, null]);
	const [startRangeDate, endRangeDate] = dateRange;

	const selectDayref = createRef();
	const rangeDaysref = createRef();

	//Custom input for report select day, after click will open calendar and you can change date for report
	const SelectDayInput = forwardRef(({ onClick }, ref) => (
		<div ref={ref}>
			<Button
				onClick={onClick}
				htmlType="button"
				extraClass={`${styles.btn} `}
				type="primary"
				size="small"
				data-cy="reportSelectDay"
			>
				За день
			</Button>
		</div>
	));

	//Custom input for report range day, after click will open calendar and you can change date for report
	const RangeDaysInput = forwardRef(({ onClick }, ref) => (
		<div ref={ref}>
			<Button
				onClick={onClick}
				htmlType="button"
				extraClass={`${styles.btn} `}
				type="primary"
				size="small"
				data-cy="reportSelectDay"
			>
				За период
			</Button>
		</div>
	));

	//event handler for selecting the day of the report
	const handleClickSelectDay = (date) => {
		setDateRange([null, null])
		setStartDate(date)
		dispatch(getSelectDayReport(reportDay(date), id))
		setReportSelectDay(true)
	}
	//This changes the language from custom to specified
	registerLocale('ru', ru)

	//The report request for the interval will work only if the start and end dates are selected
	useEffect(() => {
		if (startRangeDate && endRangeDate) {
			dispatch(getRangeDaysReport(reportDay(startRangeDate), reportDay(endRangeDate), id))
		}
	}, [endRangeDate, dispatch])

	return (
		<div className={`${styles.report}`}>
			<div className={`${styles.group}`}>
				<p>
					Отчет
				</p>
				<div className={`${styles.btn_group}`}>
					<DatePicker
						locale='ru'
						//default date
						selected={startDate}
						onChange={handleClickSelectDay}
						//opens the calendar in a modal
						withPortal
						//shows available period
						minDate={startOfWeek(startDate, { weekStartsOn: 1 })}
						maxDate={lastDayOfWeek(startDate, { weekStartsOn: 1 })}
						//render calendar input on profile page
						customInput={<SelectDayInput ref={selectDayref} />}
					/>
					<DatePicker
						locale='ru'
						selected={startDate}
						startDate={startRangeDate}
						endDate={endRangeDate}
						onChange={(update) => {
							setDateRange(update);
						}}
						withPortal
						minDate={startOfWeek(startDate, { weekStartsOn: 1 })}
						maxDate={lastDayOfWeek(startDate, { weekStartsOn: 1 })}
						customInput={<RangeDaysInput ref={rangeDaysref} />}
						selectsRange={true}
					/>
				</div>
			</div>
			<div className={styles.report_container}>
				{/* Rendering report elements */}
				{report &&
					(dateRange || reportSelectDay) &&
					report?.map((elem) => { return <ReportElement key={elem.id} item={elem} /> })}
			</div>
		</div>
	)
}