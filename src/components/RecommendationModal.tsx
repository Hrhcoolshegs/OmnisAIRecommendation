import React from 'react';
import { X, CheckCircle, TrendingUp, Shield, Clock } from 'lucide-react';
import { Recommendation } from '../types/user';

interface RecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation: Recommendation;
  onApply: () => void;
  tokenId?: string;
  recommendationId?: string;
}

export default function RecommendationModal({ 
  isOpen, 
  onClose, 
  recommendation, 
  onApply,
  tokenId,
  recommendationId
}: RecommendationModalProps) {
  if (!isOpen) return null;

  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;
  const benefitIcons = [TrendingUp, CheckCircle, Shield, Clock, CheckCircle];

  // Function to track interactions
  const trackInteraction = async (action: 'clicked' | 'converted') => {
    if (!tokenId || !recommendationId) {
      console.warn('Missing tracking data:', { tokenId, recommendationId });
      return;
    }

    try {
      const trackingUrl = `http://g488k00w480gw0ocwkwowo4g.138.197.129.114.sslip.io:8046/api/v1/recommend/interaction?token_id=${encodeURIComponent(tokenId)}&recommendation_id=${recommendationId}&action=${action}`;
      
      const response = await fetch(trackingUrl, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: '',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Successfully tracked ${action}:`, data);
    } catch (error) {
      console.error(`Error tracking ${action}:`, error);
    }
  };

  // Handle "Apply Now" button click - tracks "converted"
  const handleApplyClick = async () => {
    await trackInteraction('converted');
    onApply();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{recommendation.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            {recommendation.context}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Plan Details</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              {recommendation.description}
            </p>

            <div className="bg-slate-50 border-l-4 border-slate-800 p-4 rounded-r-lg">
              <p className="text-sm text-slate-800">
                <span className="font-semibold">Minimum Amount:</span> {formatCurrency(recommendation.minimumAmount)}
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-slate-900 mb-3">Key Benefits</h4>
            <div className="space-y-3">
              {recommendation.benefits.map((benefit, index) => {
                const Icon = benefitIcons[index % benefitIcons.length];
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                      <Icon className="w-4 h-4 text-slate-600" />
                    </div>
                    <p className="text-slate-700 text-sm">{benefit}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 bg-slate-100 text-slate-700 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-slate-200"
            >
              Maybe Later
            </button>
            <button
              onClick={handleApplyClick}
              className="flex-1 bg-slate-800 text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-slate-900 hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}