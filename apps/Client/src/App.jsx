import React, { useState } from 'react';
import Navigation from './components/Navigation';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';

// Dummy data for initial state
const initialNotes = [
    {
        id: 1,
        title: 'Grocery list / Stores',
        content: 'Bread Flour - Instant Dry Yeast- Extra-virgin Olive Oil, 5 banana shallots - 4 garlic cloves.',
        time: '1 min',
        location: 'San Francisco, CA'
    },
    {
        id: 2,
        title: 'Books to read 🌶️',
        content: 'Cheers to the books we\'ve been meaning to read all these years and should probably start at some point.',
        time: '5 min',
        location: ''
    },
    {
        id: 3,
        title: 'Write down your ideas 💡',
        content: '"Sometimes, on Mondays, when servers at A16 are announcing the specials, you can almost feel the excitement...',
        time: '1 day',
        location: 'San Francisco, CA'
    },
    {
        id: 4,
        title: 'Curried Carrot Soup',
        content: '#recipes/savory #recipes/soups #recipessavorymains Curried Carrot and Fennel Soup with Turmeric and Ora...',
        time: '2 days',
        location: ''
    }
];

function App() {
    const [notes, setNotes] = useState(initialNotes);
    const [activeNoteId, setActiveNoteId] = useState(notes[2].id); // Start with 'Write down your ideas' active

    const activeNote = notes.find(n => n.id === activeNoteId);

    const handleNoteSelect = (id) => {
        setActiveNoteId(id);
    };

    const handleNoteUpdate = (updatedNote) => {
        setNotes(notes.map(note => 
            note.id === updatedNote.id ? updatedNote : note
        ));
    };

    return (
        <div className="flex h-screen bg-bg-primary relative overflow-hidden">
            <Navigation />
            
            <NoteList 
                notes={notes} 
                activeNoteId={activeNoteId} 
                onNoteSelect={handleNoteSelect} 
            />
            
            <NoteEditor 
                note={activeNote} 
                onUpdate={handleNoteUpdate} 
            />
        </div>
    );
}

export default App;