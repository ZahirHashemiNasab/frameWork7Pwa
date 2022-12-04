import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface SettingState {
  lang: "fa" | "en";
}

const initialState: SettingState = {
  lang: "fa",
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    changeLang: (state, action: PayloadAction<"fa" | "en">) => {
      state.lang = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeLang } = settingSlice.actions;

export default settingSlice.reducer;
