import { getHours, getMinutes, getSeconds, getYear, getMonth, getDate, parseISO } from 'date-fns'
import moment from 'moment';


export function getCookie(name) {
	const matches = document.cookie.match(
		new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props) {
	props = props || {};
	let exp = props.expires;
	if (typeof exp == 'number' && exp) {
		const d = new Date();
		d.setTime(d.getTime() + exp * 20000);
		exp = props.expires = d;
	}
	if (exp && exp.toUTCString) {
		props.expires = exp.toUTCString();
	}
	value = encodeURIComponent(value);
	let updatedCookie = name + '=' + value;
	for (const propName in props) {
		updatedCookie += '; ' + propName;
		const propValue = props[propName];
		if (propValue !== true) {
			updatedCookie += '=' + propValue;
		}
	}
	document.cookie = updatedCookie;
}

export function deleteCookie(name) {
	setCookie(name, null, { expires: -1 });
}
//Formatting the date as 2022-12-03
export function reportDay(date)  {
	const day = `${getYear(date)}-${getMonth(date)+1}-${getDate(date)}`;
	return day
}
//Formatting the time as 2022-12-03
export const reportFormatDate = (date) => {
	return moment(date).locale('ru').format('DD-MM-YYYY HH:mm:ss')
}
