export interface AppState {
  currentScreen: 'onboarding' | 'dashboard' | 'checkin-confirmation' | 'action-plan' | 'ai-chat';
  activeTab: 'home' | 'learn' | 'support' | 'me';
  birthDate: string | null;
  selectedRating: number | null;
  selectedPainAnswer: 'yes' | 'no' | null;
  checkinHistory: CheckinData[];
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
  checkinHistory: CheckinData[];
}

export interface CheckinConfirmationProps {
  checkinData: CheckinData;
  onSeeActionPlan: () => void;
}

export interface ActionPlanProps {
  weekPostpartum: number;
  onStartChat: () => void;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: string;
}

export interface NavigationProps {
  activeTab: 'home' | 'learn' | 'support' | 'me';
  onTabChange: (tab: 'home' | 'learn' | 'support' | 'me') => void;
}

export interface WellbeingChartData {
  date: string;
  rating: number;
}
