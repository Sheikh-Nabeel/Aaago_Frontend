import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import mlmReducer from './mlmSlice';
import ddrReducer from './ddrSlice';
import crrReducer from './crrSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    mlm: mlmReducer,
    ddr: ddrReducer,
    crr: crrReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['user/setUser', 'user/logout'],
      },
    }),
});

export default store;