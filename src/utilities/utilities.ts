import { store } from "../store1/store";

// use it in non reactive components for get redux global state
export const getGlobalState = () => {
  return store?.getState();
};
