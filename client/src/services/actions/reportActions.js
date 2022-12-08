
import { getRangeDaysReportRequest, getSelectDayReportRequest } from "../../API/report-api";
import { getRequest, rangeDaysReport, requestFaied, selectDayReport } from "../slices/report";


export const getSelectDayReport = (date, id) => (dispatch) => {
	dispatch(getRequest());
	getSelectDayReportRequest(date, id)
		.then((res) => dispatch(selectDayReport(res)))
		.catch(() => dispatch(requestFaied()))
}

export const getRangeDaysReport = (from, to) => (dispatch) => {
	dispatch(getRequest());
	getRangeDaysReportRequest(from, to)
		.then((res) => dispatch(rangeDaysReport(res)))
		.catch(() => dispatch(requestFaied()))
};
