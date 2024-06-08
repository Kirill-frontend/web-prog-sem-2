import {  createSlice } from "@reduxjs/toolkit";

import {  ToastReduceType } from "../../utils/reduceTypes";


const initialState: ToastReduceType = {
  message: '',
  show: false
}

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, {payload}) => {
      state.message = payload
      state.show = true
    },
    hideToast: (state) => {
      state.show = false
    }
  },
});

export const {showToast, hideToast} = toastSlice.actions;
export default toastSlice.reducer;