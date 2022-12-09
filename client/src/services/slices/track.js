import { createSlice } from "@reduxjs/toolkit";

const trackSlice = createSlice({
	name: "track",
	initialState: {
		trackRequest: {
			error: false,
			submitting: false,
		},
		message: null
	},
	reducers: {
		getRequest: state => { state.trackRequest.submitting = true },
		postTrackAction(state, action) {
			state.message = action.payload
			state.trackRequest.submitting = false;
		},
		requestFaied: (state) => {
			state.trackRequest.submitting = false;
			state.trackRequest.error = true;
		}
	}
})

export default trackSlice.reducer
export const {
	getRequest,
	postTrackAction,
	requestFaied
} = trackSlice.actions