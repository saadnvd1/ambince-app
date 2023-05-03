import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const MODAL_NAMES = {
  ACCOUNT: "account",
  COMMAND_HUB: "commandHub",
  BILLING_UPGRADE: "billingUpgrade",
  BILLING_SUCCESS: "billingSuccess",
  CREATE_NOTEBOOK: "createNotebook",
};

const initialState = {
  accountModalIsOpen: false,
  commandHubModalIsOpen: false,
  billingUpgradeModalIsOpen: false,
  billingSuccessModalIsOpen: false,
  createNotebookModalIsOpen: false,
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    toggleModal(state, action) {
      const { modalName } = action.payload;
      state[`${modalName}ModalIsOpen`] = !state[`${modalName}ModalIsOpen`];
    },
  },
  extraReducers: (builder) => {},
});

// Action creators are generated for each case reducer function
export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
