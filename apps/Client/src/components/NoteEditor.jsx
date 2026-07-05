import React, { useState } from 'react';
import { Pin, Download, MoreHorizontal, User, Plus, Type, Share2, Lightbulb, UserRound, Settings, Save, Check, X } from 'lucide-react';

const NoteEditor = ({ note, onUpdate }) => {
    const [newTag, setNewTag] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    if (!note) return null;

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 2000); // Simulate network request delay
    };

    const handleAddTagSubmit = () => {
        if (!newTag.trim()) return;
        
        // Split by comma, trim whitespace, remove empty strings
        const splitTags = newTag.split(',').map(t => t.trim()).filter(Boolean);
        const currentTags = note.tags || [];
        
        // Only keep unique tags that aren't already present
        const uniqueNewTags = splitTags.filter(t => !currentTags.includes(t));
        
        if (uniqueNewTags.length > 0) {
            onUpdate({ ...note, tags: [...currentTags, ...uniqueNewTags] });
        }
        setNewTag('');
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTagSubmit();
        }
    };
    
    const handleRemoveTag = (tagToRemove) => {
        const tags = note.tags || [];
        onUpdate({ ...note, tags: tags.filter(t => t !== tagToRemove) });
    };

    return (
        <main className="flex-1 flex flex-col h-screen bg-bg-primary relative z-0">
            {/* Top Toolbar */}
            <header className="flex justify-between items-center px-10 py-6 border-b border-transparent">
                <div className="flex items-center gap-6 text-text-muted">
                    <Pin size={18} className="cursor-pointer hover:text-text-primary transition-colors" />
                    <Download size={18} className="cursor-pointer hover:text-text-primary transition-colors" />
                </div>
                
                <div className="flex items-center gap-6">

                    <Settings size={18} className="text-text-muted cursor-pointer hover:text-text-primary transition-colors" />
                    <div className="w-8 h-8 rounded-full bg-bg-tertiary border border-border-subtle flex items-center justify-center overflow-hidden cursor-pointer hover:border-accent-primary transition-all shadow-sm">
                        <User size={16} className="text-text-primary" />
                    </div>
                </div>
            </header>
            
            <div className="flex-1 overflow-y-auto px-[15%] py-8 custom-scrollbar">


                {/* Title Area */}
                <div className="mb-6 flex flex-col flex-1">
                    <input
                        type="text"
                        value={note.title}
                        onChange={(e) => onUpdate({ ...note, title: e.target.value })}
                        placeholder="Untitled Note"
                        className="text-5xl font-bold text-text-primary tracking-tight mb-4 bg-transparent outline-none placeholder:text-text-muted w-full"
                    />
                    <div className="flex flex-wrap items-center gap-2 mb-8">
                        {(note.tags || []).map(tag => (
                            <span key={tag} className="flex items-center gap-1 text-accent-primary font-medium text-sm bg-accent-primary/10 px-2 py-1 rounded-md">
                                #{tag}
                                <button onClick={() => handleRemoveTag(tag)} className="hover:text-white hover:bg-accent-primary rounded-full p-0.5 transition-colors">
                                    <X size={12} />
                                </button>
                            </span>
                        ))}
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyDown={handleAddTag}
                                placeholder="Add tags (comma separated)..."
                                className="bg-transparent border border-dashed border-border-subtle rounded-md px-3 py-1 text-sm text-text-primary outline-none focus:border-accent-primary placeholder:text-text-muted/70 w-64 transition-all"
                            />
                            <button 
                                onClick={handleAddTagSubmit}
                                disabled={!newTag.trim()}
                                className="px-4 py-1 rounded-md bg-bg-tertiary border border-border-subtle text-text-secondary hover:text-text-primary hover:border-accent-primary transition-all disabled:opacity-50 text-sm font-medium"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    
                    <textarea
                        value={note.content}
                        onChange={(e) => onUpdate({ ...note, content: e.target.value })}
                        placeholder="Start typing your note here..."
                        className="text-lg text-text-secondary/70 leading-relaxed italic mb-12 bg-transparent outline-none resize-none w-full min-h-[400px] placeholder:text-text-muted/50"
                    />
                </div>


            </div>

            {/* Floating Save Button */}
            <div className="absolute bottom-10 right-10 flex gap-4">
                <button 
                    onClick={handleSave}
                    className={`h-12 px-6 rounded-full font-bold shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all flex items-center gap-3 ${
                        isSaving 
                            ? 'bg-green-500 text-white scale-105 shadow-[0_4px_25px_rgba(34,197,94,0.4)]' 
                            : 'bg-accent-primary text-white hover:bg-accent-light hover:shadow-[0_4px_25px_rgba(249,115,22,0.4)]'
                    }`}
                >
                    {isSaving ? <Check size={18} /> : <Save size={18} />}
                    {isSaving ? 'Saved!' : 'Save Note'}
                </button>
            </div>
        </main>
    );
};

export default NoteEditor;
