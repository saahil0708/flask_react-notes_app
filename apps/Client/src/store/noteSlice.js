import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notes: [],
    activeNoteId: null,
    isLoadingNotes: false,
};

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setActiveNoteId: (state, action) => {
            state.activeNoteId = action.payload;
        },
        setIsLoadingNotes: (state, action) => {
            state.isLoadingNotes = action.payload;
        },
        addNote: (state, action) => {
            state.notes.unshift(action.payload);
        },
        updateNoteLocally: (state, action) => {
            const index = state.notes.findIndex(n => n.id === action.payload.id);
            if (index !== -1) {
                state.notes[index] = action.payload;
            }
        },
        removeNotesLocally: (state, action) => {
            // action.payload is an array of note IDs to remove
            state.notes = state.notes.filter(n => !action.payload.includes(n.id));
        }
    }
});

export const { 
    setNotes, 
    setActiveNoteId, 
    setIsLoadingNotes, 
    addNote, 
    updateNoteLocally,
    removeNotesLocally 
} = noteSlice.actions;

export default noteSlice.reducer;
