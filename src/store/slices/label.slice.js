import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { labelService } from "../../services/labels.service";

export const getLabels = createAsyncThunk("labels/getLabels", async (uid) => {
  let labels;
  try {
    labels = await labelService.getLabels(uid);
    return labels;
  } catch (error) {
    // rejectWithValue("error occured")
  }
});
const initialState = {
  value: [],
};

export const labelSlice = createSlice({
  name: "label",
  initialState,
  reducers: {
    addLabel: (state, action) => {
      labelService.saveLabel(action.payload);
      state.value = [...state.value, action.payload];
    },
    setLabels: (state, action) => {
      state.value = action.payload 
    },
  },
  extraReducers: {
    [getLabels.pending]: (state, action) => {
      console.log("pending");
    },
    [getLabels.fulfilled]: (state, { payload }) => {
      state.value = payload || []
    },
    [getLabels.rejected]: (state) => {
      console.log("labels could not load");
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLabel, setLabels } = labelSlice.actions;

export default labelSlice.reducer;
