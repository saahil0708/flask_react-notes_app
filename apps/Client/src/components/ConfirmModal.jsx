import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel',
  isDestructive = true
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-bg-secondary border border-border-subtle rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col transform transition-all">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            {isDestructive && <AlertTriangle size={20} className="text-red-500" />}
            <h2 className="text-lg font-bold text-text-primary">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-tertiary transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 pb-8">
          <p className="text-text-secondary text-sm leading-relaxed">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border-subtle flex justify-end gap-3 bg-bg-tertiary/50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-medium text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors text-sm"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-5 py-2 rounded-lg font-medium text-white transition-colors text-sm shadow-lg ${
              isDestructive 
                ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' 
                : 'bg-accent-primary hover:bg-accent-light shadow-accent-primary/20'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
