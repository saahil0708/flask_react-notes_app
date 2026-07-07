import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navigation from './components/Navigation';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import NewPageModal from './components/NewPageModal';
import ConfirmModal from './components/ConfirmModal';
import AuthPage from './pages/AuthPage';
import ProfileMenu from './components/ProfileMenu';
import { authApi, workspaceApi, notesApi } from './services/api';
import { useToast } from './context/ToastContext';
import CircularProgress from '@mui/material/CircularProgress';

// Redux Actions
import { setUser, setIsCheckingAuth, logoutUser } from './store/authSlice';
import { setWorkspaces, setActiveWorkspaceId, setIsLoadingWorkspaces, addWorkspace, removeWorkspace } from './store/workspaceSlice';
import { setNotes, setActiveNoteId, setIsLoadingNotes, addNote, updateNoteLocally, removeNotesLocally } from './store/noteSlice';

function App() {
    const dispatch = useDispatch();
    const { showToast } = useToast();

    // Redux State Selectors
    const { user, isCheckingAuth } = useSelector(state => state.auth);
    const { workspaces, activeWorkspaceId, isLoadingWorkspaces } = useSelector(state => state.workspaces);
    const { notes, activeNoteId, isLoadingNotes } = useSelector(state => state.notes);

    // Local UI State
    const [isNewWorkspaceModalOpen, setIsNewWorkspaceModalOpen] = useState(false);
    const [workspaceToEdit, setWorkspaceToEdit] = useState(null);
    const [workspaceToDelete, setWorkspaceToDelete] = useState(null);
    const [notesToDelete, setNotesToDelete] = useState([]); // Array of note IDs
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    
    // Check auth on load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await authApi.check();
                dispatch(setUser(res.user || true));
            } catch (error) {
                dispatch(setUser(null));
            } finally {
                dispatch(setIsCheckingAuth(false));
            }
        };
        checkAuth();
    }, [dispatch]);

    // Fetch workspaces on load
    useEffect(() => {
        if (!user) return;
        let isMounted = true;
        const fetchWorkspaces = async () => {
            dispatch(setIsLoadingWorkspaces(true));
            try {
                const res = await workspaceApi.getAll();
                if (!isMounted) return;
                dispatch(setWorkspaces(res.workspaces || []));
                
                // Set active workspace if none selected
                if (!activeWorkspaceId && res.workspaces?.length > 0) {
                    dispatch(setActiveWorkspaceId(res.workspaces[0].id));
                }
            } catch (err) {
                if (isMounted) showToast('Failed to load workspaces', 'error');
            } finally {
                if (isMounted) dispatch(setIsLoadingWorkspaces(false));
            }
        };
        fetchWorkspaces();
        return () => { isMounted = false; };
    }, [user, activeWorkspaceId, showToast, dispatch]);

    // Fetch notes when active workspace changes
    useEffect(() => {
        if (!user || !activeWorkspaceId) {
            dispatch(setNotes([]));
            return;
        }
        let isMounted = true;
        const fetchNotes = async () => {
            dispatch(setIsLoadingNotes(true));
            try {
                const res = await notesApi.getAll(activeWorkspaceId);
                if (!isMounted) return;
                dispatch(setNotes(res.notes || []));
                if (res.notes?.length > 0) {
                    dispatch(setActiveNoteId(res.notes[0].id));
                } else {
                    dispatch(setActiveNoteId(null));
                }
            } catch (err) {
                if (isMounted) showToast('Failed to load notes', 'error');
            } finally {
                if (isMounted) dispatch(setIsLoadingNotes(false));
            }
        };
        fetchNotes();
        return () => { isMounted = false; };
    }, [activeWorkspaceId, user, showToast, dispatch]);

    // Render loading state while checking session
    if (isCheckingAuth) {
        return (
            <div className="flex h-screen bg-bg-primary items-center justify-center">
                <CircularProgress style={{ color: '#F97316' }} />
            </div>
        );
    }

    // Render Auth Page if not logged in
    if (!user) {
        return <AuthPage onLoginSuccess={(userData) => dispatch(setUser(userData))} />;
    }

    const activeNote = notes.find(n => n.id === activeNoteId);
    const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId);

    const handleNoteSelect = (id) => {
        dispatch(setActiveNoteId(id));
    };

    const handleNoteUpdate = (updatedNote) => {
        // Optimistic update for local state via Redux
        dispatch(updateNoteLocally(updatedNote));
    };

    const handleNoteSave = async (savedNote) => {
        try {
            await notesApi.update(savedNote.id, {
                title: savedNote.title,
                content: savedNote.content,
                tags: savedNote.tags
            });
            showToast('Note saved successfully', 'success');
        } catch (err) {
            showToast('Failed to save note', 'error');
        }
    };

    const handleAddNote = async () => {
        if (!activeWorkspaceId) {
            showToast('Please select or create a workspace first', 'error');
            return;
        }

        try {
            const res = await notesApi.create("New Note", activeWorkspaceId, "");
            const newNote = res.note;
            dispatch(addNote(newNote));
            dispatch(setActiveNoteId(newNote.id));
            showToast('New note created', 'success');
        } catch (err) {
            showToast('Failed to create note', 'error');
        }
    };

    const handleCreateOrUpdateWorkspace = async ({ id, name, icon }) => {
        try {
            if (id) {
                // Mock update locally
                const updatedWorkspaces = workspaces.map(w => w.id === id ? { ...w, name, icon } : w);
                dispatch(setWorkspaces(updatedWorkspaces));
                showToast('Workspace updated locally', 'success');
            } else {
                const res = await workspaceApi.create(name, icon);
                const newWorkspace = res.workspace;
                dispatch(addWorkspace(newWorkspace));
                dispatch(setActiveWorkspaceId(newWorkspace.id));
                showToast('Workspace created', 'success');
            }
            setIsNewWorkspaceModalOpen(false);
            setWorkspaceToEdit(null);
        } catch (err) {
            showToast('Failed to create workspace', 'error');
        }
    };

    const handleDeleteWorkspace = async () => {
        if (!workspaceToDelete) return;
        const id = workspaceToDelete;
        const workspaceName = workspaces.find(w => w.id === id)?.name;
        
        try {
            await workspaceApi.delete(id);
            dispatch(removeWorkspace(id));
            if (activeWorkspaceId === id) {
                const newWorkspaces = workspaces.filter(w => w.id !== id);
                dispatch(setActiveWorkspaceId(newWorkspaces[0]?.id || null));
            }
            setWorkspaceToDelete(null);
            showToast(`Workspace "${workspaceName}" deleted`, 'info');
        } catch (err) {
            showToast('Failed to delete workspace', 'error');
        }
    };

    const handleConfirmDeleteNotes = async () => {
        const count = notesToDelete.length;
        try {
            await notesApi.bulkDelete(notesToDelete);
            
            dispatch(removeNotesLocally(notesToDelete));
            if (notesToDelete.includes(activeNoteId)) {
                const newNotes = notes.filter(n => !notesToDelete.includes(n.id));
                dispatch(setActiveNoteId(newNotes[0]?.id || null));
            }
            setNotesToDelete([]);
            showToast(`${count} note${count > 1 ? 's' : ''} moved to trash`, 'info');
        } catch (err) {
            showToast('Failed to delete notes', 'error');
        }
    };

    const handleLogout = async () => {
        try {
            await authApi.logout();
            dispatch(logoutUser());
            dispatch(setWorkspaces([]));
            dispatch(setNotes([]));
            dispatch(setActiveWorkspaceId(null));
            dispatch(setActiveNoteId(null));
            showToast('Logged out successfully', 'info');
        } catch (err) {
            showToast('Failed to logout', 'error');
        }
    };

    return (
        <div className="flex h-screen bg-bg-primary relative overflow-hidden">
            <ProfileMenu user={user} onLogoutClick={() => setIsLogoutModalOpen(true)} />
            
            <Navigation
                workspaces={workspaces}
                isLoading={isLoadingWorkspaces}
                activeWorkspaceId={activeWorkspaceId}
                user={user}
                onLogout={handleLogout}
                onWorkspaceSelect={(id) => dispatch(setActiveWorkspaceId(id))}
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
                isLoading={isLoadingNotes || isLoadingWorkspaces}
                activeNoteId={activeNoteId}
                workspaceName={activeWorkspace?.name || 'Notes'}
                onNoteSelect={handleNoteSelect}
                onAddNote={handleAddNote}
                onDeleteNotes={(ids) => setNotesToDelete(ids)}
            />

            <NoteEditor
                note={activeNote}
                onUpdate={handleNoteUpdate}
                onSave={handleNoteSave}
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
                message={`Are you sure you want to delete the "${workspaces.find(w => w.id === workspaceToDelete)?.name}" workspace? This action cannot be undone.`}
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
            <ConfirmModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={() => {
                    setIsLogoutModalOpen(false);
                    handleLogout();
                }}
                title="Log Out"
                message="Are you sure you want to log out of your account?"
                confirmText="Log Out"
                isDanger={true}
            />
        </div>
    );
}

export default App;
