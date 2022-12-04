import { store } from "../store/store";

// use it in non reactive components for get redux global state
export const getGlobalState = () => {
  return store?.getState();
};
