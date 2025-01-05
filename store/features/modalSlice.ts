import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  value: string;
}

const initialState: ModalState = {
  value: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    hideModal: (state) => {
      state.value = "";
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
