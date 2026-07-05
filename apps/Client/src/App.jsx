import React, { useState } from 'react';
import Navigation from './components/Navigation';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import NewPageModal from './components/NewPageModal';
import ConfirmModal from './components/ConfirmModal';

// Dummy data for workspaces
const initialWorkspaces = [
    { id: 'w1', label: 'Notes', icon: 'FileText' },
    { id: 'w2', label: 'Tasks', icon: 'CheckSquare' },
    { id: 'w3', label: 'Announcements', icon: 'Megaphone' },
    { id: 'w4', label: 'Music', icon: 'Music' },
    { id: 'w5', label: 'Questions', icon: 'HelpCircle' },
    { id: 'w6', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'w7', label: 'Development', icon: 'Code' },
    { id: 'w8', label: 'Swift', icon: 'Code' }
];

// Dummy data for initial state
const initialNotes = [
    {
        id: 1,
        title: 'Grocery list / Stores',
        content: 'Bread Flour - Instant Dry Yeast- Extra-virgin Olive Oil, 5 banana shallots - 4 garlic cloves.',
        time: '1 min',
        location: 'San Francisco, CA',
        tags: ['shopping', 'food']
    },
    {
        id: 2,
        title: 'Books to read 🌶️',
        content: 'Cheers to the books we\'ve been meaning to read all these years and should probably start at some point.',
        time: '5 min',
        location: '',
        tags: ['ideas', 'to-dos', 'morning']
    },
    {
        id: 3,
        title: 'Write down your ideas 💡',
        content: '"Sometimes, on Mondays, when servers at A16 are announcing the specials, you can almost feel the excitement...',
        time: '1 day',
        location: 'San Francisco, CA',
        tags: ['ideas', 'work']
    },
    {
        id: 4,
        title: 'Curried Carrot Soup',
        content: '#recipes/savory #recipes/soups #recipessavorymains Curried Carrot and Fennel Soup with Turmeric and Ora...',
        time: '2 days',
        location: '',
        tags: ['recipes', 'savory', 'soups']
    }
];

function App() {
    const [notes, setNotes] = useState(initialNotes);
    const [activeNoteId, setActiveNoteId] = useState(initialNotes[0]?.id || null);

    // Workspace state
    const [workspaces, setWorkspaces] = useState(initialWorkspaces);
    const [activeWorkspaceId, setActiveWorkspaceId] = useState('w1');
    const [isNewWorkspaceModalOpen, setIsNewWorkspaceModalOpen] = useState(false);

    const [workspaceToEdit, setWorkspaceToEdit] = useState(null);
    const [workspaceToDelete, setWorkspaceToDelete] = useState(null);
    const [notesToDelete, setNotesToDelete] = useState([]); // Array of note IDs

    const activeNote = notes.find(n => n.id === activeNoteId);
    const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId);

    const handleNoteSelect = (id) => {
        setActiveNoteId(id);
    };

    const handleNoteUpdate = (updatedNote) => {
        setNotes(notes.map(note =>
            note.id === updatedNote.id ? updatedNote : note
        ));
    };

    const handleAddNote = () => {
        const newNote = {
            id: Date.now(),
            title: '',
            content: '',
            time: 'Just now',
            location: '',
            tags: []
        };
        setNotes([newNote, ...notes]);
        setActiveNoteId(newNote.id);
    };

    const handleCreateOrUpdateWorkspace = ({ id, name, icon }) => {
        if (id) {
            setWorkspaces(workspaces.map(w => w.id === id ? { ...w, label: name, icon } : w));
        } else {
            const newWorkspace = {
                id: `w${Date.now()}`,
                label: name,
                icon: icon
            };
            setWorkspaces([...workspaces, newWorkspace]);
            setActiveWorkspaceId(newWorkspace.id);
        }
        setIsNewWorkspaceModalOpen(false);
        setWorkspaceToEdit(null);
    };

    const handleDeleteWorkspace = () => {
        if (!workspaceToDelete) return;
        const id = workspaceToDelete;
        const newWorkspaces = workspaces.filter(w => w.id !== id);
        setWorkspaces(newWorkspaces);
        if (activeWorkspaceId === id) {
            setActiveWorkspaceId(newWorkspaces[0]?.id || null);
        }
        setWorkspaceToDelete(null);
    };

    const handleConfirmDeleteNotes = () => {
        const newNotes = notes.filter(n => !notesToDelete.includes(n.id));
        setNotes(newNotes);
        if (notesToDelete.includes(activeNoteId)) {
            setActiveNoteId(newNotes[0]?.id || null);
        }
        setNotesToDelete([]);
    };

    return (
        <div className="flex h-screen bg-bg-primary relative overflow-hidden">
            <Navigation
                workspaces={workspaces}
                activeWorkspaceId={activeWorkspaceId}
                onWorkspaceSelect={setActiveWorkspaceId}
                onNewWorkspaceClick={() => {
                    setWorkspaceToEdit(null);
                    setIsNewWorkspaceModalOpen(true);
                }}
                onEditWorkspace={(workspace) => {
                    setWorkspaceToEdit(workspace);
                    setIsNewWorkspaceModalOpen(true);
                }}
                onDeleteWorkspace={(id) => setWorkspaceToDelete(id)}
            />

            <NoteList
                notes={notes}
                activeNoteId={activeNoteId}
                workspaceName={activeWorkspace?.label || 'Notes'}
                onNoteSelect={handleNoteSelect}
                onAddNote={handleAddNote}
                onDeleteNotes={(ids) => setNotesToDelete(ids)}
            />

            <NoteEditor
                note={activeNote}
                onUpdate={handleNoteUpdate}
            />

            <NewPageModal
                isOpen={isNewWorkspaceModalOpen}
                onClose={() => {
                    setIsNewWorkspaceModalOpen(false);
                    setWorkspaceToEdit(null);
                }}
                onCreate={handleCreateOrUpdateWorkspace}
                initialData={workspaceToEdit}
            />

            <ConfirmModal
                isOpen={!!workspaceToDelete}
                onClose={() => setWorkspaceToDelete(null)}
                onConfirm={handleDeleteWorkspace}
                title="Delete Workspace"
                message={`Are you sure you want to delete the "${workspaces.find(w => w.id === workspaceToDelete)?.label}" workspace? This action cannot be undone.`}
                confirmText="Delete Workspace"
                cancelText="Keep it"
                isDestructive={true}
            />

            <ConfirmModal
                isOpen={notesToDelete.length > 0}
                onClose={() => setNotesToDelete([])}
                onConfirm={handleConfirmDeleteNotes}
                title={notesToDelete.length === 1 ? "Delete Note" : "Delete Notes"}
                message={`Are you sure you want to delete ${notesToDelete.length === 1 ? 'this note' : `these ${notesToDelete.length} notes`}? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                isDestructive={true}
            />
        </div>
    );
}

export default App;