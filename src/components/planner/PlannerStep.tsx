'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { usePlannerStore, PLANNER_STEPS } from '@/store/plannerStore';

interface PlannerOption {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  price: number;
  // İlişkili seçenekler için parent ID
  parentId?: string;
}

interface PlannerStepProps {
  step: (typeof PLANNER_STEPS)[number];
}

// Defter Tipi Seçenekleri
const notebookTypeOptions: PlannerOption[] = [
  { 
    _id: 'nt1', 
    name: 'A5 - Spiralli Sert Karton Kapak', 
    description: '15x21cm (En çok satan ölçü)\n400gr. Bristol + Mat Selefon', 
    price: 0, 
    image: '/images/planner/a5-spiral-sert.jpg' 
  },
  { 
    _id: 'nt2', 
    name: 'A5 - Tutkallı', 
    description: '15x21cm\nTutkallı cilt', 
    price: 0, 
    image: '/images/planner/a5-tutkalli.jpg' 
  },
  { 
    _id: 'nt3', 
    name: 'A5 - Spiralli Plastik Kapak', 
    description: '15x21cm\nPlastik kapak', 
    price: -10, 
    image: '/images/planner/a5-spiral-plastik.jpg' 
  },
  { 
    _id: 'nt4', 
    name: 'A6 - Spiralli Sert Karton Kapak', 
    description: '14x10cm\n400gr. Bristol + Mat Selefon', 
    price: -20, 
    image: '/images/planner/a6-spiral-sert.jpg' 
  },
];

// İç Tasarım Seçenekleri - A5 Spiralli Sert Karton için
const innerDesignOptionsSpiral: PlannerOption[] = [
  { _id: 'id1', name: 'Günlük Planlayıcı Türkçe', price: 0, image: '/images/planner/gunluk-planlayici.jpg', parentId: 'nt1' },
  { _id: 'id2', name: 'Noktalı (Bullet)', price: 0, image: '/images/planner/noktali.jpg', parentId: 'nt1' },
  { _id: 'id3', name: 'Kareli', price: 0, image: '/images/planner/kareli.jpg', parentId: 'nt1' },
  { _id: 'id4', name: 'Çizgisiz', price: 0, image: '/images/planner/cizgisiz.jpg', parentId: 'nt1' },
  { _id: 'id5', name: 'Haftalık Planlayıcı', price: 0, image: '/images/planner/haftalik.jpg', parentId: 'nt1' },
  { _id: 'id6', name: 'Sınav Hazırlık Planlayıcı', price: 0, image: '/images/planner/sinav-hazirlik.jpg', parentId: 'nt1' },
  { _id: 'id7', name: 'Kitap Okuma Planlayıcı', price: 0, image: '/images/planner/kitap-okuma.jpg', parentId: 'nt1' },
  { _id: 'id8', name: 'Diyet ve Spor Planlayıcı', price: 0, image: '/images/planner/diyet-spor.jpg', parentId: 'nt1' },
  { _id: 'id9', name: 'YDS Planlayıcı', price: 0, image: '/images/planner/yds.jpg', parentId: 'nt1' },
  { _id: 'id10', name: 'Tarihsiz Ajanda', price: 0, image: '/images/planner/tarihsiz-ajanda.jpg', parentId: 'nt1' },
];

// İç Tasarım Seçenekleri - A5 Tutkallı için
const innerDesignOptionsTutkalli: PlannerOption[] = [
  { _id: 'id11', name: 'Çizgili', price: 0, image: '/images/planner/cizgili.jpg', parentId: 'nt2' },
  { _id: 'id12', name: 'Kareli', price: 0, image: '/images/planner/kareli.jpg', parentId: 'nt2' },
  { _id: 'id13', name: 'Noktalı (Bullet)', price: 0, image: '/images/planner/noktali.jpg', parentId: 'nt2' },
  { _id: 'id14', name: 'Çizgisiz', price: 0, image: '/images/planner/cizgisiz.jpg', parentId: 'nt2' },
];

