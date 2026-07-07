import React, { useState } from 'react';
import { Mail, Lock, User, Loader2, Sparkles } from 'lucide-react';
import { authApi } from '../services/api';
import { useToast } from '../context/ToastContext';
import { FluidArrowRight } from '../components/FluidArrow';

const AuthPage = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { showToast } = useToast();
    
    const [formData, setFormData] = useState({
        user_name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                const res = await authApi.login(formData.email, formData.password);
                showToast(`Welcome back, ${res.user.user_name || 'User'}!`, 'success');
                onLoginSuccess(res.user);
            } else {
                await authApi.register(formData.user_name, formData.email, formData.password);
                showToast('Registration successful! Logging you in...', 'success');
                const loginRes = await authApi.login(formData.email, formData.password);
                onLoginSuccess(loginRes.user);
            }
        } catch (err) {
            setError(err.message);
            showToast(err.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-bg-primary items-center justify-center relative overflow-hidden font-main">
            {/* Dark Tech Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            {/* Glowing Orange Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent-primary/15 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="w-full max-w-lg p-10 rounded-3xl bg-bg-secondary/40 backdrop-blur-2xl border border-border-subtle shadow-[0_0_50px_-12px_rgba(249,115,22,0.15)] z-10 relative overflow-hidden">
                {/* Decorative Top Line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-50"></div>

                <div className="text-center mb-10">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-accent-primary/10 rounded-xl border border-border-strong text-accent-primary shadow-[0_0_20px_-5px_rgba(249,115,22,0.3)]">
                            <Sparkles className="w-6 h-6" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-text-primary tracking-tight mb-3">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="text-text-secondary text-sm max-w-sm mx-auto leading-relaxed">
                        {isLogin ? 'Enter your credentials to access your secure workspace and pick up where you left off.' : 'Sign up to start organizing your thoughts, tasks, and ideas in a secure environment.'}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center flex items-center justify-center gap-2">
                        <span className="block w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <div>
                            <label className="block text-[11px] font-bold text-text-muted mb-2 uppercase tracking-widest">Username</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent-primary transition-colors" />
                                <input
                                    type="text"
                                    name="user_name"
                                    value={formData.user_name}
                                    onChange={handleChange}
                                    required={!isLogin}
                                    className="w-full bg-bg-tertiary/50 border border-border-subtle rounded-xl py-3.5 pl-12 pr-4 text-sm text-text-primary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all placeholder:text-text-muted/50"
                                    placeholder="johndoe"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-[11px] font-bold text-text-muted mb-2 uppercase tracking-widest">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent-primary transition-colors" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-bg-tertiary/50 border border-border-subtle rounded-xl py-3.5 pl-12 pr-4 text-sm text-text-primary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all placeholder:text-text-muted/50"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-text-muted mb-2 uppercase tracking-widest flex justify-between items-center">
                            <span>Password</span>
                            {isLogin && <button type="button" className="text-accent-primary hover:text-accent-hover normal-case tracking-normal hover:underline">Forgot?</button>}
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent-primary transition-colors" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-bg-tertiary/50 border border-border-subtle rounded-xl py-3.5 pl-12 pr-4 text-sm text-text-primary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all placeholder:text-text-muted/50 tracking-widest"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-accent-primary text-bg-primary font-bold py-3.5 rounded-xl text-sm hover:bg-accent-hover transition-all flex items-center justify-center gap-2 mt-8 shadow-[0_0_20px_-5px_rgba(249,115,22,0.4)] disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_25px_-5px_rgba(249,115,22,0.6)]"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <>
                                {isLogin ? 'Sign In to Workspace' : 'Create Free Account'}
                                <FluidArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-border-subtle pt-6">
                    <p className="text-sm text-text-muted">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            type="button"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                            }}
                            className="text-accent-primary hover:text-accent-hover font-semibold transition-colors focus:outline-none"
                        >
                            {isLogin ? "Sign up now" : "Sign in instead"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
