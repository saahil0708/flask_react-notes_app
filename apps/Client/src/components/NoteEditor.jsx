import React from 'react';
import { Pin, Download, MoreHorizontal, User, Plus, Type, Share2, Lightbulb, UserRound } from 'lucide-react';

const NoteEditor = ({ note, onUpdate }) => {
    if (!note) return null;

    return (
        <main className="flex-1 flex flex-col h-screen bg-bg-primary relative z-0">
            {/* Top Toolbar */}
            <header className="flex justify-between items-center px-10 py-6 border-b border-transparent">
                <div className="flex items-center gap-6 text-text-muted">
                    <Pin size={18} className="cursor-pointer hover:text-text-primary transition-colors" />
                    <Download size={18} className="cursor-pointer hover:text-text-primary transition-colors" />
                </div>
                
                <div className="flex items-center gap-6">
                    <span className="text-sm text-text-muted cursor-pointer hover:text-text-primary">Updates</span>
                    <span className="text-sm text-text-muted cursor-pointer hover:text-text-primary">Share</span>
                    <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-bg-primary flex items-center justify-center overflow-hidden"><UserRound size={16} className="text-slate-300" /></div>
                        <div className="w-8 h-8 rounded-full bg-purple-900 border-2 border-bg-primary flex items-center justify-center overflow-hidden"><UserRound size={16} className="text-purple-400" /></div>
                        <div className="w-8 h-8 rounded-full bg-blue-900 border-2 border-bg-primary flex items-center justify-center overflow-hidden"><UserRound size={16} className="text-blue-400" /></div>
                    </div>
                    <MoreHorizontal size={18} className="text-text-muted cursor-pointer hover:text-text-primary" />
                </div>
            </header>
            
            <div className="flex-1 overflow-y-auto px-[15%] py-8 custom-scrollbar">
                {/* Illustration Placeholder */}
                <div className="w-full max-w-lg mx-auto h-48 bg-bg-secondary rounded-2xl mb-12 flex items-center justify-center border border-border-subtle relative overflow-hidden shadow-inner">
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIj48L3JlY3Q+CTxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIiBmaWxsPSIjMDAwIj48L2NpcmNsZT4KPC9zdmc+')]"></div>
                    <div className="w-24 h-24 bg-accent-primary/20 rounded-full flex items-center justify-center z-10 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                        <Lightbulb size={40} className="text-accent-primary" />
                    </div>
                </div>

                {/* Title Area */}
                <div className="flex gap-6 mb-6">
                    <div className="text-text-muted font-mono text-sm pt-4 w-6 shrink-0">H1</div>
                    <div className="flex-1">
                        <h1 className="text-5xl font-bold text-text-primary tracking-tight mb-4 flex items-center gap-3">
                            {note.title.replace(' 💡', '').replace(' 🌶️', '')} <span className="text-3xl">{note.title.includes('💡') ? '💡' : note.title.includes('🌶️') ? '🌶️' : ''}</span>
                        </h1>
                        <div className="flex gap-4 text-accent-primary font-medium text-sm mb-8">
                            <span>#ideas</span>
                            <span>#to-do's</span>
                            <span>#morning</span>
                        </div>
                        
                        <p className="text-lg text-text-secondary/70 leading-relaxed italic mb-12">
                            {note.content}
                        </p>
                    </div>
                </div>

                {/* Subheading Area */}
                <div className="flex gap-6">
                    <div className="text-text-muted font-mono text-sm pt-1 w-6 shrink-0">H3</div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-text-primary mb-6">Morning</h3>
                        
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 max-w-xl">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-4 h-4 rounded-full border-2 border-accent-primary flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-accent-primary"></div>
                                </div>
                                <span className="text-text-primary group-hover:text-white transition-colors">setup meeting with Rachel</span>
                            </label>
                            
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-4 h-4 rounded-full border-2 border-border-subtle flex items-center justify-center group-hover:border-accent-primary transition-colors">
                                </div>
                                <span className="text-text-primary group-hover:text-white transition-colors">check to-dos</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-4 h-4 rounded-full border-2 border-border-subtle flex items-center justify-center group-hover:border-accent-primary transition-colors">
                                </div>
                                <span className="text-text-primary group-hover:text-white transition-colors">apply at Braintree</span>
                            </label>
                            
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-4 h-4 rounded-full border-2 border-accent-primary flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-accent-primary"></div>
                                </div>
                                <span className="text-text-primary group-hover:text-white transition-colors">check reservations</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Buttons */}
            <div className="absolute bottom-10 right-10 flex gap-4">
                <button className="w-12 h-12 rounded-full bg-bg-secondary border border-border-subtle shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex items-center justify-center text-text-primary hover:border-accent-primary hover:text-accent-primary transition-all hover:scale-105">
                    <Plus size={20} />
                </button>
                <button className="w-12 h-12 rounded-full bg-bg-secondary border border-border-subtle shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex items-center justify-center text-text-primary hover:border-accent-primary hover:text-accent-primary transition-all hover:scale-105">
                    <Type size={18} />
                </button>
            </div>
        </main>
    );
};

export default NoteEditor;
