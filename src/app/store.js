import { configureStore } from '@reduxjs/toolkit';

import TodoReducer from '../Slices/todoSlice';

export const Store = configureStore({
  reducer: {
    todo: TodoReducer,
  },
});
