import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { contactService } from "../../services/contacts.service";

export const getContacts = createAsyncThunk("/getContacts", async (uid) => {
  let trash;
  try {
    trash = await trashService.getContacts(uid);
    return contacts;
  } catch (error) {
    // rejectWithValue("error occured")
  }
});
const initialState = {
  value: [],
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
  },
  extraReducers: {
    [getContacts.pending]: (state, action) => {
      console.log("pending");
    },
    [getContacts.fulfilled]: (state, { payload }) => {
      state.value = payload || []
    },
    [getContacts.rejected]: (state) => {
      console.log("labels could not load");
    },
  },
});

// Action creators are generated for each case reducer function
export const { addContact, setContacts } = contactSlice.actions;

export default contactSlice.reducer;
