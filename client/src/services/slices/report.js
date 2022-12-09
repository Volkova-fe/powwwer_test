import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
	name: "report",
	initialState: {
		report: [],
		reportRequest: {
			error: false,
			submitting: false,
		},
		trackRequest: {
			error: false,
			submitting: false,
		},
		message: null
	},
	reducers: {
		getRequest: state => { state.reportRequest.submitting = true },
		rangeDaysReport(state, action) {
			state.report = action.payload.slice().sort(
				(a, b) => a.id > b.id ? 1 : -1
			);
			state.reportRequest.submitting = false;
		},
		selectDayReport(state, action) {
			state.report = action.payload.slice().sort(
				(a, b) => a.id > b.id ? 1 : -1
			);
			state.reportRequest.submitting = false;
		},
		requestFailed: (state) => {
			state.reportRequest.submitting = false;
			state.reportRequest.error = true;
		},
		trackRequest: state => { state.trackRequest.submitting = true },
		postTrackAction(state, action) {
			state.message = action.payload
			state.report = []
			state.trackRequest.submitting = false;
		},
		trackFailed: (state) => {
			state.trackRequest.submitting = false;
			state.trackRequest.error = true;
		}
	}
})

export default reportSlice.reducer
export const {
	getRequest,
	rangeDaysReport,
	selectDayReport,
	requestFailed,
	trackRequest,
	trackFailed,
	postTrackAction
} = reportSlice.actions