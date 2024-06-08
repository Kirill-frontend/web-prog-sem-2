import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetOwnPhotosReduceType } from "../../utils/reduceTypes";
import { PostType } from "../../utils/types";
import { Url } from "../consts";
import { beginLoading, endLoading } from "./loading.slice";


const initialState: GetOwnPhotosReduceType = {
  photos: []
}


export const getOwnPhotos = createAsyncThunk(
  "myPhoto/get",
  async (_, { dispatch }) => {
    try {
      dispatch(beginLoading());
      const res = await fetch(`${Url}api/photo/getmyphotos`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const json = await res.json();
      dispatch(endLoading());      
      return json
    } catch (e) {
      console.log(e);
    }
  }
)

export const deleteOwnPhoto = createAsyncThunk('myPhoto/delete', async (post: PostType, {dispatch}) => {
try {  
  const shoudDelete = window.confirm(`You sure delete ${post.title}`)
  if (shoudDelete) {
    dispatch(beginLoading())
    const res = await fetch(`${Url}api/photo/delete`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    const json = await res.json()
    // dispatch(toastView(json.message))        
    dispatch(endLoading())
    return json.posts
  }
} catch (error) {
  
}
})


export const myPhotosSlice = createSlice({
  name: "myPhotos",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getOwnPhotos.fulfilled, (state, {payload}) => {
      state.photos = payload
    })
  }
});

export const {} = myPhotosSlice.actions;
export default myPhotosSlice.reducer;