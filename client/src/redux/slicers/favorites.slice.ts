import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FavoriteReduceType } from "../../utils/reduceTypes";
import { PostType } from "../../utils/types";
import { Url } from "../consts";
import { beginLoading, endLoading } from "./loading.slice";



const initialState: FavoriteReduceType = {
  favorites: []
}


export const addToFavorite = createAsyncThunk('favorites/add', async(post: PostType, {dispatch}) => {
  try {
    const res = await fetch(`${Url}favorite/add`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const json = await res.json()
    return json.favorites
  } catch (error) {
    
  }
})

export const removeFromFavorite = createAsyncThunk('favorites/remove', async (post: PostType, {dispatch}) => {
  try {
    const res = await fetch(`${Url}favorite/remove`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const json = await res.json()
    // dispatch(toastView(json.message))
    // dispatch(getFavorites(json.favorites))
    return json.favorites
  } catch (error) {
    
  }
})

export const getFavorites = createAsyncThunk('favorites/get', async (_, {dispatch}) => {
  try {
    dispatch(beginLoading())
    const res = await fetch(`${Url}favorite/get`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const json = await res.json()
    dispatch(endLoading())    
    return json
  } catch (error) {
    
  }
})

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(addToFavorite.fulfilled, (state, {payload}) => {
      state.favorites = payload
    })
    builder.addCase(getFavorites.fulfilled, (state, {payload}) => {
      state.favorites = payload
    })
    builder.addCase(removeFromFavorite.fulfilled, (state, {payload}) => {
      state.favorites = payload
    })
  }
});

export const {} = favoritesSlice.actions;
export default favoritesSlice.reducer;