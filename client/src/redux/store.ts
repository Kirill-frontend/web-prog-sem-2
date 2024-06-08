import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slicers/auth.slice"
import galleryReduce from "./slicers/gallery.slice";
import getOwnPhotosReduce from "./slicers/myphotos.slice";
import searchReduce from "./slicers/search.slice";
import toastReduce from "./slicers/toast.slice";
import favoritesReduce from "./slicers/favorites.slice";
import loadingReduce from './slicers/loading.slice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorite: favoritesReduce,
    loading: loadingReduce,
    gallery: galleryReduce,
    toast: toastReduce,
    getOwnPhotos: getOwnPhotosReduce,
    search: searchReduce
  }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch