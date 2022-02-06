import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../app/features/counter/counterSlice.js'
import adminsReducer from "./features/admins/AdminsSlice";
import postsReducer from "./features/posts/PostsSlace";
import userAdminsReducer from "./features/userAdmins/UserAdminsSlace";

export default configureStore({
    reducer: {
        counter: counterReducer,
        admins: adminsReducer,
        posts: postsReducer,
        userAdmins: userAdminsReducer,
    },
})