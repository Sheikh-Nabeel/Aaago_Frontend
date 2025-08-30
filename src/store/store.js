import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import mlmReducer from './mlmSlice';
import ddrReducer from './ddrSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    mlm: mlmReducer,
    ddr: ddrReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['user/setUser', 'user/logout'],
      },
    }),
});

export default store;