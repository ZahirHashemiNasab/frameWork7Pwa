import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./profile/profile";
import settingReducer from "./generalSetting/generalSetting";
import { KbComposition } from "../service/kb-composition/kb-composition";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { PersistGate } from "redux-persist/integration/react";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whiteList: ["counter"],
};
const reducer = combineReducers({
  counter: counterReducer,
  setting: settingReducer,
  [KbComposition?.reducerPath]: KbComposition?.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(KbComposition.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
