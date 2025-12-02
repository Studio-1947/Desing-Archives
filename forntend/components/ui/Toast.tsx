'use client';

import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-500" />,
        error: <AlertCircle className="w-5 h-5 text-red-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />,
    };

    const styles = {
        success: 'border-green-200 bg-green-50',
        error: 'border-red-200 bg-red-50',
        info: 'border-blue-200 bg-blue-50',
    };

    return (
        <div className={`flex items-center gap-3 p-4 border-2 shadow-lg animate-slide-up min-w-[300px] ${styles[type]} z-50`}>
            {icons[type]}
            <p className="flex-1 text-sm font-medium text-gray-900">{message}</p>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
