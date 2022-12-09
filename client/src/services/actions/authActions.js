//register-api request
import {
	getUserRequest,
	loginRequest,
	logoutRequest,
	removeUserRequest,
	resgisterUserRequest,
} from "../../API/register-api";

import { deleteCookie, setCookie } from "../../utils/utils";
import {
	deleteUserFaied,
	deleteUserRequest,
	deleteUserSuccess,
	registrationFaied,
	registrationRequest,
	registrationSuccess,
	setFormValue,
	singInFaied,
	singInRequest,
	singInSuccess,
	singOutFaied,
	singOutRequest,
	singOutSuccess,
	userFaied,
	userRequest,
	userSuccess
} from "../slices/auth";

//check user auth
export const getUser = () => (dispatch) => {
	dispatch(userRequest())
	getUserRequest()
		.then((res) => dispatch(userSuccess(res)))
		.catch(() => dispatch(userFaied()))
};

export const setRegisterFormValue = (field, value) => (dispatch) => {
	dispatch(setFormValue({ field, value }))
};

export const registerUser = (email, password, name) => (dispatch) => {
	dispatch(registrationRequest())
	resgisterUserRequest(email, password, name)
		.then(res => {
			const accessToken = res.token;
			setCookie('token', accessToken);
			return res;
		})
		.then((res) => dispatch(registrationSuccess(res)))
		.catch(() => dispatch(registrationFaied()))
};

export const setLoginFormValue = (field, value) => (dispatch) => {
	dispatch(setFormValue({ field, value }))
};

export const singIn = (email, password) => (dispatch) => {
	dispatch(singInRequest());
	loginRequest(email, password)
		.then(res => {
			const accessToken = res.token;
			setCookie('token', accessToken);
			return res;
		})
		.then((res) => dispatch(singInSuccess(res)))
		.catch(() => dispatch(singInFaied()))
};

export const singOut = () => (dispatch) => {
	dispatch(singOutRequest());
	logoutRequest()
		.then(res => {
			deleteCookie('token')
			if (res.message === 'success') {
				dispatch(singOutSuccess(res))
			} else {
				dispatch(singOutFaied())
			}
		})
		.catch(() => dispatch(singOutFaied()));
};

export const removeUser = (email) => (dispatch) => {
	dispatch(deleteUserRequest())
	removeUserRequest(email)
		.then(res => {
			deleteCookie('token');
			dispatch(deleteUserSuccess());
		})
		.catch(() => dispatch(deleteUserFaied()))
};
