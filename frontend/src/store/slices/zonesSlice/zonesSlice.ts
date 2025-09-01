import { createSlice } from "@reduxjs/toolkit";
import type TZone from "../../../types/TZone";
import type { TLoading } from "../../../types/TLoading";
import getZones from "./actGetZones";

interface IZonesState {
  zonesDetails: TZone[];
  loading: TLoading;
  error: string | null;
}

const initialState: IZonesState = {
  zonesDetails: [],
  loading: "idle",
  error: null,
};

const ZonesSlice = createSlice({
  name: "zones",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getZones.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getZones.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.zonesDetails = action.payload;
      })
      .addCase(getZones.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An unexpected error";
      });
  },
});

export default ZonesSlice.reducer;
