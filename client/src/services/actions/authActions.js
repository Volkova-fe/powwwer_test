import { setFormValue } from "../feature/authSlice";


export const setInputFormValue = (field, value) => (dispatch) => {
	dispatch(setFormValue({ field, value }))
};