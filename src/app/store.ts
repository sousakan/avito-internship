import { configureStore } from '@reduxjs/toolkit';
import storiesReducer from '../features/stories/slice';

export const store = configureStore({
  reducer: {
    stories: storiesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
