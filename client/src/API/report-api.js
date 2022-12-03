import { BASE_URL } from '../utils/constants'
import { getCookie } from '../utils/utils';
import { checkResponse } from './utils';


export const trackerUser = async (type, time, date, id) => {
	return await fetch(`${BASE_URL}/api/tracker/action`, {
		method: 'POST',
		body: JSON.stringify({
			type: type,
			time: time,
			date: date,
			id: id
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => checkResponse(res));
}

export const getReportRequest = async (date, id) => {
	return await fetch(`${BASE_URL}/api/tracker/${id}/${date}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie('token')
		},
	})
		.then(res => checkResponse(res));
}