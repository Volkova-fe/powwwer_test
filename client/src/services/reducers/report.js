import {
	GET_REPORT_REQUEST,
	GET_REPORT_SUCCESS,
	GET_REPORT_FAILED,
} from "../actions/report";


const initialState = {
	tracker: null,
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
				...state,
				tracker: action.tracker,
				getReportRequest: false,
				getReportFailed: false,
			};
		}
		default: {
			return state;
		}
	}
};