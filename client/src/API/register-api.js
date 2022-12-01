import { BASE_URL } from '../utils/constants'
import { getCookie } from '../utils/utils';
import { checkResponse } from './utils';


export const resgisterUserRequest = async (email, password, name) => {
	return await fetch(`${BASE_URL}/api/user/registration`, {
		method: 'POST',
		body: JSON.stringify({
			email: email,
			password: password,
			name: name,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => checkResponse(res));
}

export const loginRequest = async (email, password) => {
	return await fetch(`${BASE_URL}/api/user/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	})
		.then(checkResponse);
}

export const logoutRequest = async () => {
	return await fetch(`${BASE_URL}/api/user/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			token: getCookie('token'),
		}),
	})
		.then(checkResponse);
}

export const removeUserRequest = (email) => {
	return fetch(`${BASE_URL}/api/user/delete`, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'DELETE',
		body: JSON.stringify({
			email: email
		}),
	})
}

export const getUserRequest = async () => {
	return await fetch(`${BASE_URL}/api/user/auth`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie('token'),
		},
	})
		.then(checkResponse);
}