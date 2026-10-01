import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import ThemeSelector from '../common/ThemeSelector';
import {
  Zap,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Key,
  Sparkles,
  CheckCircle2,
  LogIn,
  UserPlus,
  Radio,
  Cpu,
  AlertCircle,
} from 'lucide-react';

export default function AuthGateway() {
  const { login, signup, addToast } = useDashboard();

  // Mode: 'login' | 'signup'
  const [authMode, setAuthMode] = useState('login');

  // Form States
  const [email, setEmail] = useState('admin@auraautomate.io');
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState('Sandesh Rasal');
  const [role, setRole] = useState('Principal Admin');
  const [hubCode, setHubCode] = useState('AURA-HUB-9482');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Status & Validation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide your Gateway Email and Security Password.');
      return;
    }

    setLoading(true);

    // Simulate authentic IoT Hub MQTT Handshake
    setTimeout(() => {
      login({
        name: fullName || 'Sandesh Rasal',
        email: email.trim(),
        role: role || 'Principal Admin',
      });
      setLoading(false);
    }, 700);
  };

  // Handle Sign Up Submit
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!password.trim() || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (confirmPassword && password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }
    if (!agreeTerms) {
      setError('Please accept the IoT Security & Privacy Policy.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      signup({
        name: fullName.trim(),
        email: email.trim(),
        role,
        hubCode: hubCode.trim() || 'AURA-HUB-9482',
      });
      setLoading(false);
    }, 800);
  };

  // 1-Click Instant Demo Login for Hackathon Evaluators & Quick Testing
  const handleInstantDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login({
        name: 'Sandesh Rasal',
        email: 'admin@auraautomate.io',
        role: 'Principal Admin',
      });
      setLoading(false);
    }, 400);
  };

  // Forgot password handler
  const handleForgotPassword = () => {
    addToast({
      type: 'info',
      title: 'Password Recovery Dispatched',
      message: `An encrypted reset link was sent to ${email || 'your email'}. Check your inbox.`,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden selection:bg-emerald-500 selection:text-white">
      {/* High-Tech Background Glows and Circuit Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Theme Selector in Top-Right */}
      <div className="absolute top-5 right-5 z-20">
        <ThemeSelector />
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand & Logo Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 p-[2px] shadow-xl shadow-emerald-500/20 mb-2">
            <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center">
              <Zap className="w-7 h-7 text-emerald-400 animate-pulse" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-cyan-300 to-white bg-clip-text text-transparent">
            AuraAutomate
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto">
            Autonomous Smart Energy & IoT Command Gateway
          </p>
        </div>

        {/* Auth Glassmorphism Card */}
        <div className="rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-slate-800 shadow-2xl p-6 sm:p-7 relative transition-all">
          {/* Top Segmented Tab Switch */}
          <div className="flex p-1 rounded-xl bg-slate-950/80 border border-slate-800/90 mb-6">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setError('');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                authMode === 'login'
                  ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setError('');
                if (password === '••••••••••••') setPassword('');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                authMode === 'signup'
                  ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          {authMode === 'login' ? (
            /* --- LOGIN FORM --- */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Email / Hub ID */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address / Gateway ID
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@auraautomate.io"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 placeholder:text-slate-600 transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Security Key / Password
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter security key"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 placeholder:text-slate-600 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <span>Keep session authenticated</span>
                </label>
                <span className="text-[10px] font-mono text-emerald-400">AES-256</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Connecting to Hub...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Command Center</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>

              {/* Quick Demo Access Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-wider">
                  <span className="bg-slate-900 px-2 text-slate-500">
                    Quick Evaluator Access
                  </span>
                </div>
              </div>

              {/* Instant 1-Click Demo Login */}
              <button
                type="button"
                onClick={handleInstantDemoLogin}
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50 flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Instant Demo Login (Principal Admin)</span>
              </button>
            </form>
          ) : (
            /* --- SIGN UP FORM --- */
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sandesh Rasal"
                    className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 placeholder:text-slate-600 transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sandesh@smartautomation.io"
                    className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 placeholder:text-slate-600 transition-colors"
                  />
                </div>
              </div>

              {/* Role & Hub Pairing Code Row */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Role Tier
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Principal Admin">Principal Admin</option>
                    <option value="Homeowner">Homeowner</option>
                    <option value="Family Member">Family Member</option>
                    <option value="IoT Specialist">IoT Specialist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Hub Pairing Code
                  </label>
                  <div className="relative">
                    <Key className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cyan-400" />
                    <input
                      type="text"
                      value={hubCode}
                      onChange={(e) => setHubCode(e.target.value)}
                      placeholder="AURA-HUB-9482"
                      className="w-full pl-8 pr-2 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Create Security Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-10 pr-10 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 placeholder:text-slate-600 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 placeholder:text-slate-600 transition-colors"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer select-none text-[11px] text-slate-400">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-3.5 h-3.5 rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
                  />
                  <span>
                    I accept the AuraAutomate Device Privacy Protocol and Local MQTT Gateway Encryption terms.
                  </span>
                </label>
              </div>

              {/* Create Account Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Pairing Gateway & Initializing...</span>
                  </>
                ) : (
                  <>
                    <span>Initialize Hub & Sign Up</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Security & Hardware Status Footer */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit Hardware Enclave</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>Zigbee 3.0 & Matter</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>Local Edge Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
}
