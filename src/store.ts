import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./designSystem/components/Header/slice/menuSlice";
import settingModalReducer from "./designSystem/components/RobotSetting/slice/settingModalSlice";
export const store = configureStore({
  reducer: {
    menu: menuReducer,
    settingModal: settingModalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
