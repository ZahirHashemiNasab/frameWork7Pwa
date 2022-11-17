import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface CounterState {
  value: number;
  TOKEN: string | null;
  REFRESH_TOKEN: string | null;
}

const initialState: CounterState = {
  value: 0,
  TOKEN: null,
  REFRESH_TOKEN: null,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    saveToken: (
      state: any,
      action: PayloadAction<{
        token: string | null;
        refreshToken: string | null;
      }>
    ) => {
      state.TOKEN = action.payload.token;
      state.REFRESH_TOKEN = action.payload.refreshToken;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, saveToken } =
  counterSlice.actions;

export default counterSlice.reducer;
