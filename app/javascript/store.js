import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import notesReducer from "./slices/notesSlice";
import billingReducer from "./slices/billingSlice";
import modalsReducer from "./slices/modalSlice";
import imagesReducer from "./slices/imagesSlice";
import journalReducer from "./journal/journalSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
    billing: billingReducer,
    modals: modalsReducer,
    images: imagesReducer,
    journal: journalReducer,
  },
});

export default store;
