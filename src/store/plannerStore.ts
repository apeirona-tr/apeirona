import { create } from 'zustand';

interface PlannerOption {
  _id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

interface PlannerState {
  currentStep: number;
  selections: {
    notebookType: PlannerOption | null;
    innerDesign: PlannerOption | null;
    coverModel: PlannerOption | null;
    spiralType: PlannerOption | null;
    spiralColor: PlannerOption | null;
    packaging: PlannerOption | null;
  };
  
  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setSelection: (
    type: keyof PlannerState['selections'],
    option: PlannerOption | null
  ) => void;
  resetPlanner: () => void;
  
  // Computed
  getTotalPrice: () => number;
  isComplete: () => boolean;
  canProceed: () => boolean;
}

const TOTAL_STEPS = 6;

const initialSelections = {
  notebookType: null,
  innerDesign: null,
  coverModel: null,
  spiralType: null,
  spiralColor: null,
  packaging: null,
};

export const usePlannerStore = create<PlannerState>((set, get) => ({
  currentStep: 0,
  selections: initialSelections,

  setStep: (step) => {
    if (step >= 0 && step < TOTAL_STEPS) {
      set({ currentStep: step });
    }
  },

  nextStep: () => {
    const { currentStep, canProceed } = get();
    if (canProceed() && currentStep < TOTAL_STEPS - 1) {
      set({ currentStep: currentStep + 1 });
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 });
    }
  },

  setSelection: (type, option) => {
    set((state) => ({
      selections: {
        ...state.selections,
        [type]: option,
      },
    }));
  },

  resetPlanner: () => {
    set({
      currentStep: 0,
      selections: initialSelections,
    });
  },

  getTotalPrice: () => {
    const { selections } = get();
    let total = 0;
    
    Object.values(selections).forEach((option) => {
      if (option) {
        total += option.price;
      }
    });
    
    return total;
  },

  isComplete: () => {
    const { selections } = get();
    return Object.values(selections).every((option) => option !== null);
  },

  canProceed: () => {
    const { currentStep, selections } = get();
    const stepKeys: (keyof typeof selections)[] = [
      'notebookType',
      'innerDesign',
      'coverModel',
      'spiralType',
      'spiralColor',
      'packaging',
    ];
    
    return selections[stepKeys[currentStep]] !== null;
  },
}));

export const PLANNER_STEPS = [
  { key: 'notebookType', title: 'Defter Tipi', description: 'Planlayıcınızın boyutunu seçin' },
  { key: 'innerDesign', title: 'İç Tasarım', description: 'Sayfa düzenini seçin' },
  { key: 'coverModel', title: 'Kapak Modeli', description: 'Kapak tasarımını seçin' },
  { key: 'spiralType', title: 'Spiral Tipi', description: 'Spiral türünü seçin' },
  { key: 'spiralColor', title: 'Spiral Rengi', description: 'Spiral rengini seçin' },
  { key: 'packaging', title: 'Kutulama', description: 'Paketleme seçeneğini belirleyin' },
] as const;

