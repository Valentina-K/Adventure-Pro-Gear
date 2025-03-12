import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from '@/redux/features/apiSlice';
import productReducer from '@/redux/products/slice';
import type { Action, ThunkAction } from '@reduxjs/toolkit';

// const rootReducer = combineSlices(authSlice);
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['products'],
};

const rootReducer = combineSlices({
  [apiSlice.reducerPath]: apiSlice.reducer,
  products: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
