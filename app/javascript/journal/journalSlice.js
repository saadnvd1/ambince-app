import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosI from "helpers/axiosInstance";

const initialState = {
  entries: {},
  activeEntryId: null,
  fetchingInitialData: true,
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
    const response = await axiosI.patch(`/entries/${data.id}`, { ...data });
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

      state.fetchingInitialData = false;
    });
    builder.addCase(getEntries.pending, (state, action) => {
      state.fetchingInitialData = true;
    });
    builder.addCase(getEntries.rejected, (state, action) => {
      state.fetchingInitialData = false;
    });
    builder.addCase(createEntry.fulfilled, (state, action) => {
      state.entries[action.payload.id] = action.payload;
      state.activeEntryId = action.payload.id;
    });
    builder.addCase(updateEntry.fulfilled, (state, action) => {
      state.entries[action.payload.id].title = action.payload.title;
      state.entries[action.payload.id].content = action.payload.content;
    });
  },
});

// Action creators are generated for each case reducer function
export const { updateActiveEntryId } = journalSlice.actions;

export default journalSlice.reducer;
