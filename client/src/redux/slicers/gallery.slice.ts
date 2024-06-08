import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../libs/request";
import { PostType } from "../../utils/types";
import { Url } from "../consts";
import { beginLoading, endLoading } from "./loading.slice";

type InitialGalleryStateType = {
  posts: PostType[];
  favorites: PostType[];
};

const initialState: InitialGalleryStateType = {
  posts: [],
  favorites: [],
};

export const initPhotos = createAsyncThunk(
  "photo/init",
  async (_, { dispatch }) => {
    try {
      dispatch(beginLoading());
      const res = await request(`${Url}api/photo/posts`, "GET", null, {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      dispatch(endLoading());
      console.log(res);
      return res;
    } catch (error) {}
  }
);

export const addPhoto = createAsyncThunk(
  "photo/add",
  async (form: HTMLFormElement, { dispatch }) => {
    dispatch(beginLoading());
    const res = await fetch(`${Url}upload/new`, {
      method: "POST",
      body: new FormData(form),
    });
    const json = await res.json();
    dispatch(endLoading());
    // dispatch(toastView(json.message))
  }
);

export const downloadPhoto = createAsyncThunk(
  "photo/download",
  async (post: PostType, { dispatch }) => {
    try {
      console.log(post);
      const filename = post.photo.split("/")[4];
      const res = await fetch(`${Url}/download/${filename}`);

      if (!res.ok) {
        // dispatch(toastView("Error when try download file"));
      }

      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();

      // dispatch(toastView("Download file started"));
    } catch (error) {}
  }
);

export const likePhoto = createAsyncThunk("photo/like", async (post: PostType, { dispatch }) => {
  try {
    const res = await fetch(`${Url}api/photo/like/${post.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    const postsReq = await fetch(`${Url}api/photo/posts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const posts = await postsReq.json();
    console.log(posts);

    return posts
  } catch (e) {
    // console.log(e.message)
  }
});

export const unlikePhoto = createAsyncThunk('photo/unlike', async (post: PostType, {dispatch}) => {
  try {
          const res = await fetch(`${Url}api/photo/unlike/${post.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }      
          })
      
          const data = await res.json()
          const postsReq = await fetch(`${Url}api/photo/posts`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          const posts = await postsReq.json()                    
          return posts
        } catch (e) {
          // console.log(e.message)
        }
})

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initPhotos.fulfilled, (state, { payload }) => {
      state.posts = payload;
    });
    builder.addCase(likePhoto.fulfilled, (state, {payload}) => {
      state.posts = payload
    })
    builder.addCase(unlikePhoto.fulfilled, (state, {payload}) => {
      state.posts = payload
    })
  },
});

export const {} = photoSlice.actions;
export default photoSlice.reducer;
