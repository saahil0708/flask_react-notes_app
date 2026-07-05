import React from 'react';
import { Leaf, Copy, Download, Trash2, FileText, CheckSquare, Megaphone, Music, HelpCircle, LayoutDashboard, Code, Plus, MoreHorizontal } from 'lucide-react';

const NavItem = ({ icon: Icon, label, isActive, hasMore }) => (
  <div className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${isActive ? 'bg-accent-light text-accent-primary font-medium' : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'}`}>
    <div className="flex items-center gap-3">
      <Icon size={18} className={isActive ? 'text-accent-primary' : 'text-text-secondary'} strokeWidth={isActive ? 2.5 : 2} />
      <span className="text-sm mt-[2px]">{label}</span>
    </div>
    {hasMore && <MoreHorizontal size={16} className="text-text-muted" />}
  </div>
);

const Navigation = () => {
  return (
    <nav className="w-64 h-screen flex flex-col bg-bg-primary border-r border-border-subtle z-20 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 mb-2">
        <div className="w-8 h-8 rounded-lg bg-bg-tertiary flex items-center justify-center border border-border-subtle shrink-0">
          <Leaf size={18} className="text-orange-400 fill-orange-400" />
        </div>
        <span className="font-bold text-lg text-text-primary mt-[2px]">Awsmd</span>
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
            <NavItem icon={FileText} label="Notes" isActive={true} hasMore={true} />
            <NavItem icon={CheckSquare} label="Tasks" />
            <NavItem icon={Megaphone} label="Announcements" />
            <NavItem icon={Music} label="Music" />
            <NavItem icon={HelpCircle} label="Questions" />
            <NavItem icon={LayoutDashboard} label="Dashboard" />
            <NavItem icon={Code} label="Development" />
            <NavItem icon={Code} label="Swift" />
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="p-4 mt-auto">
        <button className="flex items-center gap-3 px-3 py-2 text-text-primary hover:bg-bg-secondary w-full rounded-lg transition-colors font-medium border border-transparent hover:border-border-subtle">
          <div className="w-5 h-5 rounded-md bg-accent-primary flex items-center justify-center text-white shrink-0">
            <Plus size={14} />
          </div>
          <span className="text-sm mt-[2px]">New Page</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
