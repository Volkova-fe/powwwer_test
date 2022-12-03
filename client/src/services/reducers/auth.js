import {
	REMOVE_USER_FAILED,
	REMOVE_USER_REQUEST,
	REMOVE_USER_SUCCESS,
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
} from "../actions/auth";


const initialState = {
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

	loginRequest: false,
	loginFailed: false,
	loginSuccess: false,

	logoutRequest: false,
	logoutSuccess: false,
	logoutFailed: false,

	getUserRequest: false,
	getUserFailed: false,

	removeRequest: false,
	removeFailed: false,

	updateupdateTokenRequest: false,
	updateupdateTokenSuccess: false,
	updateupdateTokenFailed: false,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_REQUEST: {
			return {
				...state,
				getUserFailed: false,
				getUserRequest: true,
			};
		}
		case GET_USER_FAILED: {
			return {
				...state,
				getUserFailed: true,
				getUserRequest: false,
			};
		}
		case GET_USER_SUCCESS: {
			return {
				...state,
				auth: true,
				user: action.playload,
				getUserRequest: false,
				getUserFailed: false,
			};
		}
		case REMOVE_USER_REQUEST: {
			return {
				...state,
				removeFailed: false,
				removeRequest: true,
			};
		}
		case REMOVE_USER_FAILED: {
			return {
				...state,
				removeFailed: true,
				removeRequest: false,
			};
		}
		case REMOVE_USER_SUCCESS: {
			return initialState;
		}
		case LOGIN_FORM_SET_VALUE: {
			return {
				...state,
				form: {
					...state.form,
					[action.field]: action.value
				}
			};
		}
		case LOGIN_FORM_REQUEST: {
			return {
				...state,
				loginFailed: false,
				loginRequest: true
			};
		}
		case LOGIN_FORM_FAILED: {
			return {
				...state,
				loginFailed: true,
				loginRequest: false
			};
		}
		case LOGIN_FORM_SUCCESS: {
			return {
				...state,
				user: action.playload,
				form: {
					...state.form,
					email: '',
					password: '',
				},
				auth: true,
				loginRequest: false,
				loginFailed: false,
				loginSuccess: true,
			};
		}
		case LOGOUT_FORM_REQUEST: {
			return {
				...state,
				logoutFailed: false,
				logoutRequest: true
			};
		}
		case LOGOUT_FORM_FAILED: {
			return {
				...state,
				logoutFailed: true,
				logoutRequest: false
			};
		}
		case LOGOUT_FORM_SUCCESS: {
			return {
				...state,
				user: {
					...state.user,
					email: '',
					name: '',
					token: '',
					id: ''
				},
				auth: false,
				logoutSuccess: true,
				logoutFailed: false,
				logoutRequest: false
			}
		}
		case REGISTER_FORM_SET_VALUE: {
			return {
				...state,
				form: {
					...state.form,
					[action.field]: action.value
				}
			};
		}
		case REGISTER_FORM_REQUEST: {
			return {
				...state,
				loginFailed: false,
				loginRequest: true
			};
		}
		case REGISTER_FORM_FAILED: {
			return {
				...state,
				loginFailed: true,
				loginRequest: false
			};
		}
		case REGISTER_FORM_SUCCESS: {
			return {
				...state,
				user: action.playload,
				form: {
					...state.form,
					email: '',
					password: '',
					name: ''
				},
				auth: true,
				loginRequest: false,
				loginFailed: false,
				loginSuccess: true,
			};
		}
		default: {
			return state;
		}
	}
};