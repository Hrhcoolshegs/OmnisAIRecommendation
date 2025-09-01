import React from 'react';
import { Home, CreditCard, Bell, Settings, PieChart } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'insights', label: 'Insights', icon: PieChart },
    { id: 'notifications', label: 'Alerts', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 z-40">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-slate-800 bg-slate-100' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-slate-800' : 'text-slate-500'}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-slate-800' : 'text-slate-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}