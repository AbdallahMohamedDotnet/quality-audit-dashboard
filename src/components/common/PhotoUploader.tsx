'use client';

import React, { useRef } from 'react';
import { useAudit } from '../../context/AuditContext';

interface PhotoUploaderProps {
  photo: string | null;
  onUpload: (file: File) => void;
  onRemove: () => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  photo,
  onUpload,
  onRemove,
}) => {
  const { isAr } = useAudit();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
    e.target.value = '';
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {photo ? (
        <div className="flex items-center gap-2">
          <div className="relative group w-12 h-12 rounded-lg overflow-hidden border border-emerald-500/50 shadow-sm">
            <img src={photo} alt="Evidence" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <button
                type="button"
                onClick={onRemove}
                className="text-white hover:text-rose-400 p-1 text-xs"
                title={isAr ? 'حذف الصورة' : 'Remove image'}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:underline"
          >
            {isAr ? 'تغيير الصورة' : 'Change Photo'}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-700 transition-colors"
        >
          <i className="fa-solid fa-camera text-sky-500"></i>
          {isAr ? 'إرفاق صورة إثبات' : 'Attach Photo Evidence'}
        </button>
      )}
    </div>
  );
};
