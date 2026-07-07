import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type, duration }]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

const ToastItem = ({ toast, onRemove }) => {
    const { id, message, type, duration } = toast;
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLeaving(true);
            setTimeout(() => onRemove(id), 300); // Wait for exit animation
        }, duration);

        return () => clearTimeout(timer);
    }, [id, duration, onRemove]);

    const handleClose = () => {
        setIsLeaving(true);
        setTimeout(() => onRemove(id), 300);
    };

    const typeConfig = {
        success: {
            icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
            borderColor: 'border-emerald-500/30',
            bgColor: 'bg-emerald-500/10',
        },
        error: {
            icon: <AlertCircle className="w-5 h-5 text-red-500" />,
            borderColor: 'border-red-500/30',
            bgColor: 'bg-red-500/10',
        },
        info: {
            icon: <Info className="w-5 h-5 text-accent-primary" />,
            borderColor: 'border-accent-primary/30',
            bgColor: 'bg-accent-primary/10',
        }
    };

    const config = typeConfig[type] || typeConfig.info;

    return (
        <div 
            className={`
                pointer-events-auto flex items-center gap-3 py-3 px-4 rounded-xl 
                bg-bg-secondary/80 backdrop-blur-xl border ${config.borderColor} shadow-xl
                transform transition-all duration-300 ease-out
                ${isLeaving ? 'opacity-0 translate-x-8 scale-95' : 'opacity-100 translate-x-0 scale-100 animate-slide-in'}
            `}
            style={{ animation: isLeaving ? 'none' : 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        >
            <style>
                {`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(20px) scale(0.95); }
                    to { opacity: 1; transform: translateX(0) scale(1); }
                }
                `}
            </style>
            
            <div className={`p-1.5 rounded-lg ${config.bgColor}`}>
                {config.icon}
            </div>
            
            <p className="text-sm font-medium text-text-primary pr-4">{message}</p>
            
            <button 
                onClick={handleClose}
                className="ml-auto text-text-muted hover:text-text-primary transition-colors focus:outline-none"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};
