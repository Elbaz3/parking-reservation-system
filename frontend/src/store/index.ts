import { configureStore } from "@reduxjs/toolkit";
import zonesReducer from "./slices/zonesSlice/zonesSlice";
import AuthSlice from "./slices/auth/authSlice";

// ...
const store = configureStore({
  reducer: {
    zones: zonesReducer,
    auth: AuthSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
