import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../utils/localStorage";

import {
  loginUserThunk,
  registetUserThunk,
  updateUserThunk,
  clearStoreThunk,
} from "./userThunk";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  isSidebarOpen: false,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registetUserThunk("/auth/register", user, thunkAPI);
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/auth/login", user, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  "user/udpdateUser",
  async (user, thunkAPI) => {
    return updateUserThunk("/auth/updateUser", user, thunkAPI);
  }
);

export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello There ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);

        toast.success(`Welcome Back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;

        addUserToLocalStorage(user);
        toast.success(`User Updated!`);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
    .addCase(clearStore.rejected, () => {
      toast.error('There was an error..');
    });
  },
  // extraReducers: {
  //   [registerUser.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [registerUser.fulfilled]: (state, { payload }) => {
  //     state.isLoading = false;
  //     const { user } = payload;
  //     state.user = user;
  //     addUserToLocalStorage(user);
  //     toast.success(`Hello there ${user.name}`);
  //   },
  //   [registerUser.rejected]: (state, {payload}) => {
  //     state.isLoading = false;
  //     toast.error(payload)
  //   },
  //   [loginUser.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [loginUser.fulfilled]: (state, { payload }) => {
  //     state.isLoading = false;
  //     const { user } = payload;
  //     state.user = user;
  //     addUserToLocalStorage(user);
  //     toast.success(`Welcome back ${user.name}`);
  //   },
  //   [loginUser.rejected]: (state, {payload}) => {
  //     state.isLoading = false;
  //     toast.error(payload)
  //   },
  //   [updateUser.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [updateUser.fulfilled]: (state, { payload }) => {
  //     state.isLoading = false;
  //     const { user } = payload;
  //     console.log(user)
  //     state.user = user;
  //     addUserToLocalStorage(user);
  //     toast.success("User updated");

  //   },
  //   [updateUser.pending]: (state, {payload}) => {
  //     state.isLoading = false;
  //   },
  // },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;

export default userSlice.reducer;
