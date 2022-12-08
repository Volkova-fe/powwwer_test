import { trackerUserRequest } from "../../API/report-api";
import { getRequest, postTrackAction, requestFaied } from "../slices/track";

export const trackAction = (type, time, date) => (dispatch) => {
	dispatch(getRequest());
	trackerUserRequest(type, time, date)
		.then((res) => dispatch(postTrackAction(res)))
		.catch(() => dispatch(requestFaied()))
};