import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    workspaces: [],
    activeWorkspaceId: null,
    isLoadingWorkspaces: false,
};

const workspaceSlice = createSlice({
    name: 'workspaces',
    initialState,
    reducers: {
        setWorkspaces: (state, action) => {
            state.workspaces = action.payload;
        },
        setActiveWorkspaceId: (state, action) => {
            state.activeWorkspaceId = action.payload;
        },
        setIsLoadingWorkspaces: (state, action) => {
            state.isLoadingWorkspaces = action.payload;
        },
        addWorkspace: (state, action) => {
            state.workspaces.push(action.payload);
        },
        removeWorkspace: (state, action) => {
            state.workspaces = state.workspaces.filter(w => w.id !== action.payload);
        }
    }
});

export const { 
    setWorkspaces, 
    setActiveWorkspaceId, 
    setIsLoadingWorkspaces, 
    addWorkspace, 
    removeWorkspace 
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
