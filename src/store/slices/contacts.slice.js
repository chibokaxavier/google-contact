import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { contactService } from "../../services/contacts.service";

export const getContacts = createAsyncThunk("/getContacts", async (uid) => {
  let contacts, trash;
  try {
    contacts = await contactService.getContacts(uid);
    trash = await contactService.getTrashContacts(uid);
    return { contacts, trash };
  } catch (error) {
    // rejectWithValue("error occured")
  }
});
const initialState = {
  value: [],
  trash: [],
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, action) => {
      contactService.saveContact(action.payload);
      state.value = [...state.value, action.payload];
    },
    setContacts: (state, action) => {
      state.value = action.payload;
    },
    clearTrash: (state) => {
      state.trash = [];
    },
  },
  extraReducers: {
    [getContacts.pending]: (state, action) => {
      console.log("pending");
    },
    [getContacts.fulfilled]: (state, { payload }) => {
      state.value = payload.contacts || [];
      state.trash = payload.trash || [];
    },
    [getContacts.rejected]: (state) => {
      console.log("labels could not load");
    },
  },
});

// Action creators are generated for each case reducer function
export const { addContact, setContacts, clearTrash } = contactSlice.actions;

export default contactSlice.reducer;
