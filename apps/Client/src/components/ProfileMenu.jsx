import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings } from 'lucide-react';

const ProfileMenu = ({ user, onLogoutClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!user) return null;

    return (
        <div className="absolute top-6 right-10 z-50" ref={menuRef}>
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-bg-tertiary border border-border-subtle flex items-center justify-center overflow-hidden cursor-pointer hover:border-accent-primary transition-all shadow-sm"
            >
                <img 
                    src="https://media.tenor.com/g8zxsUq46NMAAAAC/cyberpunk-lucy.gif" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                />
            </div>

            {isOpen && (
                <div className="absolute right-0 top-12 w-56 bg-bg-secondary border border-border-subtle rounded-xl shadow-xl overflow-hidden z-50 flex flex-col">
                    <div className="px-4 py-3 border-b border-border-subtle">
                        <p className="font-bold text-sm text-text-primary truncate">{user.user_name}</p>
                        <p className="text-xs text-text-muted truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                        <button className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary w-full text-left transition-colors">
                            <Settings size={16} className="shrink-0" />
                            <span className="mt-[2px]">Account Settings</span>
                        </button>
                        <button 
                            onClick={() => {
                                setIsOpen(false);
                                onLogoutClick();
                            }}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-500 hover:bg-red-500/10 w-full text-left transition-colors"
                        >
                            <LogOut size={16} className="shrink-0" />
                            <span className="mt-[2px]">Log Out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
