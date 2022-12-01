import React, { useCallback, useState } from 'react';
import { startOfWeek, lastDayOfWeek, intlFormat } from 'date-fns'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';


export const Calendar = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(null);


	registerLocale('ru', ru)

	const onChangeDate = useCallback((date) => {
		intlFormat(setStartDate(date), {
			locale: 'ru-RU',
		})
	}, [startDate])

	return (
		<DatePicker
			locale='ru'
			selected={startDate}
			onChange={onChangeDate}
			startDate={startDate}
			endDate={endDate}
			inline
			minDate={startOfWeek(startDate, { weekStartsOn: 1 })}
			maxDate={lastDayOfWeek(startDate, { weekStartsOn: 1 })}
		/>
	)
}