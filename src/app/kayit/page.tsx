'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Eye, EyeOff, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/authStore';

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return;
    }

    if (!acceptTerms) {
      setError('Kullanım koşullarını kabul etmelisiniz');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Kayıt başarısız');
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
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-dark)] items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative text-center text-white p-12"
        >
          <div className="flex justify-center mb-8">
            <Sparkles className="w-16 h-16" />
          </div>
          <h2 className="font-serif text-4xl font-bold mb-4">
            Apeirona Ailesine Katılın
          </h2>
          <p className="text-xl text-white/80 max-w-md">
            Özel indirimler, yeni ürünlerden haberdar olma ve 
            kişiselleştirilmiş deneyim için hemen kayıt olun.
          </p>
        </motion.div>
      </div>

      {/* Right Side - Form */}
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
              Hesap Oluşturun
            </h1>
            <p className="text-[var(--color-stone)]">
              Hemen ücretsiz kayıt olun
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Ad"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Adınız"
                leftIcon={<User className="w-5 h-5" />}
                required
              />
              <Input
                label="Soyad"
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Soyadınız"
                required
              />
            </div>

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
              label="Telefon (Opsiyonel)"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0555 123 45 67"
              leftIcon={<Phone className="w-5 h-5" />}
            />

            <Input
              label="Şifre"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="En az 6 karakter"
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

            <Input
              label="Şifre Tekrar"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Şifrenizi tekrar girin"
              leftIcon={<Lock className="w-5 h-5" />}
              required
            />

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-[var(--color-sand)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <span className="text-sm text-[var(--color-charcoal)]">
                <Link href="/kullanim-kosullari" className="text-[var(--color-primary)] hover:underline">
                  Kullanım koşullarını
                </Link>{' '}
                ve{' '}
                <Link href="/gizlilik-politikasi" className="text-[var(--color-primary)] hover:underline">
                  gizlilik politikasını
                </Link>{' '}
                okudum ve kabul ediyorum.
              </span>
            </label>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
            >
              Kayıt Ol
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[var(--color-stone)]">
              Zaten hesabınız var mı?{' '}
              <Link
                href="/giris"
                className="text-[var(--color-primary)] font-medium hover:underline"
              >
                Giriş yapın
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

