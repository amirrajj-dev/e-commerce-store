import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
}

const initialState: ModalState = {
  content: null,
  title: "",
  isOpen: false,
};

export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: { payload: { content: React.ReactNode; title: string } }
    ) => {
      state.isOpen = true;
      state.content = action.payload.content;
      state.title = action.payload.title;
    },
    closeModal: (state) => {
      state.title = "";
      state.content = null;
      state.isOpen = false;
    },
  },
});

export const {closeModal , openModal} = ModalSlice.actions
export default ModalSlice.reducer