import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../feature/authSlice'

export let store = configureStore({
    reducer: {
        auth: userReducer,
    },
});
