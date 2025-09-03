import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../../types/TLoading";
import type { AuthResponse } from "../../../types/TUser";
import actAuth from "./actAuth";

interface IAuthState {
  user: AuthResponse | null;
  loading: TLoading;
  error: string | null;
}

const initialState: IAuthState = {
  user: null,
  loading: "idle",
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeUser: (state) => {
      state.user = null;
    },
    reStateError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actAuth.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actAuth.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(actAuth.rejected, (state, action) => {
        state.loading = "failed";
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message || "An unexpected error";
        }
      });
  },
});

export const { removeUser, reStateError } = AuthSlice.actions;
export { actAuth };
export default AuthSlice.reducer;
