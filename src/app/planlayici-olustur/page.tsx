import { PlannerBuilder } from '@/components/planner';

export const metadata = {
  title: 'Kendi Planlayıcını Yarat | Apeirona',
  description: '6 kolay adımda hayalinizdeki planlayıcıyı tasarlayın. Defter tipi, iç tasarım, kapak modeli, spiral ve paketleme seçeneklerini özelleştirin.',
};

export default function CreatePlannerPage() {
  return <PlannerBuilder />;
}

