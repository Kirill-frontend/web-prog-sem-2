import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../libs/request";
import { AuthReduceType } from "../../utils/reduceTypes";
import { Url } from "../consts";
import { beginGlobalLoading, endGlobalLoading } from "./loading.slice";

const initialState: AuthReduceType = {
  currentUser: null,
  isAuth: false,
};

interface authData {
  email: string;
  password: string;
}

interface regData {
  email: string;
  password: string;
  username: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: authData, { dispatch }) => {
    try {
    dispatch(beginGlobalLoading())
      const res = await request(`${Url}api/auth/login`, "POST", {
        email,
        password,
      });
      if(!res.token) throw new Error("not auth");
      
      
      localStorage.setItem("token", res.token);
      window.location.href = "/profile";
      dispatch(endGlobalLoading())

      // dispatch(toastView(res.message))
      return res;
    } catch (error) {
      console.log(error);
      window.location.href = "/auth";

    }
  }
);

export const auth = createAsyncThunk("auth/auth", async (_, { dispatch }) => {
  try {
    dispatch(beginGlobalLoading())
    const res = await fetch(`${Url}api/auth/auth`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json = await res.json();
    dispatch(endGlobalLoading())
    if (res.statusText === "Unauthorized") {
      localStorage.removeItem("token");      
      return false;
    }    
    return json;
  } catch (e) {
    console.log(e);
  }
});

export const registration = createAsyncThunk(
  "auth/registrate",
  async ({ email, password, username }: regData, { dispatch }) => {
    try {
    dispatch(beginGlobalLoading())

      const res = await request(`${Url}api/auth/registation`, "POST", {
        email,
        password,
        username,
      });
      // dispatch(toastView(res.message));
      dispatch(endGlobalLoading())
      window.location.href = "/auth";
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    delUser: (state) => {
      state.currentUser = null
      state.isAuth = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state: AuthReduceType, action) => {
      state.currentUser = action.payload.user;
      state.isAuth = true;
    });
    builder.addCase(auth.fulfilled, (state: AuthReduceType, action) => {      
      if (action.payload){
        state.currentUser = action.payload.user;
        state.isAuth = true;
      } else {        
        state.isAuth = false
      }
    });
  },
});

export const {delUser} = authSlice.actions;
export default authSlice.reducer;
