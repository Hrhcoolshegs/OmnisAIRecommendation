import React from 'react';
import { User, Calendar, MapPin, HeartPulse, TrendingUp, Target } from 'lucide-react';
import { User as UserType } from '../types/user';

interface EnhancedUserProfileProps {
  user: UserType;
}

export default function EnhancedUserProfile({ user }: EnhancedUserProfileProps) {
  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;
  const getTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return hours < 24 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`;
  };

  const savingsGoal = 50000;
  const currentSavings = 5000;
  const savingsProgress = (currentSavings / savingsGoal) * 100;
  const financialHealthScore = 99; // Based on savings rate, income stability, etc.

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getHealthScoreTextColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };
  return (
    <div className="space-y-4 mb-6">
      {/* Account Balance Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-slate-300 text-sm font-medium">Total Balance</p>
            <h2 className="text-3xl font-bold">{formatCurrency(user.accountBalance)}</h2>
          </div>
          <div className={`w-16 h-16 ${getHealthScoreColor(financialHealthScore)} bg-opacity-20 rounded-full flex flex-col items-center justify-center border-2 border-white border-opacity-30`}>
            <HeartPulse className="w-4 h-4 text-white mb-0.5 animate-pulse" />
            <span className="text-white text-xs font-bold">{financialHealthScore}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400 text-sm font-medium">
            +{formatCurrency(user.recentTransaction.amount)} {getTimeAgo(user.recentTransaction.timestamp)}
          </span>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-700 text-xl font-semibold">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${getHealthScoreColor(financialHealthScore)}`} />
                <span className={`text-sm font-medium ${getHealthScoreTextColor(financialHealthScore)}`}>
                  Financial Health: {financialHealthScore}/100
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Monthly Income</span>
            </div>
            <p className="text-lg font-bold text-slate-900">{formatCurrency(user.monthlyIncome)}</p>
            <p className="text-xs text-slate-500">Verified</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Savings Rate</span>
            </div>
            <p className="text-lg font-bold text-slate-900">15%</p>
            <p className="text-xs text-slate-500">Above Average</p>
          </div>
        </div>

        {/* Savings Goal Progress */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Savings Goal Progress</span>
            </div>
            <span className="text-sm font-bold text-slate-900">
              {formatCurrency(currentSavings)} / {formatCurrency(savingsGoal)}
            </span>
          </div>
          
          <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
            <div 
              className="bg-slate-800 h-3 rounded-full transition-all duration-500"
              style={{ width: `${savingsProgress}%` }}
            />
          </div>
          
          <p className="text-xs text-slate-500">
            {savingsProgress.toFixed(1)}% complete • Keep saving to reach your goal!
          </p>
        </div>
      </div>

      {/* Cash Flow Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Cash Flow Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">Monthly Inflow</span>
            </div>
            <p className="text-lg font-bold text-emerald-900">{formatCurrency(750000)}</p>
            <p className="text-xs text-emerald-600">+12% growth</p>
          </div>

          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
              <span className="text-sm font-medium text-red-700">Monthly Outflow</span>
            </div>
            <p className="text-lg font-bold text-red-900">{formatCurrency(85000)}</p>
            <p className="text-xs text-red-600">-8% reduction</p>
          </div>
        </div>
      </div>

      {/* Safe to Spend This Week */}
      <div className="bg-emerald-50 rounded-2xl shadow-sm border border-emerald-100 p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <Target className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-emerald-900">Safe to Spend This Week</h3>
            <p className="text-sm text-emerald-700">AI-recommended spending limit</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-emerald-200">
          <p className="text-3xl font-bold text-emerald-900 mb-1">{formatCurrency(70000)}</p>
          <p className="text-sm text-emerald-600">Based on your income and savings goals</p>
        </div>
      </div>

      {/* Financial Tip */}
      <div className="bg-slate-50 border-l-4 border-slate-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center mt-0.5">
            <TrendingUp className="w-4 h-4 text-slate-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-1">Smart Tip</h4>
            <p className="text-sm text-slate-600">
              Based on your recent deposit, consider setting up automatic savings to reach your ₦50,000 goal faster. 
              Save ₦7,500 monthly to achieve it in 6 months!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}