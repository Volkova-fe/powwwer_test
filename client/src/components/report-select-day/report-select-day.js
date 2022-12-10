import React, { createRef, forwardRef, useState } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ReportElement } from '../report-element/report-element';
import { reportDay } from '../../utils/utils';

//Imports for Calendar
import { startOfWeek, lastDayOfWeek } from 'date-fns'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import { reportAPI } from '../../services/reportServices';

export const ReportSelectDay = () => {
	//States for report 
	const [startDate, setStartDate] = useState(new Date());

	const [skip, setSkip] = useState(true)
	const { data: reportSelectDayResult = [], isLoading } = reportAPI.useGetSelectDayReportQuery(reportDay(startDate), { skip });

	const selectDayref = createRef();

	if(isLoading) {
		return <h1>Идет загрузка ...</h1>
	}

	//Custom input for report select day, after click will open calendar and you can change date for report
	const SelectDayInput = forwardRef(({ onClick }, ref) => (
		<div ref={ref}>
			<Button
				onClick={onClick}
				htmlType="button"
				type="primary"
				size="small"
				data-cy="reportSelectDay"
			>
				За день
			</Button>
		</div>
	));

	//event handler for selecting the day of the report
	const handleClickSelectDay = (date) => {
		setStartDate(date)
		setSkip(false)
	}

	//This changes the language from custom to specified
	registerLocale('ru', ru)

	//The report request for the interval will work only if the start and end dates are selected


	return (
		<div >
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
			<div>
				{/* Rendering report elements */}
				{reportSelectDayResult.map((elem) => <ReportElement key={elem.id} item={elem} />)}
			</div>
		</div>
	)
}