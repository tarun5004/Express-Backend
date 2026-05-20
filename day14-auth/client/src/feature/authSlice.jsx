import { createSlice } from '@reduxjs/toolkit'

let userSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    },
});

export let {addUser} = userSlice.actions;
export default userSlice.reducer;