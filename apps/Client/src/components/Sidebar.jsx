import React from 'react';

const Sidebar = ({ notes, activeNoteId, onNoteSelect }) => {
    return (
        <aside className="sidebar glass-panel">
            <div className="sidebar-header">
                <h1 className="logo">
                    <span className="logo-accent">_</span>Notes
                </h1>
                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="Search notes..." 
                        className="search-input"
                    />
                </div>
            </div>
            
            <div className="notes-list">
                {notes.map(note => (
                    <div 
                        key={note.id} 
                        className={`note-item ${activeNoteId === note.id ? 'active' : ''}`}
                        onClick={() => onNoteSelect(note.id)}
                    >
                        <h3 className="note-title">{note.title || 'Untitled Note'}</h3>
                        <p className="note-preview">
                            {note.content.substring(0, 50) || 'No additional text'}...
                        </p>
                        <span className="note-date">{note.date}</span>
                    </div>
                ))}
            </div>
            
            <button className="new-note-btn">
                + New Note
            </button>
        </aside>
    );
};

export default Sidebar;
