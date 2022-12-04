import {
	GET_REPORT_REQUEST,
	GET_REPORT_SUCCESS,
	GET_REPORT_FAILED,
	TRACK_ACTION_FAILED,
	TRACK_ACTION_SUCCESS,
	TRACK_ACTION_REQUEST,
} from "../action-types/report";


const initialState = {
	report: null,
	getReportRequest: false,
	getReportFailed: false,

};

export const reportReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_REPORT_REQUEST: {
			return {
				...state,
				getReportFailed: false,
				getReportRequest: true,
			};
		}
		case GET_REPORT_FAILED: {
			return {
				...state,
				getReportFailed: true,
				getReportRequest: false,
			};
		}
		case GET_REPORT_SUCCESS: {
			return {
				state,
				report: action.playload,
				getReportRequest: false,
				getReportFailed: false,
			};
		}
		case TRACK_ACTION_REQUEST: {
			return {
				...state,
				getReportFailed: false,
				getReportRequest: true,
			};
		}
		case TRACK_ACTION_FAILED: {
			return {
				...state,
				getReportFailed: true,
				getReportRequest: false,
			};
		}
		case TRACK_ACTION_SUCCESS: {
			return {
				state,
				getReportRequest: false,
				getReportFailed: false,
			};
		}
		default: {
			return state;
		}
	}
};