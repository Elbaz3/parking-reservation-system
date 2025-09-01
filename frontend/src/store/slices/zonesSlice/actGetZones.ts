import { createAsyncThunk } from "@reduxjs/toolkit";
import { getZones as apiGetZones } from "../../../services/api";
import type TZone from "../../../types/TZone";

const getZones = createAsyncThunk<TZone[], string>(
  "zones/getZones",
  async (gateID, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await apiGetZones(gateID);
      return response.data as TZone[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default getZones;
