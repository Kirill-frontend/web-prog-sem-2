import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SearchReduceType } from "../../utils/reduceTypes";
import { Url } from "../consts";
import { beginLoading, endLoading } from "./loading.slice";

const initialState: SearchReduceType = {
  searched: []
}


export const search = createAsyncThunk('search/get', async (criteria: string, {dispatch}) => {
  try {
    dispatch(beginLoading())
    const res = await fetch(`${Url}search/search?search=${criteria}`)
    const json = await res.json()    
    dispatch(endLoading())
    return json
  } catch (error) {
    
  }
})

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(search.fulfilled, (state, {payload}) => {
      state.searched = payload
    })
  }
});

export const {} = searchSlice.actions;
export default searchSlice.reducer;