// İç Tasarım Seçenekleri - A5 Spiralli Plastik için
const innerDesignOptionsPlastik: PlannerOption[] = [
  { _id: 'id15', name: 'Çizgili', price: 0, image: '/images/planner/cizgili.jpg', parentId: 'nt3' },
  { _id: 'id16', name: 'Kareli', price: 0, image: '/images/planner/kareli.jpg', parentId: 'nt3' },
  { _id: 'id17', name: 'Noktalı (Bullet)', price: 0, image: '/images/planner/noktali.jpg', parentId: 'nt3' },
];

// İç Tasarım Seçenekleri - A6 Spiralli için
const innerDesignOptionsA6: PlannerOption[] = [
  { _id: 'id18', name: 'Günlük Planlayıcı Türkçe', price: 0, image: '/images/planner/gunluk-planlayici.jpg', parentId: 'nt4' },
  { _id: 'id19', name: 'Noktalı (Bullet)', price: 0, image: '/images/planner/noktali.jpg', parentId: 'nt4' },
  { _id: 'id20', name: 'Çizgili', price: 0, image: '/images/planner/cizgili.jpg', parentId: 'nt4' },
  { _id: 'id21', name: 'Tarihsiz Ajanda', price: 0, image: '/images/planner/tarihsiz-ajanda.jpg', parentId: 'nt4' },
];

// Kapak Modeli Seçenekleri
const coverModelOptions: PlannerOption[] = [
  { _id: 'cm1', name: 'Minimal Beyaz', price: 0, image: '/images/planner/cover-white.jpg' },
  { _id: 'cm2', name: 'Kraft Kahverengi', price: 0, image: '/images/planner/cover-kraft.jpg' },
  { _id: 'cm3', name: 'Mermer Desen', price: 20, image: '/images/planner/cover-marble.jpg' },
  { _id: 'cm4', name: 'Botanik', price: 25, image: '/images/planner/cover-botanical.jpg' },
  { _id: 'cm5', name: 'Geometrik', price: 20, image: '/images/planner/cover-geometric.jpg' },
  { _id: 'cm6', name: 'Deri Görünüm', price: 40, image: '/images/planner/cover-leather.jpg' },
];

// Spiral Tipi Seçenekleri
const spiralTypeOptions: PlannerOption[] = [
  { _id: 'st1', name: 'Tel Spiral - Siyah', price: 0, image: '/images/planner/wire-spiral-black.jpg' },
  { _id: 'st2', name: 'Tel Spiral - Beyaz', price: 0, image: '/images/planner/wire-spiral-white.jpg' },
  { _id: 'st3', name: 'Tel Spiral - Gold', price: 15, image: '/images/planner/wire-spiral-gold.jpg' },
  { _id: 'st4', name: 'Tel Spiral - Rose Gold', price: 15, image: '/images/planner/wire-spiral-rosegold.jpg' },
];

// Spiral Rengi - Bu adım spiralli ürünler için
const spiralColorOptions: PlannerOption[] = [
  { _id: 'sc1', name: 'Siyah', price: 0, image: '/images/planner/spiral-black.jpg' },
  { _id: 'sc2', name: 'Beyaz', price: 0, image: '/images/planner/spiral-white.jpg' },
  { _id: 'sc3', name: 'Altın', price: 15, image: '/images/planner/spiral-gold.jpg' },
  { _id: 'sc4', name: 'Rose Gold', price: 15, image: '/images/planner/spiral-rosegold.jpg' },
  { _id: 'sc5', name: 'Gümüş', price: 10, image: '/images/planner/spiral-silver.jpg' },
];

// Kutulama Seçenekleri
const packagingOptions: PlannerOption[] = [
  { _id: 'pk1', name: 'Standart Paket', description: 'Zarif ambalaj kağıdı', price: 0, image: '/images/planner/pack-standard.jpg' },
  { _id: 'pk2', name: 'Hediye Kutusu', description: 'Özel hediye kutusu', price: 35, image: '/images/planner/pack-gift.jpg' },
  { _id: 'pk3', name: 'Premium Set', description: 'Kutu + Kurdele + Kart', price: 55, image: '/images/planner/pack-premium.jpg' },
];

