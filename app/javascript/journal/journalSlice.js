import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosI from "helpers/axiosInstance";

const initialState = {
  entries: {},
  activeEntryId: null,
};

export const getEntries = createAsyncThunk(
  "journal/getEntries",
  async (thunkAPI) => {
    const response = await axiosI.get("/entries");
    return response.data;
  }
);

export const createEntry = createAsyncThunk(
  "journal/createEntry",
  async (thunkAPI) => {
    const response = await axiosI.post("/entries");
    return response.data;
  }
);

export const updateEntry = createAsyncThunk(
  "journal/updateEntry",
  async (data, thunkAPI) => {
    const response = await axiosI.post(`/entries/${data.id}`, { ...data });
    return response.data;
  }
);

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    updateActiveEntryId: (state, action) => {
      state.activeEntryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEntries.fulfilled, (state, action) => {
      state.entries = action.payload.entries;

      if (action.payload.latest_entry_id) {
        state.activeEntryId = action.payload.latest_entry_id;
      }
    });
    builder.addCase(createEntry.fulfilled, (state, action) => {
      state.entries[action.payload.id] = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { updateActiveEntryId } = journalSlice.actions;

export default journalSlice.reducer;
