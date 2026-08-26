'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudit } from '../../context/AuditContext';
import { RealtimeCameraModal } from './RealtimeCameraModal';

interface PhotoUploaderProps {
  photo: string | null;
  onUpload: (photoData: string | File) => void;
  onRemove: () => void;
  standardTitle?: string;
  standardCode?: string;
  onPreview?: (photoUrl: string) => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  photo,
  onUpload,
  onRemove,
  standardTitle,
  standardCode,
  onPreview,
}) => {
  const { isAr } = useAudit();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
    e.target.value = '';
  };

  const handleCameraCapture = (dataUrl: string) => {
    onUpload(dataUrl);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Hidden file input for fallback/secondary upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Real-time Camera Modal */}
      <RealtimeCameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
        standardTitle={standardTitle}
        standardCode={standardCode}
      />

      {photo ? (
        /* State when photo is attached */
        <div className="flex items-center gap-2">
          {/* Thumbnail with zoom trigger */}
          <div
            onClick={() => onPreview?.(photo)}
            className="relative group w-11 h-11 rounded-xl overflow-hidden border-2 border-emerald-500/60 shadow-sm cursor-pointer shrink-0 bg-slate-900"
            title={isAr ? 'اضغط لتكبير الصورة' : 'Click to zoom photo'}
          >
            <img src={photo} alt="Audit Evidence" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs">
              <i className="fa-solid fa-magnifying-glass-plus"></i>
            </div>
            {/* Verified badge */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white dark:border-slate-900"></span>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1.5">
            {/* Retake with live camera */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setIsCameraOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500 text-sky-600 dark:text-sky-400 hover:text-white dark:hover:text-white text-[11px] font-bold border border-sky-500/20 transition-all flex items-center gap-1"
              title={isAr ? 'إعادة التقاط بالكاميرا الحية' : 'Retake with live camera'}
            >
              <i className="fa-solid fa-camera"></i>
              <span className="hidden sm:inline">{isAr ? 'إعادة التقاط' : 'Retake'}</span>
            </motion.button>

            {/* Remove photo */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onRemove}
              className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white text-xs border border-rose-500/20 transition-all"
              title={isAr ? 'حذف الصورة' : 'Remove photo'}
            >
              <i className="fa-solid fa-trash"></i>
            </motion.button>
          </div>
        </div>
      ) : (
        /* State when no photo attached */
        <div className="flex items-center gap-1.5">
          {/* Primary Action: Real-Time Live Camera */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={() => setIsCameraOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-black text-sky-700 dark:text-sky-300 bg-sky-500/10 hover:bg-sky-500 hover:text-white dark:hover:text-white rounded-xl border border-sky-500/30 transition-all shadow-sm group"
          >
            <i className="fa-solid fa-camera text-sky-500 group-hover:text-white transition-colors"></i>
            <span>{isAr ? 'التقاط صورة بالكاميرا' : 'Take Live Photo'}</span>
          </motion.button>

          {/* Secondary Action: Small File Picker Fallback Icon */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-700 transition-colors shadow-sm"
            title={isAr ? 'إرفاق صورة من ذاكرة الجهاز' : 'Upload image file from device'}
          >
            <i className="fa-solid fa-folder-open"></i>
          </motion.button>
        </div>
      )}
    </div>
  );
};
