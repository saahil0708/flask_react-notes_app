import React, { useState } from 'react';
import { Search, Plus, CheckSquare, Trash2, Check } from 'lucide-react';
import Skeleton from '@mui/material/Skeleton';

const NoteList = ({ notes, isLoading = false, activeNoteId, workspaceName, onNoteSelect, onAddNote, onDeleteNotes }) => {
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    setSelectedIds([]);
  };

  const toggleSelection = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDelete = () => {
    if (selectedIds.length > 0) {
      onDeleteNotes(selectedIds);
      toggleSelectMode();
    }
  };
  return (
    <aside className="w-[400px] h-screen flex flex-col bg-bg-secondary border-r border-border-subtle z-10 shrink-0">
      <div className="p-8 pb-4">
        <div className="relative group mb-8">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted transition-colors" />
          <input 
            type="text" 
            placeholder="Search notes" 
            className="w-full bg-bg-primary border border-border-subtle py-2.5 pl-11 pr-4 rounded-full text-sm focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/10 transition-all text-text-primary placeholder:text-text-muted outline-none shadow-sm"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          {isSelectMode ? (
            <>
              <span className="text-sm font-medium text-text-primary">{selectedIds.length} selected</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleDelete}
                  disabled={selectedIds.length === 0}
                  className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                  title="Delete Selected"
                >
                  <Trash2 size={16} />
                </button>
                <button 
                  onClick={toggleSelectMode}
                  className="px-3 py-1.5 rounded-full bg-bg-tertiary border border-border-subtle text-text-secondary hover:text-text-primary transition-all text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-text-primary tracking-tight">{workspaceName}</h2>
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleSelectMode}
                  className="w-8 h-8 rounded-full bg-bg-primary border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary hover:border-accent-primary transition-all shadow-sm"
                  title="Select multiple"
                >
                  <CheckSquare size={16} />
                </button>
                <button 
                  onClick={onAddNote}
                  className="w-8 h-8 rounded-full bg-bg-primary border border-border-subtle flex items-center justify-center text-text-primary hover:text-accent-primary hover:border-accent-primary transition-all shadow-sm"
                  title="New Note"
                >
                  <Plus size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-6 pb-8 flex flex-col gap-4 custom-scrollbar">
        {isLoading ? (
          <>
            <div className="p-5 rounded-2xl bg-bg-primary border border-border-subtle overflow-hidden">
               <Skeleton variant="text" width="60%" height={24} sx={{ bgcolor: 'rgba(255,255,255,0.05)', mb: 1 }} />
               <Skeleton variant="text" width="100%" height={16} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
               <Skeleton variant="text" width="80%" height={16} sx={{ bgcolor: 'rgba(255,255,255,0.05)', mb: 2 }} />
               <div className="flex justify-between">
                   <Skeleton variant="text" width="20%" height={14} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                   <Skeleton variant="text" width="30%" height={14} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
               </div>
            </div>
            <div className="p-5 rounded-2xl bg-bg-primary border border-border-subtle overflow-hidden">
               <Skeleton variant="text" width="70%" height={24} sx={{ bgcolor: 'rgba(255,255,255,0.05)', mb: 1 }} />
               <Skeleton variant="text" width="95%" height={16} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
               <Skeleton variant="text" width="60%" height={16} sx={{ bgcolor: 'rgba(255,255,255,0.05)', mb: 2 }} />
               <div className="flex justify-between">
                   <Skeleton variant="text" width="20%" height={14} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                   <Skeleton variant="text" width="30%" height={14} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
               </div>
            </div>
          </>
        ) : notes.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 opacity-60">
             <div className="w-16 h-16 rounded-full bg-bg-tertiary border border-border-subtle flex items-center justify-center mb-4 shadow-sm">
                 <Search size={24} className="text-text-muted" />
             </div>
             <p className="text-text-primary font-medium mb-1 tracking-tight">No notes found</p>
             <p className="text-sm text-text-muted">Create a new note to get started.</p>
          </div>
        ) : (
          notes.map(note => {
            const isActive = activeNoteId === note.id && !isSelectMode;
            const isSelected = selectedIds.includes(note.id);
            return (
              <div 
                key={note.id} 
                className={`p-5 shrink-0 rounded-2xl cursor-pointer transition-all border relative overflow-hidden group shadow-sm hover:shadow-md ${
                  isSelected 
                    ? 'bg-accent-primary/20 border-accent-primary shadow-[0_0_20px_rgba(249,115,22,0.1)]'
                    : isActive 
                      ? 'bg-accent-primary text-white border-accent-primary shadow-[0_0_20px_rgba(249,115,22,0.3)]' 
                      : 'bg-bg-primary border-border-subtle hover:border-accent-primary/50 hover:bg-bg-tertiary/50'
                }`}
                onClick={() => isSelectMode ? toggleSelection(note.id) : onNoteSelect(note.id)}
              >
                {/* Dot / Checkbox indicator */}
                <div className="absolute top-5 right-5 flex items-center justify-center transition-colors">
                  {isSelectMode ? (
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-accent-primary border-accent-primary text-white' : 'border-border-subtle bg-bg-primary'}`}>
                      {isSelected && <Check size={14} />}
                    </div>
                  ) : (
                    <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${isActive ? 'border-white' : 'border-bg-primary'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-accent-primary'}`}></div>
                    </div>
                  )}
                </div>
                
                <h3 className={`text-base font-bold mb-2 pr-6 ${isActive ? 'text-white' : 'text-text-primary'}`}>
                  {note.title || 'Untitled Note'}
                </h3>
                <p className={`text-sm line-clamp-2 mb-4 leading-relaxed ${isActive ? 'text-white/80' : 'text-text-secondary'}`}>
                  {note.content.substring(0, 100) || 'No additional text'}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${isActive ? 'text-white/70' : 'text-text-muted'}`}>
                    {note.time || '1 min'}
                  </span>
                  <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-accent-primary'}`}>
                    {note.location || 'San Francisco, CA'}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default NoteList;
