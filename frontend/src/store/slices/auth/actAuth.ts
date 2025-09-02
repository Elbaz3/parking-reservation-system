import { createAsyncThunk } from "@reduxjs/toolkit";
import { login as login } from "../../../services/api";
import type { AuthResponse } from "../../../types/TUser";

const actAuth = createAsyncThunk<
  AuthResponse,
  { username: string; password: string; role: "employee" | "admin" }
>("auth/actAuth", async (userData, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const response = await login(userData);
    if (
      response.data.user.role === "employee" &&
      response.data.user.role != userData.role
    ) {
      return rejectWithValue({
        message: "not allowed",
      });
    }
    return response.data as AuthResponse;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export default actAuth;
