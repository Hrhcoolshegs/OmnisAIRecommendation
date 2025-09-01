import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Shield, Zap, Target } from 'lucide-react';
import { User } from '../types/user';

interface RecommendationBannerProps {
  user: User;
  onApplyRecommendation: (recommendationId: string) => void;
}

export default function RecommendationBanner({ user, onApplyRecommendation }: RecommendationBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const recommendations = [
    {
      id: 'flexible-savings',
      title: 'Flexible Savings Plan',
      description: `Start saving with 12% annual interest. Based on your ₦${user.recentTransaction.amount.toLocaleString()} deposit, you're ready to grow your wealth!`,
      cta: 'Start Saving',
      gradient: 'from-emerald-600 to-emerald-700',
      icon: TrendingUp,
      amount: '₦5,000 minimum'
    },
    {
      id: 'investment-plan',
      title: 'Smart Investment Portfolio',
      description: `With your ₦${user.monthlyIncome.toLocaleString()} monthly income, diversify into our curated investment portfolio for higher returns.`,
      cta: 'Invest Now',
      gradient: 'from-blue-600 to-blue-700',
      icon: Target,
      amount: '₦10,000 minimum'
    },
    {
      id: 'insurance-plan',
      title: 'Life Protection Plan',
      description: `Secure your family's future. Protect your income with comprehensive life insurance coverage.`,
      cta: 'Get Protected',
      gradient: 'from-indigo-600 to-indigo-700',
      icon: Shield,
      amount: '₦2,000/month'
    },
    {
      id: 'quick-loan',
      title: 'Instant Business Loan',
      description: `Expand your business with our quick approval loans. Get up to 5x your monthly income instantly.`,
      cta: 'Apply for Loan',
      gradient: 'from-slate-700 to-slate-800',
      icon: Zap,
      amount: 'Up to ₦750,000'
    }
  ];

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0]?.clientWidth || 0;
      const gap = 16; // 1rem gap
      scrollRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth'
      });
    }
    setCurrentIndex(index);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0]?.clientWidth || 0;
      const gap = 16;
      const scrollLeft = scrollRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900">Recommended for You</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => scrollToIndex(Math.max(0, currentIndex - 1))}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className={`w-4 h-4 ${currentIndex === 0 ? 'text-slate-400' : 'text-slate-600'}`} />
          </button>
          <button
            onClick={() => scrollToIndex(Math.min(recommendations.length - 1, currentIndex + 1))}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
            disabled={currentIndex === recommendations.length - 1}
          >
            <ChevronRight className={`w-4 h-4 ${currentIndex === recommendations.length - 1 ? 'text-slate-400' : 'text-slate-600'}`} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;
          return (
            <div
              key={rec.id}
              className={`min-w-[280px] bg-gradient-to-br ${rec.gradient} rounded-2xl p-6 text-white shadow-lg transform transition-all duration-300 hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  {rec.amount}
                </span>
              </div>
              
              <h4 className="text-xl font-bold mb-2">{rec.title}</h4>
              <p className="text-white text-opacity-90 text-sm leading-relaxed mb-4">
                {rec.description}
              </p>
              
              <button
                onClick={() => onApplyRecommendation(rec.id)}
                className="w-full bg-white text-slate-900 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-slate-50 transform hover:scale-105 active:scale-95"
              >
                {rec.cta}
              </button>
            </div>
          );
        })}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {recommendations.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-slate-800 w-6' : 'bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}