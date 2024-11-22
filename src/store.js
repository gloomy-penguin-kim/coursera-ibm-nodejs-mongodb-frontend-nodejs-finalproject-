import { configureStore } from '@reduxjs/toolkit';
import storeReducer from './StoreItems'

 const store = configureStore({
    reducer: { 
        store: storeReducer
    },
});

export default store
