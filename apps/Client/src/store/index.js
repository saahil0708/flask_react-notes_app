import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import workspaceReducer from './workspaceSlice';
import noteReducer from './noteSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        workspaces: workspaceReducer,
        notes: noteReducer,
    },
});
