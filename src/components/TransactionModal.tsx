import React, { useState, useEffect } from 'react';
import { CheckCircle, Loader } from 'lucide-react';
import { TransactionResult } from '../types/user';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: TransactionResult;
}

export default function TransactionModal({ isOpen, onClose, transaction }: TransactionModalProps) {
  const [isProcessing, setIsProcessing] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsProcessing(true);
      setShowSuccess(false);
      
      const timer = setTimeout(() => {
        setIsProcessing(false);
        setShowSuccess(true);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in slide-in-from-bottom duration-300">
        
        {isProcessing ? (
          /* Processing State */
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader className="w-8 h-8 text-slate-600 animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Processing Transaction</h3>
            <p className="text-slate-600 text-sm">Please wait while we set up your savings plan...</p>
            
            <div className="mt-6">
              <div className="bg-slate-200 rounded-full h-2">
                <div className="bg-slate-600 h-2 rounded-full animate-pulse w-3/4"></div>
              </div>
            </div>
          </div>
        ) : (
          /* Success State */
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Transaction Successful!</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              You've been enrolled in the {transaction.planName} with {formatCurrency(transaction.amount)}.
            </p>
            
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
              <p className="text-emerald-800 text-sm">
                <span className="font-semibold">Next step:</span> Your savings will start earning interest immediately. You can track your progress in the savings dashboard.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-slate-800 text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-slate-900 hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}