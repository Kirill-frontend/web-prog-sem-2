import { createSlice } from "@reduxjs/toolkit";
import { LoadingReduceType } from "../../utils/reduceTypes";


const initialState: LoadingReduceType = {
  loading: false,
  globalLoading: false
}


export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
  beginGlobalLoading: (state) => {
    state.globalLoading = true
  },
  endGlobalLoading: (state) => {
    state.globalLoading = false
  },
  beginLoading: (state) => {
    state.loading = true
  },
  endLoading: (state) => {
    state.loading = false
  }
  },
});

export const {beginGlobalLoading, endGlobalLoading, beginLoading, endLoading} = loadingSlice.actions;
export default loadingSlice.reducer;