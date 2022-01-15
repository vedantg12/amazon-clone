import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";

// The global store with one slice
export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
