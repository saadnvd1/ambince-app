import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosI from "helpers/axiosInstance";

const initialState = {
  gratitudeEntries: {},
  prompts: [],
  fetchingInitialData: true,
};

export const getGratitudeEntries = createAsyncThunk(
  "gratitude/getGratitudeEntries",
  async (thunkAPI) => {
    const response = await axiosI.get("/gratitude_entries");
    return response.data;
  }
);

export const createGratitudeEntry = createAsyncThunk(
  "gratitude/createEntry",
  async (data, thunkAPI) => {
    const response = await axiosI.post("/gratitude_entries", { ...data });
    return response.data;
  }
);

export const gratitudeSlice = createSlice({
  name: "gratitude",
  initialState,
  reducers: {
    updateActiveEntryId: (state, action) => {
      state.activeEntryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGratitudeEntries.fulfilled, (state, action) => {
      state.gratitudeEntries = action.payload.gratitude_entries;
      state.prompts = action.payload.prompts;

      state.fetchingInitialData = false;
    });
    builder.addCase(getGratitudeEntries.pending, (state, action) => {
      state.fetchingInitialData = true;
    });
    builder.addCase(getGratitudeEntries.rejected, (state, action) => {
      state.fetchingInitialData = false;
    });
    builder.addCase(createGratitudeEntry.fulfilled, (state, action) => {
      state.gratitudeEntries[action.payload.id] = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = gratitudeSlice.actions;

export default gratitudeSlice.reducer;
