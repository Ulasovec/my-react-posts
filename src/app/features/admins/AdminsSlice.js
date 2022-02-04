import { createSlice } from '@reduxjs/toolkit'

export const adminsSlice = createSlice({
    name: 'admins',
    initialState: {
        value:{id:0, isAdmin:false, name:'name'} ,
    },



    reducers: {

        setAdmins: (state,action) => {
            console.log(state);
            console.log(action);

            state.value = {...state.value,...action.payload}
        },
        // decrement: (state) => {
        //     state.value -= 1
        // },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
export const { setAdmins } = adminsSlice.actions

export default adminsSlice.reducer