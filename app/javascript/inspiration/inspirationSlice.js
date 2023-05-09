import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosI from "helpers/axiosInstance";

const initialState = {
  standardQuotes: {},
  starredQuotes: {},
  fetchingInitialData: false,
};

export const getData = createAsyncThunk(
  "inspiration/getData",
  async (thunkAPI) => {
    const response = await axiosI.get("/quotes");
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

export const inspirationSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    updateActiveEntryId: (state, action) => {
      state.activeEntryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      const { starred_quotes, standard_quotes } = action.payload;

      state.starredQuotes = starred_quotes;
      state.standardQuotes = standard_quotes;

      state.fetchingInitialData = false;
    });
    builder.addCase(getData.pending, (state, action) => {
      state.fetchingInitialData = true;
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.fetchingInitialData = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = inspirationSlice.actions;

export default inspirationSlice.reducer;
