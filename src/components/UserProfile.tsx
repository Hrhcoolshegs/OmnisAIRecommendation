import React from 'react';
import { User, Calendar, MapPin, DollarSign } from 'lucide-react';
import { User as UserType } from '../types/user';

interface UserProfileProps {
  user: UserType;
}

export default function UserProfile({ user }: UserProfileProps) {
  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;
  const getTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return hours < 24 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.occupation}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(user.accountBalance)}</p>
          <p className="text-sm text-gray-500">Account Balance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Recent Activity</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            +{formatCurrency(user.recentTransaction.amount)}
          </p>
          <p className="text-xs text-gray-500">
            {getTimeAgo(user.recentTransaction.timestamp)}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Monthly Income</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(user.monthlyIncome)}
          </p>
          <p className="text-xs text-gray-500">Verified</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Profile</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">{user.age} years</p>
          <p className="text-xs text-gray-500">{user.demographics.nationality}</p>
        </div>
      </div>
    </div>
  );
}