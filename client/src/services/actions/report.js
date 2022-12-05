import { getRangeDaysReportRequest, getSelectDayReportRequest, trackerUserRequest } from "../../API/report-api";
import { 
	GET_RANGE_DAYS_REPORT_FAILED,
	GET_RANGE_DAYS_REPORT_REQUEST,
	GET_RANGE_DAYS_REPORT_SUCCESS,
	GET_SELECT_DAY_REPORT_FAILED,
	GET_SELECT_DAY_REPORT_REQUEST,
	GET_SELECT_DAY_REPORT_SUCCESS,
	TRACK_ACTION_FAILED, 
	TRACK_ACTION_REQUEST, 
	TRACK_ACTION_SUCCESS 
} from "../action-types/report";


export function getSelectDayReport(date, id) {
	return function (dispatch) {
		dispatch({
			type: GET_SELECT_DAY_REPORT_REQUEST,
		});
		getSelectDayReportRequest(date, id)
			.then((res) => {
				dispatch({
					type: GET_SELECT_DAY_REPORT_SUCCESS,
					playload: res,
				});
			})
			.catch(() => {
				dispatch({
					type: GET_SELECT_DAY_REPORT_FAILED,
				});
			})
	};
}

export function getRangeDaysReport(from, to, id) {
	return function (dispatch) {
		dispatch({
			type: GET_RANGE_DAYS_REPORT_REQUEST,
		});
		getRangeDaysReportRequest(from, to, id)
			.then((res) => {
				dispatch({
					type: GET_RANGE_DAYS_REPORT_SUCCESS,
					playload: res,
				});
			})
			.catch(() => {
				dispatch({
					type: GET_RANGE_DAYS_REPORT_FAILED,
				});
			})
	};
}

export function trackAction(type, time, date, id) {
	return function (dispatch) {
		dispatch({
			type: TRACK_ACTION_REQUEST,
		});
		trackerUserRequest(type, time, date, id)
			.then((res) => {
				dispatch({
					type: TRACK_ACTION_SUCCESS,
				});
			})
			.catch(() => {
				dispatch({
					type: TRACK_ACTION_FAILED,
				});
			})
	};
}