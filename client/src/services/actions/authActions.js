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
	deleteUserFailed,
	deleteUserRequest,
	deleteUserSuccess,
	registrationFailed,
	registrationRequest,
	registrationSuccess,
	setFormValue,
	singInFailed,
	singInRequest,
	singInSuccess,
	singOutFailed,
	singOutRequest,
	singOutSuccess,
	userFailed,
	userRequest,
	userSuccess
} from "../slices/auth";

//check user auth
export const getUser = () => (dispatch) => {
	dispatch(userRequest())
	getUserRequest()
		.then((res) => dispatch(userSuccess(res)))
		.catch(() => dispatch(userFailed()))
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
		.catch(() => dispatch(registrationFailed()))
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
		.catch(() => dispatch(singInFailed()))
};

export const singOut = () => (dispatch) => {
	dispatch(singOutRequest());
	logoutRequest()
		.then(res => {
			deleteCookie('token')
			if (res.message === 'success') {
				dispatch(singOutSuccess(res))
			} else {
				dispatch(singOutFailed())
			}
		})
		.catch(() => dispatch(singOutFailed()));
};

export const removeUser = (email) => (dispatch) => {
	dispatch(deleteUserRequest())
	removeUserRequest(email)
		.then(res => {
			deleteCookie('token');
			dispatch(deleteUserSuccess());
		})
		.catch(() => dispatch(deleteUserFailed()))
};
