import { createSlice } from '@reduxjs/toolkit'
import { authAPI } from '../../services/authServices'
import { deleteCookie, setCookie } from '../../utils/utils'


const authSlice = createSlice({
	name: 'auth',
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
		}
	},
	reducers: {
		setFormValue(state, action) {
			const { field, value } = action.payload;
			state.form[field] = value;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				authAPI.endpoints.loginUser.matchFulfilled,
				(state, action) => {
					state.user = action.payload;
					setCookie('token', state.user.token);
					state.auth = true;
				}
			)
			.addMatcher(
				authAPI.endpoints.registrationUser.matchFulfilled,
				(state, action) => {
					state.user = action.payload;
					setCookie('token', state.user.token);
					state.auth = true;
				}
			)
			.addMatcher(
				authAPI.endpoints.logoutUser.matchFulfilled,
				(state) => {
					state.user = {
						id: '',
						email: '',
						name: '',
						token: '',
					}
					deleteCookie('token');
					state.auth = false;
				}
			)
			.addMatcher(
				authAPI.endpoints.removeUser.matchFulfilled,
				(state) => {
					state.user = {
						id: '',
						email: '',
						name: '',
						token: '',
					}
					deleteCookie('token');
					state.auth = false;
				}
			)
			.addMatcher(
				authAPI.endpoints.checkUserAuth.matchFulfilled,
				(state, action) => {
					state.user = action.payload;
				}
			)
	},
})

export default authSlice.reducer
export const {
	setFormValue
} = authSlice.actions
