import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosI from "helpers/axiosInstance";

const initialState = {
  notebooks: null,
  notes: null,
  selectedNoteId: null,
  selectedNotebookId: null,
  content: null,
  selectedParentNotebookId: null,
  isSavingNote: false,
  tabs: {
    open: [],
    activeIndex: 0,
  },
};

// -- Notes Related Functionality
export const getNotesData = createAsyncThunk(
  "notes/getNotesData",
  async (thunkAPI) => {
    const response = await axiosI.get("/notes");
    return response.data;
  }
);

export const createNote = createAsyncThunk(
  "notes/createNote",
  async ({ notebookId }, thunkAPI) => {
    const response = await axiosI.post(`/notes`, { notebook_id: notebookId });
    return response.data;
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async (data, thunkAPI) => {
    // if (!_shouldSaveNote(thunkAPI, data)) return thunkAPI.rejectWithValue({});

    const response = await axiosI.patch(`/notes/${data.noteId}`, {
      ...data,
    });
    return response.data;
  }
);

export const updateSelectedNoteId = createAsyncThunk(
  "notes/updateSelectedNoteId",
  async ({ noteId }, thunkAPI) => noteId
);

// -- NotebooksTab Related Functionality

export const updateSelectedNotebookId = createAsyncThunk(
  "notes/updateSelectedNotebookId",
  async ({ notebookId }, thunkAPI) => notebookId
);

export const createNotebook = createAsyncThunk(
  "notes/createNotebook",
  async ({ name, parentId }, thunkAPI) => {
    const response = await axiosI.post(`/notebooks`, {
      name,
      parent_id: parentId,
    });
    return response.data;
  }
);

export const updateNotebook = createAsyncThunk(
  "notes/updateNotebook",
  async (data, thunkAPI) => {
    const { id, ...body } = data;
    const response = await axiosI.patch(`/notebooks/${id}`, {
      ...body,
    });
    return response.data;
  }
);

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    updateActiveIndex: (state, action) => {
      state.tabs.activeIndex = action.payload.index;
      state.selectedNoteId = action.payload.noteId;
    },
    addTab: (state, action) => {
      state.tabs.open.push(action.payload);
      state.tabs.activeIndex = state.tabs.open.length - 1;
      state.selectedNoteId = action.payload.noteId;
    },
    removeTab: (state, action) => {
      const newTabs = state.tabs.open.filter(
        (tab) => tab.noteId !== action.payload.noteId
      );

      const newActiveIndex = newTabs.length - 1;

      state.tabs.open = newTabs;

      state.tabs.activeIndex = newActiveIndex;
      state.selectedNoteId = newTabs[newActiveIndex].noteId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateSelectedNoteId.fulfilled, (state, action) => {
      state.selectedNoteId = action.payload;

      if (state.tabs.open.length === 1) {
        state.tabs.open[0].noteId = action.payload;
      } else {
        const noteCurrentlyOpenIndex = state.tabs.open.findIndex(
          (tab) => tab.noteId === action.payload
        );

        if (noteCurrentlyOpenIndex !== -1) {
          state.tabs.activeIndex = noteCurrentlyOpenIndex;
        } else {
          state.tabs.open[state.tabs.activeIndex].noteId = action.payload;
        }
      }
    });
    builder.addCase(updateSelectedNotebookId.fulfilled, (state, action) => {
      const notebookId = action.payload;
      state.selectedNotebookId = notebookId;

      // Also make sure we keep track of the parent notebook ID
      state.selectedParentNotebookId =
        state.notebooks[notebookId].parent_notebook_id;

      // TODO: pass in a note ID to set selected note ID
    });
    builder.addCase(getNotesData.fulfilled, (state, action) => {
      state.notebooks = action.payload.notebooks;
      state.notes = action.payload.notes;
      state.selectedNoteId = action.payload.default_note_id;
      state.selectedNotebookId = action.payload.default_notebook_id;

      state.tabs.open.push({ noteId: action.payload.default_note_id });
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      state.isSavingNote = false;

      state.notes[action.payload.note.id].title = action.payload.note.title;
      state.notes[action.payload.note.id].content = action.payload.note.content;
    });
    builder.addCase(updateNote.pending, (state, action) => {
      state.isSavingNote = true;
    });
    builder.addCase(updateNote.rejected, (state, action) => {
      state.isSavingNote = false;
    });
    builder.addCase(createNote.fulfilled, (state, action) => {
      const noteId = action.payload.note.id;
      state.notes[noteId] = action.payload.note;
      state.selectedNoteId = noteId;
    });
    builder.addCase(createNotebook.fulfilled, (state, action) => {
      const parentNotebookId = action.payload.parent_notebook_id;

      state.notebooks[action.payload.id] = action.payload;
      state.notebooks[parentNotebookId].subnotebook_ids.push(action.payload.id);
      state.selectedNotebookId = action.payload.id;
    });
    builder.addCase(updateNotebook.fulfilled, (state, action) => {
      state.notebooks[action.payload.id] = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { updateActiveIndex, addTab, removeTab } = notesSlice.actions;

export default notesSlice.reducer;
