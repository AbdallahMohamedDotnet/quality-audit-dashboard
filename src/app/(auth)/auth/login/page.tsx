'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAudit } from '@/context/AuditContext';
import { ROLES } from '@/data';

export default function LoginPage() {
  const router = useRouter();
  const {
    isAr,
    isDark,
    dir,
    toggleTheme,
    setLanguage,
    logoSvg,
    login,
    showToast,
  } = useAudit();

  const [selectedRole, setSelectedRole] = useState(ROLES[0].val);
  const [password, setPassword] = useState('123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const success = login(selectedRole, password);
    if (success) {
      router.push('/');
    } else {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (roleVal: string) => {
    setSelectedRole(roleVal);
    setPassword('123');
    showToast(
      isAr ? 'تم تعبئة بيانات الدخول السريع' : 'Quick demo credentials loaded',
      'info'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full"
    >
      {/* Top action bar: Back to home + Theme & Language toggles */}
      <div className="flex items-center justify-between mb-4 px-1">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
            isDark
              ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              : 'bg-white/80 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
          } shadow-sm backdrop-blur-sm`}
        >
          <i className={`fa-solid ${isAr ? 'fa-arrow-right' : 'fa-arrow-left'} text-[11px]`} />
          <span>{isAr ? 'الرئيسية' : 'Home'}</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Theme Switcher */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`flex items-center justify-center w-8 h-8 rounded-xl border text-xs transition-colors ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 text-amber-400 hover:bg-slate-800'
                : 'bg-white/80 border-slate-200 text-slate-600 hover:bg-slate-100'
            } shadow-sm backdrop-blur-sm`}
          >
            {isDark ? '☀️' : '🌙'}
          </motion.button>

          {/* Language Switcher */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={() => setLanguage(isAr ? 'en' : 'ar')}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white'
                : 'bg-white/80 border-slate-200 text-slate-600 hover:text-slate-900'
            } shadow-sm backdrop-blur-sm`}
          >
            {isAr ? 'EN' : 'عر'}
          </motion.button>
        </div>
      </div>

      {/* Main Login Card */}
      <div
        className={`w-full rounded-3xl p-6 sm:p-8 shadow-2xl border transition-colors relative overflow-hidden backdrop-blur-md ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-white'
            : 'bg-white/95 border-slate-200 text-slate-900'
        }`}
      >
        {/* Decorative ambient gradients inside card */}
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header Branding */}
        <div className="flex flex-col items-center text-center pb-6 mb-6 border-b border-slate-200 dark:border-slate-800 relative z-10">
          <div
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg mb-3"
            dangerouslySetInnerHTML={{ __html: logoSvg }}
          />
          <h2 className="text-xl font-black tracking-tight">
            {isAr ? 'تسجيل دخول التنفيذيين' : 'Executive Sign In'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            {isAr
              ? 'منصة التدقيق الرقمية وإدارة الجودة الشاملة'
              : 'Digital Quality Audit & Incident Management'}
          </p>
          <span className="mt-2 text-[10px] font-black px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-500 border border-sky-500/25 font-mono">
            v9.8 PRO ENTERPRISE
          </span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {/* Role selection dropdown */}
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1.5">
              {isAr ? 'الصفة / الدور الوظيفي' : 'Select Executive Role'}
            </label>
            <div className="relative">
              <select
                value={selectedRole}
                onChange={e => setSelectedRole(e.target.value)}
                className={`w-full p-3.5 rounded-xl border font-bold text-xs transition-colors outline-none focus:border-sky-500 appearance-none ${
                  isDark
                    ? 'bg-slate-950 border-slate-700 text-slate-100'
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                {ROLES.map(role => (
                  <option key={role.val} value={role.val}>
                    {isAr ? role.ar : role.en}
                  </option>
                ))}
              </select>
              <i
                className={`fa-solid fa-chevron-down absolute top-4 text-xs text-slate-400 pointer-events-none ${
                  dir === 'rtl' ? 'left-4' : 'right-4'
                }`}
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1.5">
              {isAr ? 'رمز المرور الأمني (الافتراضي: 123)' : 'Security Passcode (Default: 123)'}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`w-full p-3.5 rounded-xl border font-bold text-xs transition-colors outline-none focus:border-sky-500 px-10 ${
                  isDark
                    ? 'bg-slate-950 border-slate-700 text-slate-100'
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
                placeholder="123"
                required
              />
              <i
                className={`fa-solid fa-key absolute top-4 text-xs text-slate-400 ${
                  dir === 'rtl' ? 'right-3.5' : 'left-3.5'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute top-3.5 text-slate-400 hover:text-sky-500 ${
                  dir === 'rtl' ? 'left-3.5' : 'right-3.5'
                }`}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-black py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
          >
            <i className={`fa-solid ${isLoading ? 'fa-spinner fa-spin' : 'fa-right-to-bracket'}`}></i>
            {isAr ? 'دخول مساحة العمل' : 'Enter Workspace'}
          </motion.button>
        </form>

        {/* Quick Demo Access Roles */}
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 relative z-10">
          <p className="text-center text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-widest">
            {isAr ? 'الدخول السريع للأدوار التجريبية' : 'Quick Demo Access Roles'}
          </p>
          <div className="grid grid-cols-2 gap-2 max-h-[140px] overflow-y-auto pe-1">
            {ROLES.map(role => (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={role.val}
                type="button"
                onClick={() => handleQuickLogin(role.val)}
                className={`text-[10px] font-black p-2 rounded-lg border hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-colors truncate ${
                  selectedRole === role.val
                    ? 'border-sky-500 bg-sky-500/10 text-sky-400'
                    : isDark
                    ? 'bg-slate-950/80 border-slate-800 text-slate-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
                title={isAr ? role.ar : role.en}
              >
                {isAr ? role.ar : role.en}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
