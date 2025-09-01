import React from 'react';
import { User, Shield, Bell, CreditCard, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

export default function SettingsTab() {
  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Profile Information', action: 'edit' },
        { icon: Shield, label: 'Security & Privacy', action: 'navigate' },
        { icon: CreditCard, label: 'Payment Methods', action: 'navigate' }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', action: 'navigate' },
        { icon: HelpCircle, label: 'Help & Support', action: 'navigate' }
      ]
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Profile Summary */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl font-bold">
            OL
          </div>
          <div>
            <h3 className="text-xl font-bold">Oluwasegun Lawrence</h3>
            <p className="text-blue-100">SME Owner</p>
            <p className="text-blue-200 text-sm">Member since Jan 2024</p>
          </div>
        </div>
      </div>

      {/* Settings Groups */}
      {settingsGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">{group.title}</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            {group.items.map((item, itemIndex) => {
              const Icon = item.icon;
              return (
                <button
                  key={itemIndex}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <span className="font-medium text-gray-900">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* App Info */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">App Information</h3>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Version</span>
            <span className="font-medium">2.1.0</span>
          </div>
          <div className="flex justify-between">
            <span>Last Updated</span>
            <span className="font-medium">Jan 15, 2024</span>
          </div>
          <div className="flex justify-between">
            <span>Build</span>
            <span className="font-medium">2024.01.15</span>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button className="w-full bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-center space-x-2 text-red-600 font-semibold hover:bg-red-100 transition-colors duration-200">
        <LogOut className="w-5 h-5" />
        <span>Sign Out</span>
      </button>
    </div>
  );
}