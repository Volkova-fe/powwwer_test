import { getReportRequest } from "../../API/report-api";

export const GET_REPORT_REQUEST = 'GET_REPORT_REQUEST';
export const GET_REPORT_SUCCESS = 'GET_REPORT_SUCCESS';
export const GET_REPORT_FAILED = 'GET_REPORT_FAILED';

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