import React from 'react';
import { Bell, CheckCircle, AlertCircle, Info, TrendingUp } from 'lucide-react';

export default function NotificationsTab() {
  const notifications = [
    {
      id: '1',
      type: 'success',
      title: 'Savings Plan Activated',
      message: 'Your Flexible Savings Plan is now active and earning 12% interest.',
      time: '2 hours ago',
      read: false,
      icon: CheckCircle,
      color: 'green'
    },
    {
      id: '2',
      type: 'info',
      title: 'Monthly Statement Ready',
      message: 'Your January statement is now available for download.',
      time: '1 day ago',
      read: false,
      icon: Info,
      color: 'blue'
    },
    {
      id: '3',
      type: 'alert',
      title: 'Goal Reminder',
      message: 'You\'re 10% towards your ₦50,000 savings goal. Keep it up!',
      time: '2 days ago',
      read: true,
      icon: TrendingUp,
      color: 'orange'
    },
    {
      id: '4',
      type: 'warning',
      title: 'Spending Alert',
      message: 'You\'ve spent 75% of your monthly budget on dining.',
      time: '3 days ago',
      read: true,
      icon: AlertCircle,
      color: 'red'
    }
  ];

  return (
    <div className="space-y-4 pb-20">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
            Mark all as read
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div 
                key={notification.id} 
                className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                  notification.read 
                    ? 'bg-gray-50 border-gray-200' 
                    : 'bg-white border-blue-200 shadow-sm'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    notification.color === 'green' ? 'bg-green-100' :
                    notification.color === 'blue' ? 'bg-blue-100' :
                    notification.color === 'orange' ? 'bg-orange-100' :
                    'bg-red-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      notification.color === 'green' ? 'text-green-600' :
                      notification.color === 'blue' ? 'text-blue-600' :
                      notification.color === 'orange' ? 'text-orange-600' :
                      'text-red-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-semibold ${
                        notification.read ? 'text-gray-700' : 'text-gray-900'
                      }`}>
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </div>
                    <p className={`text-sm ${
                      notification.read ? 'text-gray-500' : 'text-gray-700'
                    }`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Notification Settings</h3>
        
        <div className="space-y-4">
          {[
            { label: 'Transaction Alerts', enabled: true },
            { label: 'Savings Milestones', enabled: true },
            { label: 'Budget Warnings', enabled: false },
            { label: 'Investment Updates', enabled: true },
            { label: 'Promotional Offers', enabled: false }
          ].map((setting, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <span className="text-gray-700 font-medium">{setting.label}</span>
              <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                setting.enabled ? 'bg-blue-600' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                  setting.enabled ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}