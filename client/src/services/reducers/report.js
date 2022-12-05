import {
	TRACK_ACTION_FAILED,
	TRACK_ACTION_SUCCESS,
	TRACK_ACTION_REQUEST,
	GET_SELECT_DAY_REPORT_REQUEST,
	GET_SELECT_DAY_REPORT_FAILED,
	GET_SELECT_DAY_REPORT_SUCCESS,
	GET_RANGE_DAYS_REPORT_REQUEST,
	GET_RANGE_DAYS_REPORT_SUCCESS,
	GET_RANGE_DAYS_REPORT_FAILED,
} from "../action-types/report";


const initialState = {
	report: null,
	getReportRequest: false,
	getReportFailed: false,

};

export const reportReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_SELECT_DAY_REPORT_REQUEST: {
			return {
				...state,
				getReportFailed: false,
				getReportRequest: true,
			};
		}
		case GET_SELECT_DAY_REPORT_FAILED: {
			return {
				...state,
				getReportFailed: true,
				getReportRequest: false,
			};
		}
		case GET_SELECT_DAY_REPORT_SUCCESS: {
			return {
				state,
				report: action.playload.slice().sort(
					(a,b) => a.id > b.id ? 1 : -1

				),
				getReportRequest: false,
				getReportFailed: false,
			};
		}
		case GET_RANGE_DAYS_REPORT_REQUEST: {
			return {
				...state,
				getReportFailed: false,
				getReportRequest: true,
			};
		}
		case GET_RANGE_DAYS_REPORT_FAILED: {
			return {
				...state,
				getReportFailed: true,
				getReportRequest: false,
			};
		}
		case GET_RANGE_DAYS_REPORT_SUCCESS: {
			return {
				state,
				report: action.playload.slice().sort(
					(a,b) => a.id > b.id ? 1 : -1

				),
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