import { createSlice } from '@reduxjs/toolkit'

export const userAdminsSlace = createSlice({
    name: 'userAdmins',
    initialState: {
        value:[  {    id:1,
            name: 'kirill',
            password: 'kirill',
        },
            {    id:2,
                name: 'marat',
                password: 'marat',
            },
            {    id:3,
                name: 'admin',
                password: 'admin',
            },],
    },

    reducers: {

        setNewAdmins: (state,action) => {

            state.value = [...state.value,...action.payload]
        },

    },
})

// Action creators are generated for each case reducer function
export const { setNewAdmins } = userAdminsSlace.actions

export default userAdminsSlace.reducer