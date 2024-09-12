import { configureStore } from '@reduxjs/toolkit';
import { authReducer, orderReducer } from './slices';

const store = configureStore({
    reducer: {
        auth: authReducer,
        order: orderReducer,
    },
});

export { store };
