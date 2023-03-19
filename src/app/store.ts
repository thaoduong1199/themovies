import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import playingNowSlice from "../feature/playingnow/playingnowSlice";
import topratedSlice from "../feature/toprated/topratedSlice";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
export function makeStore() {
  const persistConfig = {
    key: "root",
    storage,
  };
  const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({ playingnow: playingNowSlice, toprated: topratedSlice })
  );

  return configureStore({
    reducer: persistedReducer,
    middleware: customizedMiddleware,
  });
}
const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
