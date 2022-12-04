//register-api request
import {
	getUserRequest,
	loginRequest,
	logoutRequest,
	removeUserRequest,
	resgisterUserRequest,
} from "../../API/register-api";
//action-types auth
import { 
	GET_USER_FAILED, 
	GET_USER_REQUEST, 
	GET_USER_SUCCESS, 
	LOGIN_FORM_FAILED, 
	LOGIN_FORM_REQUEST, 
	LOGIN_FORM_SET_VALUE, 
	LOGIN_FORM_SUCCESS, 
	LOGOUT_FORM_FAILED, 
	LOGOUT_FORM_REQUEST, 
	LOGOUT_FORM_SUCCESS, 
	REGISTER_FORM_FAILED, 
	REGISTER_FORM_REQUEST, 
	REGISTER_FORM_SET_VALUE, 
	REGISTER_FORM_SUCCESS, 
	REMOVE_USER_FAILED, 
	REMOVE_USER_REQUEST, 
	REMOVE_USER_SUCCESS 
} from "../action-types/auth";

import { deleteCookie, setCookie } from "../../utils/utils";
//check user auth
export function getUser() {
	return function (dispatch) {
		dispatch({
			type: GET_USER_REQUEST,
		});
		getUserRequest()
			.then((res) => {
				dispatch({
					type: GET_USER_SUCCESS,
					playload: res,
				});
			})
			.catch(() => {
				dispatch({
					type: GET_USER_FAILED,
				});
			})
	};
}

export const setRegisterFormValue = (field, value) => ({
	type: REGISTER_FORM_SET_VALUE,
	field,
	value,
});

export function registerUser(email, password, name) {
	return function (dispatch) {
		dispatch({
			type: REGISTER_FORM_REQUEST,
		});
		resgisterUserRequest(email, password, name)
			.then(res => {
				const accessToken = res.token;
				setCookie('token', accessToken);
				return res;
			})
			.then((res) => {
				dispatch({
					type: REGISTER_FORM_SUCCESS,
					playload: res,
				});
			})
			.catch(() => {
				dispatch({
					type: REGISTER_FORM_FAILED,
				});
			})
	};
}

export const setLoginFormValue = (field, value) => ({
	type: LOGIN_FORM_SET_VALUE,
	field,
	value,
});

export function singIn(email, password) {
	return function (dispatch) {
		dispatch({
			type: LOGIN_FORM_REQUEST,
		});
		loginRequest(email, password)
			.then(res => {
				const accessToken = res.token;
				setCookie('token', accessToken);
				return res;
			})
			.then((res) => {
				dispatch({
					type: LOGIN_FORM_SUCCESS,
					playload: res,
				});
			})
			.catch(() => {
				dispatch({
					type: LOGIN_FORM_FAILED,
				});
			})
	};
}

export function singOut() {
	return function (dispatch) {
		dispatch({
			type: LOGOUT_FORM_REQUEST,
		});
		logoutRequest()
			.then(res => {
				deleteCookie('token');
				if (res.message === 'success') {
					dispatch({
						type: LOGOUT_FORM_SUCCESS,
					});
				} else {
					dispatch({ type: LOGOUT_FORM_FAILED });
				}
			})
			.catch(() => {
				dispatch({
					type: LOGOUT_FORM_FAILED,
				});
			})
	};
}

export function removeUser(email) {
	return function (dispatch) {
		dispatch({
			type: REMOVE_USER_REQUEST,
		});
		removeUserRequest(email)
			.then(res => {
				deleteCookie('token');
				dispatch({
					type: REMOVE_USER_SUCCESS,
				});
			})
			.catch(() => {
				dispatch({
					type: REMOVE_USER_FAILED,
				});
			})
	};
}
