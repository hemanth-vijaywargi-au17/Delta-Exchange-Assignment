import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get Members Async Thunk
export const getMembers = createAsyncThunk(
  "/user/team_members/get",
  async (token) => {
    // GET request
    let { data } = await axios.get("/api/user/team_members", {
      headers: { token: token },
    });
    // Returning requested Data to be added to state by the reducer
    return data.team_members;
  }
);

// Login Async Thunk
export const login = createAsyncThunk(
  "user/login",
  async (userObj, { dispatch }) => {
    // In case if user is already logged in and has signed up for a new account ,
    // then in-order to use automatic signin after signup functionality we need to first signout the current account.
    dispatch(logout());

    // POST request for login
    let { data } = await axios.post("/api/user/login", userObj);

    // After login getting Team Members
    if (!data.error) {
      dispatch(getMembers(data.token));
    }

    // Returning user Data to be added to state, if error then that will be handled by the reducer
    return data;
  }
);

// Sign Up Async Thunk
export const signup = createAsyncThunk("user/signup", async (userObj) => {
  // POST request for Sign Up
  let { data } = await axios.post("/api/user/signup", userObj);
  // Returning response which contains if error happened or not and error message
  return data;
});

export const addMember = createAsyncThunk(
  "/user/team_members/add",
  async (memberObj, { getState }) => {
    const {
      user: { token, _id },
    } = getState();
    memberObj.userId = _id;
    let { data } = await axios.post("/api/user/team_members/add", memberObj, {
      headers: { token: token },
    });
    return data;
  }
);

export const removeMember = createAsyncThunk(
  "/user/team_members/remove",
  async (memberId, { getState }) => {
    const {
      user: { token, _id },
    } = getState();
    let body = {
      userId: _id,
      memberId: memberId,
    };
    let {
      data: { error },
    } = await axios.post("/api/user/team_members/remove", body, {
      headers: { token: token },
    });
    return { error, memberId };
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: localStorage.getItem("name") || null,
    email: localStorage.getItem("email") || null,
    _id: localStorage.getItem("_id") || null,
    token: localStorage.getItem("token") || null,
    team_members: [],
    signin_error: null,
    signup_error: null,
  },
  reducers: {
    logout: (state, action) => {
      // Resetting State and LocalStorage
      state.name = null;
      state.email = null;
      state.token = null;
      state._id = null;
      state.team_members = [];
      state.signin_error = null;
      state.signup_error = null;
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("_id");
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      if (action.payload.error) {
        state.signin_error = action.payload.message;
      } else {
        // Setting State and LocalStorage
        state.signin_error = null;
        state.signup_error = null;
        const {
          token,
          user: { name, email, _id },
        } = action.payload;

        state.name = name;
        state.email = email;
        state.token = token;
        state._id = _id;
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("token", token);
        localStorage.setItem("_id", _id);
      }
    },
    [getMembers.fulfilled]: (state, action) => {
      state.team_members = action.payload;
    },
    [signup.fulfilled]: (state, action) => {
      const { error, message } = action.payload;
      if (error) {
        state.signup_error = message;
      } else {
        state.signup_error = "Sign Up Success, Now logging you in!";
      }
    },
    [addMember.fulfilled]: (state, action) => {
      const { error, insertedMember } = action.payload;
      if (!error) {
        state.team_members.push(insertedMember);
      }
    },
    [removeMember.fulfilled]: (state, action) => {
      const { error, memberId } = action.payload;
      if (!error) {
        state.team_members = state.team_members.filter(
          (obj) => obj._id !== memberId
        );
      }
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
