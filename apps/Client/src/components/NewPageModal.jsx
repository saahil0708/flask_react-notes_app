import React, { useState, useEffect } from 'react';
import { 
  X, Search, FileText, Code, CheckSquare, Image, Video, Music, Link, 
  MapPin, Heart, Star, Cloud, Sun, Moon, Database, Folder, Home, Settings,
  User, Bell, Book, Calendar, Camera, Coffee, Globe, Mail, MessageSquare,
  Paperclip, PenTool, Phone, Shield, Target, Trash, Zap, Briefcase
} from 'lucide-react';

const AVAILABLE_ICONS = [
  { name: 'FileText', icon: FileText, tags: ['document', 'text', 'note'] },
  { name: 'Code', icon: Code, tags: ['developer', 'script'] },
  { name: 'CheckSquare', icon: CheckSquare, tags: ['todo', 'task'] },
  { name: 'Image', icon: Image, tags: ['picture', 'photo'] },
  { name: 'Video', icon: Video, tags: ['movie', 'clip'] },
  { name: 'Music', icon: Music, tags: ['audio', 'song'] },
  { name: 'Link', icon: Link, tags: ['url', 'website'] },
  { name: 'MapPin', icon: MapPin, tags: ['location', 'place'] },
  { name: 'Heart', icon: Heart, tags: ['love', 'favorite'] },
  { name: 'Star', icon: Star, tags: ['favorite', 'rate'] },
  { name: 'Cloud', icon: Cloud, tags: ['weather', 'online'] },
  { name: 'Sun', icon: Sun, tags: ['weather', 'day'] },
  { name: 'Moon', icon: Moon, tags: ['weather', 'night'] },
  { name: 'Database', icon: Database, tags: ['storage', 'data'] },
  { name: 'Folder', icon: Folder, tags: ['directory', 'file'] },
  { name: 'Home', icon: Home, tags: ['house', 'start'] },
  { name: 'Settings', icon: Settings, tags: ['gear', 'options'] },
  { name: 'User', icon: User, tags: ['person', 'profile'] },
  { name: 'Bell', icon: Bell, tags: ['notification', 'alert'] },
  { name: 'Book', icon: Book, tags: ['read', 'library'] },
  { name: 'Calendar', icon: Calendar, tags: ['date', 'schedule'] },
  { name: 'Camera', icon: Camera, tags: ['photo', 'picture'] },
  { name: 'Coffee', icon: Coffee, tags: ['drink', 'break'] },
  { name: 'Globe', icon: Globe, tags: ['world', 'earth', 'internet'] },
  { name: 'Mail', icon: Mail, tags: ['email', 'message'] },
  { name: 'MessageSquare', icon: MessageSquare, tags: ['chat', 'comment'] },
  { name: 'Paperclip', icon: Paperclip, tags: ['attachment', 'file'] },
  { name: 'PenTool', icon: PenTool, tags: ['draw', 'write'] },
  { name: 'Phone', icon: Phone, tags: ['call', 'contact'] },
  { name: 'Shield', icon: Shield, tags: ['security', 'protect'] },
  { name: 'Target', icon: Target, tags: ['goal', 'aim'] },
  { name: 'Trash', icon: Trash, tags: ['delete', 'remove'] },
  { name: 'Zap', icon: Zap, tags: ['flash', 'energy', 'fast'] },
  { name: 'Briefcase', icon: Briefcase, tags: ['work', 'job'] }
];

const NewPageModal = ({ isOpen, onClose, onCreate, initialData }) => {
  const [name, setName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('FileText');

  useEffect(() => {
    if (isOpen) {
        if (initialData) {
            setName(initialData.label);
            setSelectedIcon(initialData.icon);
        } else {
            setName('');
            setSelectedIcon('FileText');
        }
        setSearchQuery('');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const filteredIcons = AVAILABLE_ICONS.filter(icon => 
    icon.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    icon.tags.some(tag => tag.includes(searchQuery.toLowerCase()))
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    onCreate({
      id: initialData?.id,
      name: name.trim(),
      icon: selectedIcon
    });
    
    // Reset state for next open
    setName('');
    setSearchQuery('');
    setSelectedIcon('FileText');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-bg-secondary border border-border-subtle rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-subtle">
          <h2 className="text-xl font-bold text-text-primary">{initialData ? 'Update Workspace' : 'Create New Workspace'}</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-tertiary transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
            
            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="page-name" className="text-sm font-medium text-text-secondary">Workspace Name</label>
              <input
                id="page-name"
                type="text"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Engineering Docs"
                className="w-full bg-bg-primary border border-border-subtle py-2.5 px-4 rounded-lg text-text-primary placeholder:text-text-muted outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all"
              />
            </div>

            {/* Icon Picker */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-secondary">Choose Icon</label>
              </div>
              
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search icons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-bg-primary border border-border-subtle py-2 pl-9 pr-4 rounded-lg text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all"
                />
              </div>

              <div className="grid grid-cols-6 gap-2 mt-2 p-2 bg-bg-primary rounded-xl border border-border-subtle overflow-y-auto max-h-48 custom-scrollbar">
                {filteredIcons.length > 0 ? (
                  filteredIcons.map(({ name: iconName, icon: IconComponent }) => {
                    const isSelected = selectedIcon === iconName;
                    return (
                      <button
                        key={iconName}
                        type="button"
                        onClick={() => setSelectedIcon(iconName)}
                        title={iconName}
                        className={`aspect-square rounded-lg flex items-center justify-center transition-all ${
                          isSelected 
                            ? 'bg-accent-primary text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]' 
                            : 'text-text-muted hover:bg-bg-secondary hover:text-text-primary'
                        }`}
                      >
                        <IconComponent size={20} strokeWidth={isSelected ? 2.5 : 2} />
                      </button>
                    );
                  })
                ) : (
                  <div className="col-span-6 py-8 text-center text-sm text-text-muted">
                    No icons found for "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 pt-4 border-t border-border-subtle flex justify-end gap-3 bg-bg-secondary mt-auto shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg font-medium text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-5 py-2 rounded-lg font-medium bg-accent-primary text-white hover:bg-accent-light transition-colors shadow-lg shadow-accent-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent-primary"
            >
              {initialData ? 'Update Workspace' : 'Create Workspace'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default NewPageModal;
