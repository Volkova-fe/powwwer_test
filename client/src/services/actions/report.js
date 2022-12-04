import { getReportRequest } from "../../API/report-api";
import { GET_REPORT_FAILED, GET_REPORT_REQUEST, GET_REPORT_SUCCESS } from "../action-types/report";


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