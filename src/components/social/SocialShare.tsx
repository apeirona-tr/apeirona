'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Facebook,
  Twitter,
  Linkedin,
  Send,
  Link2,
  Share2,
  Check,
  X,
  MessageCircle,
} from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  hashtags?: string[];
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'floating';
}

const socialPlatforms = [
  {
    name: 'Facebook',
    icon: Facebook,
    color: '#1877F2',
    getUrl: (url: string, title: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
  },
  {
    name: 'Twitter',
    icon: Twitter,
    color: '#1DA1F2',
    getUrl: (url: string, title: string, hashtags?: string[]) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}${hashtags?.length ? `&hashtags=${hashtags.join(',')}` : ''}`,
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    color: '#0A66C2',
    getUrl: (url: string, title: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    color: '#25D366',
    getUrl: (url: string, title: string) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    name: 'Telegram',
    icon: Send,
    color: '#0088CC',
    getUrl: (url: string, title: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: 'Pinterest',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
    color: '#E60023',
    getUrl: (url: string, title: string, _?: string[], image?: string) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}${image ? `&media=${encodeURIComponent(image)}` : ''}`,
  },
];

export function SocialShare({
  url,
  title,
  description,
  image,
  hashtags,
  className = '',
  variant = 'horizontal',
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const handleShare = (platform: typeof socialPlatforms[0]) => {
    const shareUrl = platform.getUrl(url, title, hashtags, image);
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    }
  };

  if (variant === 'floating') {
    return (
      <div className={`fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2 ${className}`}>
        {socialPlatforms.slice(0, 5).map((platform) => (
          <motion.button
            key={platform.name}
            whileHover={{ scale: 1.1, x: 4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleShare(platform)}
            onMouseEnter={() => setShowTooltip(platform.name)}
            onMouseLeave={() => setShowTooltip(null)}
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
            style={{ backgroundColor: platform.color }}
            aria-label={`${platform.name}'de paylaş`}
          >
            <platform.icon className="w-5 h-5" />
            <AnimatePresence>
              {showTooltip === platform.name && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="absolute left-full ml-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap"
                >
                  {platform.name}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
        <motion.button
          whileHover={{ scale: 1.1, x: 4 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyLink}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 text-white shadow-lg"
          aria-label="Linki kopyala"
        >
          {copied ? <Check className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
        </motion.button>
      </div>
    );
  }

  return (
    <div className={`${variant === 'vertical' ? 'flex flex-col gap-3' : 'flex flex-wrap gap-2'} ${className}`}>
      {socialPlatforms.map((platform) => (
        <motion.button
          key={platform.name}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleShare(platform)}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: platform.color }}
          aria-label={`${platform.name}'de paylaş`}
          title={`${platform.name}'de paylaş`}
        >
          <platform.icon className="w-5 h-5" />
        </motion.button>
      ))}
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCopyLink}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
          copied ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        aria-label="Linki kopyala"
        title={copied ? 'Kopyalandı!' : 'Linki kopyala'}
      >
        {copied ? <Check className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
      </motion.button>

      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNativeShare}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-primary)] text-white md:hidden"
          aria-label="Paylaş"
        >
          <Share2 className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
}

export default SocialShare;