export const PlannerStep: React.FC<PlannerStepProps> = ({ step }) => {
  const { selections, setSelection } = usePlannerStore();
  const [options, setOptions] = useState<PlannerOption[]>([]);

  const currentSelection = selections[step.key as keyof typeof selections];
  const selectedNotebookType = selections.notebookType;

  useEffect(() => {
    // Adıma göre seçenekleri getir
    if (step.key === 'notebookType') {
      setOptions(notebookTypeOptions);
    } else if (step.key === 'innerDesign') {
      // Seçilen defter tipine göre iç tasarım seçeneklerini getir
      if (selectedNotebookType?._id === 'nt1') {
        setOptions(innerDesignOptionsSpiral);
      } else if (selectedNotebookType?._id === 'nt2') {
        setOptions(innerDesignOptionsTutkalli);
      } else if (selectedNotebookType?._id === 'nt3') {
        setOptions(innerDesignOptionsPlastik);
      } else if (selectedNotebookType?._id === 'nt4') {
        setOptions(innerDesignOptionsA6);
      } else {
        setOptions(innerDesignOptionsSpiral); // Default
      }
    } else if (step.key === 'coverModel') {
      setOptions(coverModelOptions);
    } else if (step.key === 'spiralType') {
      // Tutkallı için spiral seçeneği yok
      if (selectedNotebookType?._id === 'nt2') {
        setOptions([{ _id: 'st0', name: 'Tutkallı Cilt', description: 'Bu ürün tutkallı cilttir', price: 0 }]);
      } else {
        setOptions(spiralTypeOptions);
      }
    } else if (step.key === 'spiralColor') {
      // Tutkallı için spiral rengi yok
      if (selectedNotebookType?._id === 'nt2') {
        setOptions([{ _id: 'sc0', name: 'Uygulanamaz', description: 'Tutkallı ürünlerde spiral yoktur', price: 0 }]);
      } else {
        setOptions(spiralColorOptions);
      }
    } else if (step.key === 'packaging') {
      setOptions(packagingOptions);
    }
  }, [step.key, selectedNotebookType]);

  const handleSelect = (option: PlannerOption) => {
    setSelection(step.key as keyof typeof selections, option);
  };

  // İlk adımda (Defter Tipi) description gösterme
  const showStepDescription = step.key !== 'notebookType';

  return (
    <div className="mt-6">
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-bold text-[var(--color-dark)] mb-1">
          {step.title}
        </h2>
        {showStepDescription && step.description && (
          <p className="text-[var(--color-stone)]">{step.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {options.map((option) => {
          const isSelected = currentSelection?._id === option._id;

          return (
            <motion.button
              key={option._id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(option)}
              className={`
                relative p-3 rounded-xl text-left transition-all duration-200
                ${isSelected
                  ? 'bg-[var(--color-primary)] text-white ring-2 ring-[var(--color-accent)] ring-offset-2'
                  : 'bg-white hover:shadow-[var(--shadow-medium)] border border-[var(--color-sand)]'
                }
              `}
            >
              {/* Selected Check */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-5 h-5 bg-[var(--color-accent)] rounded-full flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}

              {/* Image */}
              <div className={`
                aspect-square rounded-lg overflow-hidden mb-3
                ${isSelected ? 'bg-white/20' : 'bg-[var(--color-beige)]'}
              `}>
                {option.image ? (
                  <Image
                    src={option.image}
                    alt={option.name}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">
                    📓
                  </div>
                )}
              </div>

              {/* Content */}
              <h3 className={`font-medium text-sm leading-tight mb-1 ${isSelected ? 'text-white' : 'text-[var(--color-dark)]'}`}>
                {option.name}
              </h3>
              
              {option.description && (
                <p className={`text-xs mb-2 whitespace-pre-line ${isSelected ? 'text-white/80' : 'text-[var(--color-stone)]'}`}>
                  {option.description}
                </p>
              )}

              {/* Price */}
              <p className={`font-semibold text-sm ${isSelected ? 'text-[var(--color-accent-light)]' : 'text-[var(--color-accent)]'}`}>
                {option.price === 0 ? 'Dahil' : option.price > 0 ? `+${option.price}₺` : `${option.price}₺`}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default PlannerStep;
