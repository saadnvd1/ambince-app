import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import billingReducer from "./slices/billingSlice";
import modalsReducer from "./slices/modalSlice";
import imagesReducer from "./slices/imagesSlice";
import journalReducer from "./journal/journalSlice";
import inspirationReducer from "./inspiration/inspirationSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    billing: billingReducer,
    modals: modalsReducer,
    images: imagesReducer,
    journal: journalReducer,
    inspiration: inspirationReducer,
  },
});

export default store;
