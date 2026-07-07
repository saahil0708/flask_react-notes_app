import React, { useState, useRef, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import Skeleton from '@mui/material/Skeleton';

const { Leaf, Copy, Download, Trash2, Plus, MoreHorizontal, Edit2, Folder } = LucideIcons;

const NavItem = ({ icon: Icon, label, isActive, hasMore, onClick, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      onClick={onClick}
      className={`group relative flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${isActive ? 'bg-accent-light text-accent-primary font-medium' : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'}`}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <Icon size={18} className={`shrink-0 ${isActive ? 'text-accent-primary' : 'text-text-secondary'}`} strokeWidth={isActive ? 2.5 : 2} />
        <span className="text-sm mt-[2px] truncate">{label}</span>
      </div>
      
      {(onEdit || onDelete) && (
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity" ref={menuRef}>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }} 
            className="p-1 rounded text-text-muted hover:text-text-primary transition-colors"
          >
            <MoreHorizontal size={16} />
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-2 top-8 w-36 bg-bg-secondary border border-border-subtle rounded-xl shadow-xl overflow-hidden z-50 flex flex-col py-1">
              {onEdit && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); onEdit(); }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors w-full text-left"
                >
                  <Edit2 size={14} /> Update
                </button>
              )}
              {onDelete && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); onDelete(); }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-colors w-full text-left"
                >
                  <Trash2 size={14} /> Delete
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Navigation = ({ 
  workspaces = [], 
  isLoading = false,
  activeWorkspaceId, 
  onWorkspaceSelect, 
  onNewWorkspaceClick, 
  onEditWorkspace, 
  onDeleteWorkspace,
  user,
  onLogout 
}) => {
  return (
    <nav className="w-64 h-screen flex flex-col bg-bg-primary border-r border-border-subtle z-20 shrink-0">
      {/* Profile / Logo Area */}
      <div className="flex items-center justify-between p-6 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-bg-tertiary flex items-center justify-center border border-border-subtle shrink-0">
            <Leaf size={18} className="text-orange-400 fill-orange-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-text-primary leading-tight truncate w-32">
              Awsmd
            </span>
            <span className="text-[10px] text-text-muted truncate w-32">
              Workspace
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 custom-scrollbar flex flex-col gap-6">
        {/* Top Links */}
        <div className="flex flex-col gap-1">
          <NavItem icon={Copy} label="Templates" />
          <NavItem icon={Download} label="Import" />
          <NavItem icon={Trash2} label="Trash" />
        </div>

        {/* Workspace */}
        <div>
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 px-3">Workspace</h3>
          <div className="flex flex-col gap-1">
            {isLoading ? (
              <>
                <div className="px-3 py-2"><Skeleton variant="rounded" height={32} sx={{ bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }} /></div>
                <div className="px-3 py-2"><Skeleton variant="rounded" height={32} sx={{ bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }} /></div>
                <div className="px-3 py-2"><Skeleton variant="rounded" height={32} sx={{ bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }} /></div>
              </>
            ) : workspaces.length === 0 ? (
              <div className="px-3 py-6 mt-2 flex flex-col items-center text-center opacity-60 border border-dashed border-border-subtle rounded-xl mx-2">
                <div className="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center mb-2">
                  <Folder size={16} className="text-text-muted" />
                </div>
                <p className="text-xs text-text-muted">No workspaces yet</p>
              </div>
            ) : (
              workspaces.map(workspace => {
                const IconComponent = LucideIcons[workspace.icon] || LucideIcons.FileText;
                return (
                  <NavItem 
                    key={workspace.id}
                    icon={IconComponent} 
                    label={workspace.name} 
                    isActive={activeWorkspaceId === workspace.id} 
                    onClick={() => onWorkspaceSelect?.(workspace.id)}
                    onEdit={() => onEditWorkspace?.(workspace)}
                    onDelete={() => onDeleteWorkspace?.(workspace.id)}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="p-4 mt-auto">
        <button 
          onClick={onNewWorkspaceClick}
          className="flex items-center gap-3 px-3 py-2 text-text-primary hover:bg-bg-secondary w-full rounded-lg transition-colors font-medium border border-transparent hover:border-border-subtle"
        >
          <div className="w-5 h-5 rounded-md bg-accent-primary flex items-center justify-center text-white shrink-0">
            <Plus size={14} />
          </div>
          <span className="text-sm mt-[2px]">New Workspace</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
