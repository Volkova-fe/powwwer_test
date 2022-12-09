import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		auth: false,
		form: {
			email: '',
			password: '',
			code: '',
			name: ''
		},
		user: {
			id: '',
			email: '',
			name: '',
			token: '',
		},
		message: null,
		loginRequest: {
			error: false,
			submitting: false,
		},
		registrationRequest: {
			error: false,
			submitting: false,
		},
		logoutRequest: {
			error: false,
			submitting: false,
		},
		userRequest: {
			error: false,
			submitting: false,
		},
		removeRequest: {
			error: false,
			submitting: false,
		}
	},
	reducers: {
		setFormValue(state, action) {
			const { field, value } = action.payload;
			state.form[field] = value;
		},
		singInRequest: state => {
			state.auth = false
			state.loginRequest.submitting = true
		},
		singInSuccess(state, action) {
			state.auth = true
			state.user = action.payload
			state.loginRequest.submitting = false;
			state.form = {
				email: '',
				password: '',
				code: '',
				name: ''
			}
		},
		singInFaied: (state) => {
			state.auth = false
			state.loginRequest.submitting = false;
			state.loginRequest.error = true;
		},
		registrationRequest: state => {
			state.auth = false
			state.registrationRequest.submitting = true
		},
		registrationSuccess(state, action) {
			state.auth = true
			state.user = action.payload
			state.registrationRequest.submitting = false;
		},
		registrationFaied: (state) => {
			state.auth = false
			state.registrationRequest.submitting = false;
			state.registrationRequest.error = true;
		},
		singOutRequest: state => {
			state.auth = false
			state.logoutRequest.submitting = true
		},
		singOutSuccess(state, action) {
			state.auth = false
			state.message = action.payload
			state.logoutRequest.submitting = false;
		},
		singOutFaied: (state) => {
			state.auth = false
			state.logoutRequest.submitting = false;
			state.logoutRequest.error = true;
		},
		deleteUserRequest: state => {
			state.auth = false
			state.removeRequest.submitting = true
		},
		deleteUserSuccess(state) {
			state.auth = false
			state.removeRequest.submitting = false;
		},
		deleteUserFaied: (state) => {
			state.auth = false
			state.removeRequest.submitting = false;
			state.removeRequest.error = true;
		},
		userRequest: state => {
			state.auth = false
			state.userRequest.submitting = true
		},
		userSuccess(state, action) {
			state.auth = true
			state.userRequest.submitting = false;
			state.user = action.payload
		},
		userFaied: (state) => {
			state.auth = false
			state.userRequest.submitting = false;
			state.userRequest.error = true;
		},
	}
})

export default authSlice.reducer
export const {
	singInRequest,
	singInSuccess,
	singInFaied,
	setFormValue,
	registrationRequest,
	registrationSuccess,
	registrationFaied,
	singOutRequest,
	singOutSuccess,
	singOutFaied,
	deleteUserRequest,
	deleteUserSuccess,
	deleteUserFaied,
	userRequest,
	userSuccess,
	userFaied
} = authSlice.actions