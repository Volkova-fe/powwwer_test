import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
	name: "report",
	initialState: {
		report: [],
		reportRequest: {
			error: false,
			submitting: false,
		}, 
		message: null
	},
	reducers: {
		getRequest: state => {state.reportRequest.submitting = true},
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
		requestFaied: (state) => { 
			state.reportRequest.submitting = false;
			state.reportRequest.error = true;
		}
	}
})

export default reportSlice.reducer
export const { 
	getRequest,
	rangeDaysReport,
	selectDayReport,
	requestFaied
} = reportSlice.actions