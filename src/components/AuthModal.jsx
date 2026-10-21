import React, { useState } from 'react';
import { X, User, Shield, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthModal = () => {
  const { isAuthModalOpen, closeAuth, authMode, setAuthMode, authRole, setAuthRole, login, register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', address: '' });

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      const res = await login(formData.email, formData.password, authRole);
      if (res.user?.role === 'ADMIN') navigate('/admin');
    } else {
      await register(formData.name, formData.email, formData.password, formData.phone, formData.address, authRole);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div onClick={closeAuth} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" />
      <div className="min-h-screen px-4 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 z-10 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-slate-900">{authRole === 'ADMIN' ? 'Admin Portal' : 'Customer Account'}</h3>
            <button onClick={closeAuth}><X className="w-5 h-5 text-slate-400" /></button>
          </div>

          {/* Quick Demo Pre-fill */}
          <div className="flex gap-2 text-[11px] bg-slate-50 p-2 rounded-xl">
            <button
              type="button"
              onClick={() => { setAuthRole('CUSTOMER'); setFormData({ ...formData, email: 'customer@sareevault.com', password: 'password123' }); }}
              className="px-2 py-1 bg-amber-100 text-amber-900 rounded font-bold"
            >
              1-Click Customer
            </button>
            <button
              type="button"
              onClick={() => { setAuthRole('ADMIN'); setFormData({ ...formData, email: 'admin@sareevault.com', password: 'admin123' }); }}
              className="px-2 py-1 bg-rose-100 text-rose-900 rounded font-bold"
            >
              1-Click Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {authMode === 'register' && authRole === 'CUSTOMER' && (
              <input
                type="text" required placeholder="Full Name" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300"
              />
            )}
            <input
              type="email" required placeholder="Email Address" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300"
            />
            <input
              type="password" required placeholder="Password" value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300"
            />
            <button
              type="submit"
              className={`w-full py-3 rounded-xl text-white font-bold cursor-pointer ${authRole === 'ADMIN' ? 'bg-rose-700' : 'bg-amber-800'}`}
            >
              {authMode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;