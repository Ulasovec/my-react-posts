import { createSlice } from '@reduxjs/toolkit'

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        value:[],
    },

    reducers: {

        setPosts: (state,action) => {
            console.log(state);
            console.log(action);
            state.value = [...action.payload,...state.value]
        },
        deletePosts: (state,action) => {
            console.log(state);
            console.log(action);
            state.value = state.value.filter(post => post.id !== action.payload.id)
        },

    },
})

// Action creators are generated for each case reducer function
export const { setPosts, deletePosts } = postsSlice.actions

export default postsSlice.reducer