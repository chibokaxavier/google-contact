import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "./slices/contacts.slice";
import counterSlice from "./slices/counter.slice";
import labelSlice from "./slices/label.slice";
import  snackbarSlice  from './slices/snackbar.slice';
import  authSlice  from './slices/auth.slice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    labelList: labelSlice,
    contacts: contactSlice,
    snackbar: snackbarSlice,
    authentication: authSlice
  },
});
