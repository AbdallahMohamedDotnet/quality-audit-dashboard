import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { useAudit } from '../../context/AuditContext';

export interface SignatureCanvasHandle {
  clear: () => void;
  isEmpty: () => boolean;
  toDataURL: () => string;
}

interface SignatureCanvasProps {
  onSignedChange?: (hasSigned: boolean) => void;
}

export const SignatureCanvas = forwardRef<SignatureCanvasHandle, SignatureCanvasProps>(
  ({ onSignedChange }, ref) => {
    const { isAr, isDark } = useAudit();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSigned, setHasSigned] = useState(false);

    // Setup canvas size based on container with high-DPI scaling
    const setupCanvasResolution = useCallback(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = rect.width;
      const height = 140;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }, []);

    useEffect(() => {
      setupCanvasResolution();
      const handleResize = () => {
        setupCanvasResolution();
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [setupCanvasResolution]);

    useImperativeHandle(ref, () => ({
      clear: () => {
        handleClear();
      },
      isEmpty: () => !hasSigned,
      toDataURL: () => {
        return canvasRef.current ? canvasRef.current.toDataURL('image/png') : '';
      },
    }));

    const handleClear = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        const dpr = window.devicePixelRatio || 1;
        ctx.scale(dpr, dpr);
      }
      setHasSigned(false);
      onSignedChange?.(false);
    };

    const getCoordinates = (
      e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
    ) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();

      if ('touches' in e) {
        const touch = e.touches[0];
        return {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        };
      } else {
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
    };

    const startDrawing = (
      e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
    ) => {
      e.preventDefault();
      setIsDrawing(true);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { x, y } = getCoordinates(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const draw = (
      e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
    ) => {
      if (!isDrawing) return;
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { x, y } = getCoordinates(e);
      ctx.lineTo(x, y);
      ctx.strokeStyle = isDark ? '#10b981' : '#059669';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      if (!hasSigned) {
        setHasSigned(true);
        onSignedChange?.(true);
      }
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    return (
      <div className="space-y-2 w-full">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <i className="fa-solid fa-signature text-emerald-500"></i>
            {isAr ? 'التوقيع الرقمي للمدقق المعتمد' : 'Certified Digital Signature'}
            <span className="text-rose-500">*</span>
          </label>
          <button
            type="button"
            onClick={handleClear}
            className="text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
          >
            <i className="fa-solid fa-rotate-left"></i>
            {isAr ? 'مسح وإعادة التوقيع' : 'Clear & Resign'}
          </button>
        </div>

        <div
          ref={containerRef}
          className="relative w-full border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950/60 transition-colors h-[140px]"
        >
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full cursor-crosshair touch-none block"
          />

          {!hasSigned && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 dark:text-slate-600 text-xs font-bold gap-2">
              <i className="fa-solid fa-pen-nib text-sm"></i>
              {isAr ? 'وقّع هنا باستخدام الماوس أو اللمس' : 'Sign here using mouse or touch'}
            </div>
          )}
        </div>
      </div>
    );
  }
);
