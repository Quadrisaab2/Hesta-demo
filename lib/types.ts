export interface AppState {
  currentScreen: 'onboarding' | 'dashboard';
  birthDate: string | null;
  selectedRating: number | null;
  selectedPainAnswer: 'yes' | 'no' | null;
}

export interface CheckinData {
  emotionalRating: number;
  physicalPain: 'yes' | 'no';
  date: string;
}

export interface DashboardCardProps {
  icon: string;
  title: string;
  actionType: 'button' | 'link';
  actionText: string;
  onAction?: () => void;
}

export interface OnboardingProps {
  onSubmit: (birthDate: string) => void;
}

export interface DashboardProps {
  weekPostpartum: number;
  onStartCheckin: () => void;
}