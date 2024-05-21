import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  keyword: "",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    createDataFunc: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    sortingDataFunc: (state, action) => {
      state.data = [
        ...state.data.sort((a, b) =>
          action.payload == "asc"
            ? a.price - b.price
            : action.payload == "desc"
            ? b.price - a.price
            : null
        ),
      ];
    },
    deleteDataFunc: (state, action) => {
      state.data = [...state.data.filter((dt) => dt.id != action.payload)];
    },
    updateDataFunc: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    searchDataFunc: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export const {
  createDataFunc,
  deleteDataFunc,
  updateDataFunc,
  sortingDataFunc,
  searchDataFunc,
} = dataSlice.actions;

export default dataSlice.reducer;
