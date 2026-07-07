import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isCheckingAuth: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIsCheckingAuth: (state, action) => {
            state.isCheckingAuth = action.payload;
        },
        logoutUser: (state) => {
            state.user = null;
        }
    }
});

export const { setUser, setIsCheckingAuth, logoutUser } = authSlice.actions;
export default authSlice.reducer;
