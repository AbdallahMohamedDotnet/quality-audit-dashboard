'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudit } from '../../context/AuditContext';

interface RealtimeCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (photoDataUrl: string) => void;
  standardTitle?: string;
  standardCode?: string;
}

export const RealtimeCameraModal: React.FC<RealtimeCameraModalProps> = ({
  isOpen,
  onClose,
  onCapture,
  standardTitle,
  standardCode,
}) => {
  const { isAr } = useAudit();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [capturedResolution, setCapturedResolution] = useState<string>('');
  const [isFlashing, setIsFlashing] = useState(false);

  // Camera settings
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [availableDevices, setAvailableDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [hasTorch, setHasTorch] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [timerDuration, setTimerDuration] = useState<0 | 3>(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [addWatermark, setAddWatermark] = useState(true);
  const [currentTimestamp, setCurrentTimestamp] = useState('');

  // Fallback file input ref
  const fileFallbackRef = useRef<HTMLInputElement | null>(null);

  // Audio click synthesizer
  const playShutterSound = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      }
    } catch {
      // Audio playback silently skipped if not allowed
    }
  };

  // Keep live timestamp updated
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const timeStr = now.toLocaleTimeString(isAr ? 'ar-EG' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setCurrentTimestamp(`${dateStr} ${timeStr}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isAr]);

  // Stop current stream tracks
  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
  }, []);

  // List available video devices
  const enumerateVideoDevices = useCallback(async () => {
    try {
      if (!navigator.mediaDevices?.enumerateDevices) return;
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevs = devices.filter(d => d.kind === 'videoinput');
      setAvailableDevices(videoDevs);
    } catch {
      // Ignore enumeration errors
    }
  }, []);

  // Start live camera stream
  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    stopStream();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErrorMsg(
        isAr
          ? 'المتصفح لا يدعم الوصول المباشر للكاميرا عبر WebRTC. يرجى استخدام متصفح حديث مثل Chrome أو Safari أو إرفاق ملف.'
          : 'Direct camera access is not supported by your browser or environment. Please use modern Chrome/Safari or select an image file.'
      );
      setIsLoading(false);
      return;
    }

    try {
      const constraints: MediaStreamConstraints = {
        audio: false,
        video: selectedDeviceId
          ? { deviceId: { exact: selectedDeviceId }, width: { ideal: 1920 }, height: { ideal: 1080 } }
          : {
              facingMode: { ideal: facingMode },
              width: { ideal: 1920 },
              height: { ideal: 1080 },
            },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }

      // Check for torch capability
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        const capabilities = (videoTrack.getCapabilities?.() || {}) as { torch?: boolean };
        setHasTorch(Boolean(capabilities.torch));
      }

      await enumerateVideoDevices();
      setIsLoading(false);
    } catch (err: unknown) {
      const error = err as { name?: string; message?: string };
      console.warn('Camera access error:', error);
      setIsLoading(false);

      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setErrorMsg(
          isAr
            ? 'تم رفض إذن الوصول للكاميرا. يرجى السماح للمتصفح بالوصول إلى الكاميرا من إعدادات الموقع وإعادة المحاولة.'
            : 'Camera access permission was denied. Please allow camera access in your browser settings and try again.'
        );
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setErrorMsg(
          isAr
            ? 'لم يتم العثور على كاميرا متصلة بالجهاز. يمكنك إرفاق صورة من ذاكرة الجهاز كبديل.'
            : 'No connected camera was found on your device. You can select an image file instead.'
        );
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        setErrorMsg(
          isAr
            ? 'الكاميرا قيد الاستخدام بواسطة تطبيق آخر أو غير متاحة مؤقتاً. يرجى إغلاق التطبيقات الأخرى والمحاولة ثانية.'
            : 'Camera is currently in use by another application or unavailable. Please close other apps and try again.'
        );
      } else {
        setErrorMsg(
          isAr
            ? 'تعذر تشغيل الكاميرا المباشرة. يمكنك المحاولة مرة أخرى أو اختيار صورة من جهازك.'
            : 'Unable to start live camera stream. You can try again or select an image file.'
        );
      }
    }
  }, [facingMode, selectedDeviceId, stopStream, enumerateVideoDevices, isAr]);

  // Handle open / close lifecycle
  useEffect(() => {
    if (isOpen) {
      setCapturedImage(null);
      startCamera();
    } else {
      stopStream();
      setCapturedImage(null);
      setCountdown(null);
    }

    return () => {
      stopStream();
    };
  }, [isOpen, startCamera, stopStream]);

  // Toggle torch / flashlight
  const toggleTorch = async () => {
    if (!streamRef.current) return;
    const videoTrack = streamRef.current.getVideoTracks()[0];
    if (videoTrack && hasTorch) {
      try {
        const nextState = !isTorchOn;
        await (videoTrack as any).applyConstraints({
          advanced: [{ torch: nextState }],
        });
        setIsTorchOn(nextState);
      } catch (err) {
        console.warn('Could not toggle torch:', err);
      }
    }
  };

  // Flip camera (rear / front)
  const handleFlipCamera = () => {
    setSelectedDeviceId('');
    setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Perform snapshot capture
  const executeCapture = () => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) return;

    // Trigger visual flash & audio click
    setIsFlashing(true);
    playShutterSound();
    setTimeout(() => setIsFlashing(false), 250);

    const canvas = document.createElement('canvas');
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // If using front camera, mirror horizontally on capture for natural selfie preview
    if (facingMode === 'user') {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, width, height);

    // Reset transformation matrix before drawing watermarks
    if (facingMode === 'user') {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    // Optional verification stamp overlay on the image
    if (addWatermark) {
      const fontSize = Math.max(16, Math.round(width * 0.018));
      const pad = Math.round(fontSize * 0.8);
      ctx.font = `bold ${fontSize}px sans-serif`;

      // Header watermark bar
      const watermarkText = `🛡️ QA AUDIT • ${standardCode || 'STD'} • ${currentTimestamp}`;
      const textWidth = ctx.measureText(watermarkText).width;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      ctx.beginPath();
      ctx.roundRect(
        width - textWidth - pad * 2 - 20,
        height - fontSize * 2 - pad - 20,
        textWidth + pad * 2,
        fontSize * 2 + pad,
        8
      );
      ctx.fill();

      ctx.fillStyle = '#38bdf8'; // sky-400
      ctx.fillText(
        watermarkText,
        width - textWidth - pad - 20,
        height - fontSize - 20
      );
    }

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedImage(dataUrl);
    setCapturedResolution(`${width} × ${height} px`);
    stopStream();
  };

  // Shutter button click with optional countdown
  const handleShutterClick = () => {
    if (timerDuration === 0) {
      executeCapture();
    } else {
      let count = timerDuration;
      setCountdown(count);
      const timer = setInterval(() => {
        count -= 1;
        if (count <= 0) {
          clearInterval(timer);
          setCountdown(null);
          executeCapture();
        } else {
          setCountdown(count);
        }
      }, 1000);
    }
  };

  // Keyboard shortcut: Space or Enter to snap
  useEffect(() => {
    if (!isOpen || capturedImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !countdown && !isLoading && !errorMsg) {
        e.preventDefault();
        handleShutterClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, capturedImage, countdown, isLoading, errorMsg, timerDuration]);

  // Retake photo: restart live stream
  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  // Accept and save photo
  const handleConfirmPhoto = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      onClose();
    }
  };

  // Fallback file input change
  const handleFallbackFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setCapturedImage(dataUrl);
      setCapturedResolution(isAr ? 'صورة مرفوعة من الجهاز' : 'Uploaded image file');
      stopStream();
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto overscroll-y-contain">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative z-10 w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-white my-auto"
        >
          {/* Shutter Screen Flash */}
          {isFlashing && (
            <motion.div
              initial={{ opacity: 0.95 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-white z-50 pointer-events-none"
            />
          )}

          {/* Hidden File Input for fallback */}
          <input
            type="file"
            ref={fileFallbackRef}
            onChange={handleFallbackFile}
            accept="image/*"
            capture="environment"
            className="hidden"
          />

          {/* Header Bar */}
          <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 shrink-0">
                <i className="fa-solid fa-camera text-base"></i>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-sm sm:text-base text-white truncate">
                    {isAr ? '📷 التقاط صورة معاينة حية' : '📷 Real-Time Live Camera'}
                  </h3>
                  {!capturedImage && !errorMsg && !isLoading && (
                    <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                      {isAr ? 'مباشر' : 'LIVE'}
                    </span>
                  )}
                </div>
                {standardTitle && (
                  <p className="text-xs text-slate-400 truncate">
                    {standardCode && (
                      <span className="font-mono text-sky-400 font-bold mr-1 ml-1">
                        [{standardCode}]
                      </span>
                    )}
                    {standardTitle}
                  </p>
                )}
              </div>
            </div>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors shrink-0"
              title={isAr ? 'إغلاق' : 'Close'}
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </motion.button>
          </div>

          {/* Main Viewfinder / Review Area */}
          <div className="relative bg-black flex items-center justify-center overflow-hidden min-h-[340px] sm:min-h-[420px] max-h-[65vh]">
            {/* 1. Captured Photo Preview Mode */}
            {capturedImage ? (
              <div className="relative w-full h-full flex items-center justify-center p-2">
                <img
                  src={capturedImage}
                  alt="Captured Evidence"
                  className="max-h-[60vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-emerald-500/40"
                />

                {/* Resolution Badge */}
                <div className="absolute top-4 start-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-xl text-[11px] font-mono font-bold text-emerald-400 border border-emerald-500/30 shadow-lg flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-emerald-400"></i>
                  <span>{capturedResolution}</span>
                </div>
              </div>
            ) : errorMsg ? (
              /* 2. Error / Fallback State */
              <div className="p-6 sm:p-8 text-center max-w-md space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center mx-auto text-2xl">
                  <i className="fa-solid fa-video-slash"></i>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {isAr ? 'تعذر تشغيل الكاميرا المباشرة' : 'Camera Feed Unavailable'}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">{errorMsg}</p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={startCamera}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-sky-600/30"
                  >
                    <i className="fa-solid fa-rotate-right"></i>
                    <span>{isAr ? 'إعادة المحاولة' : 'Try Again'}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => fileFallbackRef.current?.click()}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-slate-700"
                  >
                    <i className="fa-solid fa-folder-open text-sky-400"></i>
                    <span>{isAr ? 'اختيار ملف صورة من الجهاز' : 'Select Image File'}</span>
                  </motion.button>
                </div>
              </div>
            ) : (
              /* 3. Live Video Viewfinder Stream */
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover sm:object-contain transition-transform ${
                    facingMode === 'user' ? '-scale-x-100' : ''
                  }`}
                />

                {/* Loading indicator */}
                {isLoading && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-30">
                    <div className="w-10 h-10 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
                    <span className="text-xs font-bold text-slate-300">
                      {isAr ? 'جارٍ الاتصال بالكاميرا...' : 'Connecting to live camera...'}
                    </span>
                  </div>
                )}

                {/* 3x3 Rule-of-Thirds Grid */}
                {showGrid && !isLoading && (
                  <div className="absolute inset-0 pointer-events-none z-10 grid grid-cols-3 grid-rows-3 opacity-25">
                    <div className="border-r border-b border-white/60"></div>
                    <div className="border-r border-b border-white/60"></div>
                    <div className="border-b border-white/60"></div>
                    <div className="border-r border-b border-white/60"></div>
                    <div className="border-r border-b border-white/60"></div>
                    <div className="border-b border-white/60"></div>
                    <div className="border-r border-white/60"></div>
                    <div className="border-r border-white/60"></div>
                    <div></div>
                  </div>
                )}

                {/* Inspection Viewfinder HUD Overlay */}
                {!isLoading && (
                  <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-6">
                    {/* Viewfinder 4 Corners Brackets */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-sky-400 rounded-tl-lg shadow-sm"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-sky-400 rounded-tr-lg shadow-sm"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-sky-400 rounded-bl-lg shadow-sm"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-sky-400 rounded-br-lg shadow-sm"></div>

                    {/* Center Crosshair Target */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border border-sky-400/40 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping"></div>
                        <div className="absolute w-6 h-[1px] bg-sky-400/60"></div>
                        <div className="absolute h-6 w-[1px] bg-sky-400/60"></div>
                      </div>
                    </div>

                    {/* Live Timestamp & Resolution Watermark */}
                    <div className="self-end mt-auto bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-2">
                      <span className="text-sky-400 font-bold">🛡️ QA-INSPECT</span>
                      <span>{currentTimestamp}</span>
                    </div>
                  </div>
                )}

                {/* Countdown Overlay */}
                {countdown !== null && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-40">
                    <motion.span
                      key={countdown}
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      exit={{ scale: 1.8, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="text-7xl sm:text-8xl font-black text-sky-400 font-mono drop-shadow-[0_0_25px_rgba(56,189,248,0.8)]"
                    >
                      {countdown}
                    </motion.span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Controls Bar */}
          <div className="p-4 sm:p-5 bg-slate-950/90 border-t border-slate-800/80">
            {capturedImage ? (
              /* Review Actions: Use Photo vs Retake */
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={addWatermark}
                      onChange={e => setAddWatermark(e.target.checked)}
                      className="w-4 h-4 rounded text-sky-500 focus:ring-sky-500 bg-slate-800 border-slate-700"
                    />
                    <span>{isAr ? 'ختم المعاينة والوقت آلياً' : 'Stamp Date & Audit ID'}</span>
                  </label>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={handleRetake}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-slate-700"
                  >
                    <i className="fa-solid fa-rotate-left text-amber-400"></i>
                    <span>{isAr ? 'إعادة التقاط' : 'Retake Photo'}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleConfirmPhoto}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-check text-sm"></i>
                    <span>{isAr ? 'اعتماد وإرفاق الصورة' : 'Accept & Attach'}</span>
                  </motion.button>
                </div>
              </div>
            ) : (
              /* Live Capture Toolbar */
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                {/* Left quick toggles: Grid & Timer */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Grid Toggle */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setShowGrid(prev => !prev)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-colors border ${
                      showGrid
                        ? 'bg-sky-500/20 text-sky-400 border-sky-500/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                    }`}
                    title={isAr ? 'شبكة المحاذاة (Grid)' : 'Alignment Grid'}
                  >
                    <i className="fa-solid fa-table-cells"></i>
                  </motion.button>

                  {/* 3s Timer Toggle */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setTimerDuration(prev => (prev === 0 ? 3 : 0))}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-colors border ${
                      timerDuration > 0
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                    }`}
                    title={isAr ? 'مؤقت ذاتي 3 ثوانٍ' : '3s Self-timer'}
                  >
                    <span className="font-mono text-[11px] font-black">
                      {timerDuration > 0 ? '3s' : '0s'}
                    </span>
                  </motion.button>

                  {/* Torch Toggle if supported */}
                  {hasTorch && (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={toggleTorch}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-colors border ${
                        isTorchOn
                          ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                      }`}
                      title={isAr ? 'الفلاش / الكشاف' : 'Torch / Flashlight'}
                    >
                      <i className="fa-solid fa-bolt"></i>
                    </motion.button>
                  )}
                </div>

                {/* Center: Big Tactile Shutter Button */}
                <div className="flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={isLoading || !!errorMsg}
                    type="button"
                    onClick={handleShutterClick}
                    className={`relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 border-4 transition-all flex items-center justify-center shadow-2xl ${
                      isLoading || errorMsg
                        ? 'border-slate-700 bg-slate-800 opacity-50 cursor-not-allowed'
                        : 'border-white bg-white/10 hover:border-sky-400 shadow-sky-500/30'
                    }`}
                    title={isAr ? 'التقاط الصورة (المسافة Space)' : 'Capture Photo (Space)'}
                  >
                    <div className="w-full h-full rounded-full bg-white group-hover:bg-sky-400 transition-colors flex items-center justify-center text-slate-900 shadow-inner">
                      <i className="fa-solid fa-camera text-base sm:text-lg"></i>
                    </div>
                  </motion.button>
                </div>

                {/* Right: Camera Switch & Gallery Fallback */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Flip Camera (Front/Rear) */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={handleFlipCamera}
                    disabled={isLoading || !!errorMsg}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold transition-colors border border-slate-700"
                    title={
                      isAr
                        ? facingMode === 'environment'
                          ? 'التبديل للكاميرا الأمامية'
                          : 'التبديل للكاميرا الخلفية'
                        : 'Switch Camera'
                    }
                  >
                    <i className="fa-solid fa-camera-rotate"></i>
                  </motion.button>

                  {/* Fallback File Browse Button */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => fileFallbackRef.current?.click()}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-sky-400 flex items-center justify-center text-xs font-bold transition-colors border border-slate-700"
                    title={isAr ? 'اختيار صورة من ذاكرة الجهاز' : 'Pick Image File'}
                  >
                    <i className="fa-solid fa-image"></i>
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
