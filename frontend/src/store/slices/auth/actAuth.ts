import { createAsyncThunk } from "@reduxjs/toolkit";
import { login as login } from "../../../services/api";
import type { AuthResponse } from "../../../types/TUser";

const actAuth = createAsyncThunk<
  AuthResponse,
  { username: string; password: string }
>("auth/actAuth", async (userData, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const response = await login(userData);
    return response.data as AuthResponse;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export default actAuth;
