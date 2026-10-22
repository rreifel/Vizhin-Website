import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, Eye, EyeOff, AlertTriangle, ShieldCheck, KeyRound, ArrowRight, Sparkles, Database, Check, Shield } from 'lucide-react';
import { PortalUser } from '../types';
import VizhinLogo from './VizhinLogo';
import PasswordStrengthValidator, { calculatePasswordStrength } from './PasswordStrengthValidator';

interface LoginScreenProps {
  onLoginSuccess: (user: PortalUser) => void;
  users: PortalUser[];
  onBack?: () => void;
  onSwitchToOrg?: () => void;
}

export default function LoginScreen({ onLoginSuccess, users, onBack, onSwitchToOrg }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mfaChallenge, setMfaChallenge] = useState<PortalUser | null>(null);
  const [mfaCode, setMfaCode] = useState('');
  const [mfaError, setMfaError] = useState<string | null>(null);
  const [forgotFlow, setForgotFlow] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isSettingNewPassword, setIsSettingNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [newPasswordSaved, setNewPasswordSaved] = useState(false);

  // Remember Device State
  const [rememberDevice, setRememberDevice] = useState(true);
  const [trustedEmails, setTrustedEmails] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vzn_trusted_devices');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Quick switch menu to make testing roles incredibly seamless!
  const [showQuickAccess, setShowQuickAccess] = useState(true);

  const isCurrentDeviceTrusted = (emailToCheck: string): boolean => {
    return trustedEmails.includes(emailToCheck.trim().toLowerCase());
  };

  const handleForgetDevice = (emailToForget: string) => {
    const updated = trustedEmails.filter(e => e !== emailToForget.trim().toLowerCase());
    setTrustedEmails(updated);
    localStorage.setItem('vzn_trusted_devices', JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    // Match simulated user
    const matchedUser = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());

    if (!matchedUser) {
      setError('Invalid email or password combination. In active Supabase accounts, authentication triggers a secure token challenge.');
      return;
    }

    if (!matchedUser.isActive) {
      setError('This administrator status is currently flagged as INACTIVE. Contact your system Owner.');
      return;
    }

    // Check if the current device/browser is trusted for this specific user email
    const deviceTrusted = isCurrentDeviceTrusted(matchedUser.email);

    // If MFA is enabled and the device is NOT trusted, show verification challenge
    if (matchedUser.mfaEnabled && !deviceTrusted) {
      setMfaChallenge(matchedUser);
      setMfaError(null);
      setMfaCode('');
      return;
    }

    // Successful Login (bypassing MFA if device is trusted or MFA is disabled entirely!)
    onLoginSuccess(matchedUser);
  };

  const verifyMFA = (e: React.FormEvent) => {
    e.preventDefault();
    setMfaError(null);

    // Any 6-digit code matches for simulation ease, but standard is 123456
    if (mfaCode.length !== 6 || isNaN(Number(mfaCode))) {
      setMfaError('Please enter a valid 6-digit verification token.');
      return;
    }

    if (mfaChallenge) {
      // If user chose to remember/trust this computer, store it!
      if (rememberDevice) {
        const userEmail = mfaChallenge.email.toLowerCase();
        if (!trustedEmails.includes(userEmail)) {
          const updated = [...trustedEmails, userEmail];
          setTrustedEmails(updated);
          localStorage.setItem('vzn_trusted_devices', JSON.stringify(updated));
        }
      }
      onLoginSuccess(mfaChallenge);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setResetSuccess(true);
  };

  const applyQuickUser = (user: PortalUser) => {
    setEmail(user.email);
    setPassword('••••••••••••'); // Decorative password to show standard autofill state
    setError(null);
  };

  return (
    <div id="login_container" className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col relative overflow-hidden font-sans">
      
      {/* Background Decorative Rings */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-950/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#0D5C46]/20 blur-[120px] pointer-events-none" />

      {/* HEADER BAR - Identical positioning and sizing as landing page */}
      <header className="relative border-b border-neutral-900/80 bg-[#070708]/85 backdrop-blur-md px-6 py-4 z-50 w-full" id="login_header">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          <div className="flex items-center gap-8">
            {onBack ? (
              <button 
                onClick={onBack}
                className="flex items-center hover:opacity-85 transition-opacity focus:outline-none cursor-pointer text-left"
                title="Back to Website"
              >
                <VizhinLogo className="h-14 md:h-16 w-auto" />
              </button>
            ) : (
              <VizhinLogo className="h-14 md:h-16 w-auto" />
            )}
          </div>

          <a
            href="https://ais-dev-k3dq5q47ugexrlhpj2wpqo-615362750641.us-west2.run.app?signup=true"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-cyan-700/60 text-cyan-400 hover:text-cyan-300 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Need VizhinORG?</span>
            <span className="font-mono">Switch ↗</span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden w-full">

        {/* LEFT PANEL - Enterprise Graphics and Marketing Slider */}
        <div id="left_panel" className="hidden md:flex md:w-5/12 bg-neutral-900/50 border-r border-neutral-800 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
          
          {/* Dynamic Marketing Slider (Enterprise Polish) */}
          <div className="my-auto space-y-8 z-10 max-w-sm" id="enterprise_benefits">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Enterprise Grade Security
              </span>
              <h2 className="text-3xl font-bold leading-tight text-white tracking-tight">
                One Unified Account, Multi-Tenant Isolation.
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Vizhin CRM provides isolated workspaces for Partners, customer administrations, and multi-user delegation with top-tier RLS policies.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="p-1.5 rounded-lg bg-neutral-800/80 text-emerald-400 mt-1">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-200">Granular Row-Level-Security</h4>
                  <p className="text-xs text-neutral-500">Super Admins manage globally. Partner Admins view isolated customers. Customer Admins access localized team roles.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-1.5 rounded-lg bg-neutral-800/80 text-teal-400 mt-1">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-200">Supabase Connected</h4>
                  <p className="text-xs text-neutral-500">Real-time authentication, cookie-based session synchronization, and zero-cost multi-factor protection.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-xs text-neutral-600 font-mono z-10" id="login_left_footer">
            VIZHIN TECHNOLOGIES CO • PORTAL V2.4 • SSL ENCRYPTED
          </div>
        </div>

        {/* RIGHT PANEL - Actual Login Form */}
        <div id="right_panel" className="flex-1 flex flex-col justify-center items-center p-6 md:p-16 z-10">
          
          <div className="w-full max-w-md bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-md rounded-2xl p-8 lg:p-10 shadow-2xl hover:border-neutral-800 transition-colors">
          
          {/* FORGOT PASSWORD FORM */}
          {forgotFlow ? (
            <div id="forgot_screen_wrap">
              <h3 className="text-xl font-semibold text-white tracking-tight mb-2">Password Recovery Wizard</h3>
              <p className="text-xs text-neutral-400 mb-6">
                Enter your registered administrator email. The system triggers a recovery token callback to verify identity.
              </p>

              {newPasswordSaved ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-950/40 border border-emerald-800 text-emerald-300 rounded-lg p-5 text-xs space-y-3 mb-6"
                >
                  <div className="font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Password Successfully Updated!</span>
                  </div>
                  <p>
                    Your account has been updated with a new enterprise-compliant password. Redirecting to sign in...
                  </p>
                </motion.div>
              ) : isSettingNewPassword ? (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!isNewPasswordValid || newPassword !== confirmNewPassword) return;
                    setNewPasswordSaved(true);
                    setTimeout(() => {
                      setForgotFlow(false);
                      setResetSuccess(false);
                      setIsSettingNewPassword(false);
                      setNewPassword('');
                      setConfirmNewPassword('');
                      setNewPasswordSaved(false);
                    }, 2000);
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">
                      Account Verified • {forgotEmail}
                    </span>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300">
                      New Enterprise Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        required
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 pl-10 pr-10 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors font-sans"
                        placeholder="••••••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-3.5 text-neutral-500 hover:text-neutral-300 cursor-pointer"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* REAL-TIME PASSWORD STRENGTH VALIDATOR */}
                  <PasswordStrengthValidator 
                    password={newPassword}
                    onValidityChange={(isValid) => setIsNewPasswordValid(isValid)}
                  />

                  <div className="space-y-1">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        required
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 pl-10 pr-10 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors font-sans"
                        placeholder="••••••••••••"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                      {confirmNewPassword && (
                        <span className="absolute right-3 top-3">
                          {confirmNewPassword === newPassword ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <span className="text-[10px] text-red-400 font-mono">Mismatch</span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!isNewPasswordValid || newPassword !== confirmNewPassword}
                    className="w-full bg-gradient-to-r from-emerald-600 to-[#0D5C46] disabled:opacity-50 disabled:cursor-not-allowed hover:from-emerald-500 hover:to-[#0A4837] text-white font-medium text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/40 border border-emerald-500/30 cursor-pointer"
                  >
                    Save Enterprise Compliant Password <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : resetSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-950/40 border border-emerald-800 text-emerald-300 rounded-lg p-5 text-xs space-y-4 mb-6"
                >
                  <div className="font-semibold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Recovery Callback Dispatched</span>
                  </div>
                  <p>
                    A secure authentication token has been fired. Check <strong>{forgotEmail}</strong> for completion.
                  </p>
                  <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 text-neutral-400 space-y-2">
                    <p className="text-[11px] font-mono text-neutral-300">
                      ⚡ Immediate Reset Action:
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSettingNewPassword(true)}
                      className="w-full bg-emerald-950 hover:bg-emerald-900 border border-emerald-800/80 text-emerald-300 font-bold text-xs py-2 px-3 rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Set New Compliant Password Now →</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="forgot_email" className="block text-xs uppercase tracking-wider font-semibold text-neutral-400">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4.5 w-4.5 text-neutral-500" />
                      <input
                        id="forgot_email"
                        type="email"
                        required
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors font-sans"
                        placeholder="admin@name.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-[#0D5C46] hover:from-emerald-500 hover:to-[#0A4837] text-white font-medium text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/40 border border-emerald-500/30 cursor-pointer"
                  >
                    Send Authorization Callback <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              <button
                type="button"
                className="mt-6 w-full text-center text-xs text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer block"
                onClick={() => {
                  setForgotFlow(false);
                  setResetSuccess(false);
                  setIsSettingNewPassword(false);
                  setForgotEmail('');
                }}
              >
                Back to Authentication Gateway
              </button>
            </div>
          ) : mfaChallenge ? (
            /* MFA CHALLENGE FLOW */
            <div id="mfa_screen_wrap">
              <div className="flex justify-center mb-4">
                <div className="bg-emerald-950/60 p-3 rounded-full border border-emerald-900 flex justify-center items-center">
                  <KeyRound className="w-8 h-8 text-emerald-400" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white text-center tracking-tight mb-2">Two-Factor Authentication</h3>
              <p className="text-xs text-neutral-400 text-center mb-6 max-w-xs mx-auto">
                Secure access requires verification. Enter the 6-digit authenticator or SMS backup token sent to <strong>{mfaChallenge.email}</strong>.
              </p>

              {mfaError && (
                <div className="bg-red-950/40 border border-red-900 text-red-300 p-3 rounded-lg text-xs flex gap-2 items-start mb-4">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{mfaError}</span>
                </div>
              )}

              <form onSubmit={verifyMFA} className="space-y-5">
                <div className="space-y-1 text-center">
                  <label htmlFor="mfa_code" className="block text-xs uppercase tracking-wider font-semibold text-neutral-400 text-center mb-2">
                    Security Passcode
                  </label>
                  <input
                    id="mfa_code"
                    type="text"
                    required
                    maxLength={6}
                    autoFocus
                    placeholder="••••••"
                    className="w-40 mx-auto text-center font-mono tracking-[0.5em] text-2xl bg-neutral-950 border border-neutral-800 rounded-lg py-2 focus:outline-none focus:border-emerald-500 text-neutral-200 placeholder-neutral-700"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value)}
                  />
                </div>

                 <div className="flex items-center gap-2 justify-center py-1">
                  <input
                    id="remember_mfa"
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="rounded border-neutral-800 bg-neutral-950 text-emerald-600 focus:ring-emerald-500 h-4 w-4 cursor-pointer"
                  />
                  <label htmlFor="remember_mfa" className="text-xs text-neutral-400 cursor-pointer select-none hover:text-neutral-350 transition-colors">
                    Remember this computer for 30 days
                  </label>
                </div>

                <div className="bg-neutral-950/80 p-3 rounded-lg border border-neutral-800 text-[11px] text-neutral-500 leading-relaxed text-center">
                  🔒 Dev Security Mode matches any 6 digits (e.g. <strong className="text-neutral-300">123456</strong>)
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-[#0D5C46] hover:from-emerald-500 hover:to-[#0A4837] text-white font-medium text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-950/40 border border-emerald-500/30 cursor-pointer"
                  >
                    Confirm Credentials
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (mfaChallenge) {
                        onLoginSuccess(mfaChallenge);
                      }
                    }}
                    className="w-full bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-400 font-semibold text-xs py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    ⚡ Direct Bypass (Skip MFA)
                  </button>
                </div>
              </form>

              <button
                type="button"
                className="mt-6 w-full text-center text-xs text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                onClick={() => setMfaChallenge(null)}
              >
                Sign In with another account
              </button>
            </div>
          ) : (
            /* CONVENTIONAL LOGIN - SAVE PASSWORD COMPATIBLE */
            <div id="standard_login_wrap">
              <div className="mb-6">
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  <span className="text-emerald-500">V</span>izhin CRM Portal
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Secure administration gateway. Authenticating validates metadata permissions.
                </p>
              </div>

              {error && (
                <div id="login_error" className="bg-red-950/40 border border-red-900 text-red-300 p-3.5 rounded-lg text-xs flex gap-2.5 items-start mb-5">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* standard <form> with autocomplete tags captures save password in Chrome and Safari! */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-xs uppercase tracking-wider font-semibold text-neutral-400">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="username"
                      required
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-neutral-250 focus:outline-none focus:border-emerald-500 transition-colors font-sans text-neutral-200"
                      placeholder="rreifel@vizhin.co"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="password" className="block text-xs uppercase tracking-wider font-semibold text-neutral-400">Password</label>
                    <button
                      type="button"
                      className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                      onClick={() => setForgotFlow(true)}
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      autoComplete="current-password"
                      required
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 pl-10 pr-10 text-sm text-neutral-250 focus:outline-none focus:border-emerald-500 transition-colors font-sans text-neutral-200"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-neutral-500 hover:text-neutral-300 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {email && isCurrentDeviceTrusted(email) && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-950/40 border border-emerald-900/60 rounded-lg p-3 text-xs text-emerald-300 flex justify-between items-center"
                    id="trusted_device_banner"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>This computer is remembered (Trust Skip Active ⚡)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleForgetDevice(email)}
                      className="text-[10px] text-emerald-400 hover:text-red-400 underline cursor-pointer"
                    >
                      Forget
                    </button>
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-[#0D5C46] hover:from-emerald-500 hover:to-[#0A4837] text-white font-medium text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/40 border border-emerald-500/30 cursor-pointer mt-2"
                >
                  Verify Authenticated Access <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-6 flex items-center gap-4 text-xs text-neutral-500 justify-center">
                <span>🛡️ RSA 4096 Authenticated</span>
                <span>•</span>
                <span>💾 Password Managers Compatible</span>
              </div>
            </div>
          )}
        </div>

        {/* REVOLUTIONARY QUICK TESTER DRAWER */}
        <div className="w-full max-w-md mt-6" id="tester_cabinet_container">
          <div className="bg-neutral-900/60 border border-neutral-800/85 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
                UX Tester Panel (Supabase Sync)
              </span>
              <button 
                className="text-[11px] text-neutral-400 hover:text-neutral-200 underline cursor-pointer"
                onClick={() => setShowQuickAccess(!showQuickAccess)}
              >
                {showQuickAccess ? "Hide preset list" : "Show preset list"}
              </button>
            </div>
            
            {showQuickAccess && (
              <div className="space-y-2">
                <p className="text-[11px] text-neutral-500 leading-relaxed mb-1">
                  Simulate different profile scopes. Click a profile to auto-fill, or click <strong className="text-emerald-400 font-mono">⚡ God Mode</strong> to log in instantly.
                </p>
                <div className="grid grid-cols-1 gap-1.5 max-h-56 overflow-y-auto pr-1">
                  {users.map(u => (
                    <button
                      key={u.id}
                      type="button"
                      className="w-full text-left p-2 rounded bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-between text-xs transition-colors group cursor-pointer"
                      onClick={() => applyQuickUser(u)}
                    >
                      <div className="flex items-center gap-2">
                        {u.avatarUrl ? (
                          <img src={u.avatarUrl} alt="" className="w-6 h-6 rounded-full border border-neutral-800" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-neutral-800 text-[10px] flex items-center justify-center font-bold text-neutral-300">
                            {u.name.substring(0,2)}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-neutral-200 group-hover:text-white flex items-center gap-1.5">
                            {u.name}
                            {u.mfaEnabled && (
                              <span className="text-[9px] px-1 bg-blue-900/50 text-blue-300 border border-blue-800 rounded">
                                MFA
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-neutral-500 font-mono">{u.email}</div>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1 shrink-0">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-mono font-medium ${
                          u.role === 'SUPER_ADMIN' ? 'bg-red-950 text-red-400 border border-red-900' :
                          u.role === 'PARTNER_ADMIN' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' :
                          'bg-teal-950 text-teal-300 border border-teal-900'
                        }`}>
                          {u.role.replace('_', ' ')}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onLoginSuccess(u);
                          }}
                          className="px-2 py-0.5 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-400 hover:text-white border border-emerald-900 text-[10px] transition-colors font-mono cursor-pointer flex items-center gap-1"
                        >
                          ⚡ God Mode
                        </button>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  </div>
  );
}
