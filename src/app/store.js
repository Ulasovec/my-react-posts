import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../app/features/counter/counterSlice.js'
import adminsReducer from "./features/admins/AdminsSlice";

export default configureStore({
    reducer: {
        counter: counterReducer,
        admins: adminsReducer,
    },
})