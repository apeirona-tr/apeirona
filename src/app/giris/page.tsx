'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Giriş başarısız');
      }

      setUser(data.data.user);
      router.push('/hesabim');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-3xl font-bold text-[var(--color-dark)]">
                Apeirona
              </span>
            </Link>
            <h1 className="font-serif text-3xl font-bold text-[var(--color-dark)] mb-2">
              Hoş Geldiniz
            </h1>
            <p className="text-[var(--color-stone)]">
              Hesabınıza giriş yapın
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}

            <Input
              label="E-posta"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ornek@email.com"
              leftIcon={<Mail className="w-5 h-5" />}
              required
            />

            <Input
              label="Şifre"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              leftIcon={<Lock className="w-5 h-5" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              }
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[var(--color-sand)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <span className="text-[var(--color-charcoal)]">Beni hatırla</span>
              </label>
              <Link
                href="/sifremi-unuttum"
                className="text-[var(--color-primary)] hover:underline"
              >
                Şifremi unuttum
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
            >
              Giriş Yap
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[var(--color-stone)]">
              Hesabınız yok mu?{' '}
              <Link
                href="/kayit"
                className="text-[var(--color-primary)] font-medium hover:underline"
              >
                Kayıt olun
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative text-center text-white p-12"
        >
          <div className="flex justify-center mb-8">
            <Sparkles className="w-16 h-16 text-[var(--color-accent)]" />
          </div>
          <h2 className="font-serif text-4xl font-bold mb-4">
            Kendi Planlayıcını Yarat
          </h2>
          <p className="text-xl text-white/80 max-w-md">
            6 kolay adımda hayalinizdeki planlayıcıyı tasarlayın. 
            Kaliteli malzemeler, özgün tasarımlar.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

