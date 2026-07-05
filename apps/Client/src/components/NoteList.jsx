import React from 'react';
import { Search } from 'lucide-react';

const NoteList = ({ notes, activeNoteId, onNoteSelect }) => {
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
        <h2 className="text-3xl font-bold mb-4 text-text-primary tracking-tight">Notes</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto px-6 pb-8 flex flex-col gap-4 custom-scrollbar">
        {notes.map(note => {
          const isActive = activeNoteId === note.id;
          return (
            <div 
              key={note.id} 
              className={`p-5 shrink-0 rounded-2xl cursor-pointer transition-all border relative overflow-hidden group shadow-sm hover:shadow-md ${
                isActive 
                  ? 'bg-accent-primary text-white border-accent-primary shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
                  : 'bg-bg-primary border-border-subtle hover:border-accent-primary/50 hover:bg-bg-tertiary/50'
              }`}
              onClick={() => onNoteSelect(note.id)}
            >
              {/* Dot indicator */}
              <div className="absolute top-5 right-5 w-3 h-3 rounded-full border-2 border-bg-primary flex items-center justify-center">
                <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-accent-primary'}`}></div>
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
        })}
      </div>
    </aside>
  );
};

export default NoteList;
