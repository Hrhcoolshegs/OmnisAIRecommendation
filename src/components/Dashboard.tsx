import React from 'react';
import { PiggyBank, TrendingUp, Calendar, Target } from 'lucide-react';

export default function Dashboard() {
  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Financial Dashboard</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
          <div className="flex items-center space-x-2 mb-2">
            <PiggyBank className="w-5 h-5 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Total Savings</span>
          </div>
          <p className="text-xl font-bold text-slate-900">{formatCurrency(5000)}</p>
          <p className="text-xs text-emerald-600">+{formatCurrency(5000)} today</p>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Interest Rate</span>
          </div>
          <p className="text-xl font-bold text-slate-900">12%</p>
          <p className="text-xs text-slate-500">Per annum</p>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-5 h-5 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Duration</span>
          </div>
          <p className="text-xl font-bold text-slate-900">Flexible</p>
          <p className="text-xs text-slate-500">No lock-in</p>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Goal Progress</span>
          </div>
          <p className="text-xl font-bold text-slate-900">10%</p>
          <p className="text-xs text-slate-500">{formatCurrency(5000)} of {formatCurrency(50000)} target</p>
        </div>
      </div>

      <div className="mt-4 bg-slate-50 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-slate-800 mb-2">Recent Activity</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Savings Plan Enrollment</span>
            <span className="text-sm font-medium text-emerald-600">+{formatCurrency(5000)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Account Deposit</span>
            <span className="text-sm font-medium text-emerald-600">+{formatCurrency(15000)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}