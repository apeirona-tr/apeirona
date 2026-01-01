'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart, Sparkles, Award, Users, Leaf, Package } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'El Yapımı',
    description: 'Her ürünümüz özenle el yapımı olarak hazırlanır, benzersiz ve kişisel bir dokunuş taşır.',
  },
  {
    icon: Sparkles,
    title: 'Özgün Tasarım',
    description: 'Tasarımlarımız tamamen orijinaldir ve yaratıcı ekibimiz tarafından geliştirilir.',
  },
  {
    icon: Award,
    title: 'Premium Kalite',
    description: 'En kaliteli malzemeler kullanarak uzun ömürlü ürünler üretiyoruz.',
  },
  {
    icon: Users,
    title: 'Müşteri Odaklı',
    description: 'Müşteri memnuniyeti bizim için her şeyden önemlidir.',
  },
  {
    icon: Leaf,
    title: 'Sürdürülebilir',
    description: 'Çevre dostu malzemeler ve sürdürülebilir üretim yöntemleri kullanıyoruz.',
  },
  {
    icon: Package,
    title: 'Özenli Paketleme',
    description: 'Her sipariş özel olarak paketlenir ve sevgiyle gönderilir.',
  },
];

const team = [
  {
    name: 'Ayşe Yılmaz',
    role: 'Kurucu & Tasarımcı',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    bio: 'Grafik tasarım geçmişiyle planlayıcı dünyasına tutkuyla adım attı.',
  },
  {
    name: 'Mehmet Demir',
    role: 'Üretim Müdürü',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: '10 yıllık matbaa tecrübesiyle kaliteli üretimin garantisi.',
  },
  {
    name: 'Zeynep Kaya',
    role: 'Müşteri İlişkileri',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    bio: 'Her müşterinin özel hissetmesi için çalışıyor.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[var(--color-dark)] text-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-serif text-4xl lg:text-6xl font-bold mb-6">
              Biz Kimiz?
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Apeirona, 2020 yılında planlayıcı ve kırtasiye tutkusuyla yola çıkan 
              bir atölyedir. El yapımı, özgün tasarımlarla hayatınızı düzenlemenize 
              yardımcı oluyoruz.
            </p>
          </motion.div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-[var(--color-accent)]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-[var(--color-primary)]/20 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24 bg-[var(--color-beige)]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[var(--color-dark)] mb-6">
                Hikayemiz
              </h2>
              <div className="space-y-4 text-[var(--color-stone)]">
                <p>
                  Apeirona, Yunanca &quot;sınırsız&quot; anlamına gelen &quot;apeiron&quot; 
                  kelimesinden ilham alır. Yaratıcılığın sınırsızlığına inanıyoruz.
                </p>
                <p>
                  Küçük bir atölyede başlayan yolculuğumuz, bugün binlerce 
                  müşteriye ulaşan bir markaya dönüştü. Ancak değerlerimiz hiç 
                  değişmedi: kaliteli malzeme, özgün tasarım ve el işçiliği.
                </p>
                <p>
                  Her planlayıcı, her defter sizin için özel olarak hazırlanır. 
                  Çünkü biliyoruz ki, hayatınızı planlamak özel bir deneyim 
                  olmalı.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800"
                alt="Apeirona Atölyesi"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[var(--color-dark)] mb-4">
              Değerlerimiz
            </h2>
            <p className="text-[var(--color-stone)] max-w-2xl mx-auto">
              Her adımda bizi yönlendiren temel değerlerimiz
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-[var(--color-beige)] rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-[var(--color-primary)]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[var(--color-dark)] mb-2">
                  {value.title}
                </h3>
                <p className="text-[var(--color-stone)]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-[var(--color-beige)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[var(--color-dark)] mb-4">
              Ekibimiz
            </h2>
            <p className="text-[var(--color-stone)] max-w-2xl mx-auto">
              Apeirona&apos;yı özel kılan insanlar
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-serif text-xl font-semibold text-[var(--color-dark)]">
                    {member.name}
                  </h3>
                  <p className="text-[var(--color-accent)] font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-[var(--color-stone)] text-sm">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-[var(--color-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '5000+', label: 'Mutlu Müşteri' },
              { value: '200+', label: 'Özgün Tasarım' },
              { value: '4.9', label: 'Ortalama Puan' },
              { value: '5', label: 'Yıllık Deneyim' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-serif text-4xl lg:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

