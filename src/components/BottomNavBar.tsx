import React from 'react';
import { Home, BookOpen, FileText, Activity, Award } from 'lucide-react';
import { sound } from '../utils/audio';

export type NavTab = 'home' | 'topics' | 'precise' | 'simulations' | 'quiz' | 'cheatsheet';

interface BottomNavBarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  savedCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  savedCount,
}) => {
  const tabs = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'topics' as NavTab, label: 'Questions', icon: BookOpen },
    { id: 'precise' as NavTab, label: 'Precise', icon: FileText },
    { id: 'simulations' as NavTab, label: 'Labs', icon: Activity },
    { id: 'quiz' as NavTab, label: '20-Q Drill', icon: Award },
  ];

  return (
    <nav className="sticky bottom-0 z-40 bg-slate-950/85 backdrop-blur-2xl border-t border-white/10 px-2 py-1.5 select-none">
      <div className="grid grid-cols-5 items-center max-w-lg mx-auto h-14">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                onTabChange(tab.id);
              }}
              className="min-h-[48px] flex flex-col items-center justify-center relative transition-all group"
            >
              <div
                className={`p-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-tr from-cyan-500/30 to-blue-500/20 text-cyan-300 shadow-md shadow-cyan-500/20 border border-cyan-400/40'
                    : 'text-slate-400 group-hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              </div>
              <span
                className={`text-[9px] sm:text-[10px] font-medium tracking-tight mt-0.5 transition-colors whitespace-nowrap ${
                  isActive ? 'text-cyan-300 font-semibold' : 'text-slate-400'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 absolute bottom-0 shadow-sm shadow-cyan-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
