import { getReportRequest, trackerUserRequest } from "../../API/report-api";
import { GET_REPORT_FAILED, GET_REPORT_REQUEST, GET_REPORT_SUCCESS, TRACK_ACTION_FAILED, TRACK_ACTION_REQUEST, TRACK_ACTION_SUCCESS } from "../action-types/report";


export function getReport(date, id) {
	return function (dispatch) {
		dispatch({
			type: GET_REPORT_REQUEST,
		});
		getReportRequest(date, id)
			.then((res) => {
				dispatch({
					type: GET_REPORT_SUCCESS,
					playload: res,
				});
			})
			.catch(() => {
				dispatch({
					type: GET_REPORT_FAILED,
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