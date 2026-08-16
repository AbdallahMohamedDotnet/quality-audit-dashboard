import React, { useState } from 'react';
import { useAudit } from '../../context/AuditContext';
import { ROLES } from '../../data';

export const LoginModal: React.FC = () => {
  const { isAr, isDark, dir, isLoginModalOpen, setIsLoginModalOpen, login, showToast } = useAudit();
  const [selectedRole, setSelectedRole] = useState(ROLES[0].val);
  const [password, setPassword] = useState('123');
  const [showPassword, setShowPassword] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(selectedRole, password);
    if (success) {
      setIsLoginModalOpen(false);
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
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border transition-colors relative overflow-hidden ${
          isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Background glow accent */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-md">
              <i className="fa-solid fa-lock text-base"></i>
            </div>
            <div>
              <h3 className="text-base font-black">
                {isAr ? 'تسجيل دخول التنفيذيين' : 'Executive Sign In'}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {isAr ? 'منصة التدقيق الرقمية المعتمدة' : 'Certified Quality Audit Panel'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsLoginModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

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
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-black py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
          >
            <i className="fa-solid fa-right-to-bracket"></i>
            {isAr ? 'دخول مساحة العمل' : 'Enter Workspace'}
          </button>
        </form>

        {/* Quick Demo Access Roles */}
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 relative z-10">
          <p className="text-center text-[10px] font-bold text-slate-500 mb-3 uppercase tracking-widest">
            {isAr ? 'الدخول السريع للأدوار التجريبية' : 'Quick Demo Access Roles'}
          </p>
          <div className="grid grid-cols-2 gap-2 max-h-[140px] overflow-y-auto pr-1">
            {ROLES.map(role => (
              <button
                key={role.val}
                type="button"
                onClick={() => handleQuickLogin(role.val)}
                className={`text-[10px] font-black p-2 rounded-lg border hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-colors truncate ${
                  isDark
                    ? 'bg-slate-950 border-slate-700 text-slate-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
                title={isAr ? role.ar : role.en}
              >
                {isAr ? role.ar : role.en}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
