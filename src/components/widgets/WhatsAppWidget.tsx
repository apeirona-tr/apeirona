'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';

interface WhatsAppWidgetProps {
  phoneNumber: string;
  message?: string;
  position?: 'left' | 'right';
}

export function WhatsAppWidget({
  phoneNumber,
  message = 'Merhaba! Size nasıl yardımcı olabilirim?',
  position = 'right',
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = () => {
    const encodedMessage = encodeURIComponent(inputMessage || message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setInputMessage('');
  };

  const positionClasses = position === 'right' ? 'right-6' : 'left-6';

  return (
    <>
      {/* Widget Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed bottom-6 ${positionClasses} z-50
          w-14 h-14 bg-[#25D366] rounded-full shadow-lg
          flex items-center justify-center
          hover:bg-[#20BD5A] transition-colors
          group
        `}
        aria-label="WhatsApp ile iletişime geç"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse Animation */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        )}
      </motion.button>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`
              fixed bottom-24 ${positionClasses} z-50
              w-80 bg-white rounded-2xl shadow-2xl overflow-hidden
            `}
          >
            {/* Header */}
            <div className="bg-[#075E54] p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📓</span>
                </div>
                <div>
                  <h3 className="font-semibold">Apeirona</h3>
                  <p className="text-sm text-white/80">Genellikle hemen yanıtlıyoruz</p>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="p-4 bg-[#ECE5DD] min-h-[120px]">
              <div className="bg-white rounded-lg p-3 shadow-sm max-w-[80%]">
                <p className="text-sm text-gray-700">{message}</p>
                <p className="text-xs text-gray-400 mt-1 text-right">
                  {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Mesajınızı yazın..."
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                />
                <button
                  onClick={handleSend}
                  className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center hover:bg-[#20BD5A] transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center mt-2">
                WhatsApp ile devam edeceksiniz
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default WhatsAppWidget;

