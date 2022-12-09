
import { getRangeDaysReportRequest, getSelectDayReportRequest, trackerUserRequest } from "../../API/report-api";
import {
	getRequest,
	postTrackAction,
	rangeDaysReport,
	requestFailed,
	selectDayReport,
	trackFailed,
	trackRequest
} from "../slices/report";


export const getSelectDayReport = (date, id) => (dispatch) => {
	dispatch(getRequest());
	getSelectDayReportRequest(date, id)
		.then((res) => dispatch(selectDayReport(res)))
		.catch(() => dispatch(requestFailed()))
}

export const getRangeDaysReport = (from, to) => (dispatch) => {
	dispatch(getRequest());
	getRangeDaysReportRequest(from, to)
		.then((res) => dispatch(rangeDaysReport(res)))
		.catch(() => dispatch(requestFailed()))
};

export const trackAction = (type, time, date) => (dispatch) => {
	dispatch(trackRequest());
	trackerUserRequest(type, time, date)
		.then((res) => dispatch(postTrackAction(res)))
		.catch(() => dispatch(trackFailed()))
};