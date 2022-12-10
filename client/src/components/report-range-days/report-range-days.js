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

export const ReportRangeDays = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [dateRange, setDateRange] = useState([null, null]);
	const [startRangeDate, endRangeDate] = dateRange;

	const { data: reportRangeDaysResult = [] } = reportAPI.useGetRangeDaysReportQuery({from :reportDay(startRangeDate), to: reportDay(endRangeDate)}, {skip: dateRange[1] === null});

	const rangeDaysref = createRef();


	//Custom input for report range day, after click will open calendar and you can change date for report
	const RangeDaysInput = forwardRef(({ onClick }, ref) => (
		<div ref={ref}>
			<Button
				onClick={onClick}
				htmlType="button"
				type="primary"
				size="small"
				data-cy="reportRangeDay"
			>
				За период
			</Button>
		</div>
	));

	//event handler for selecting the day of the report

	const handleClickRangeDays = (update) => {
		setDateRange(update);
	}


	//This changes the language from custom to specified
	registerLocale('ru', ru)

	//The report request for the interval will work only if the start and end dates are selected

	return (
		<div>
			<DatePicker
				locale='ru'
				selected={startDate}
				startDate={startRangeDate}
				endDate={endRangeDate}
				onChange={handleClickRangeDays}
				withPortal
				minDate={startOfWeek(startDate, { weekStartsOn: 1 })}
				maxDate={lastDayOfWeek(startDate, { weekStartsOn: 1 })}
				customInput={<RangeDaysInput ref={rangeDaysref} />}
				selectsRange={true}
			/>
			<div>
				{/* Rendering report elements */}
				{reportRangeDaysResult && reportRangeDaysResult.map((elem) => <ReportElement key={elem.id} item={elem} />)}
			</div>
		</div>
	)
}