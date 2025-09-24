import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Shield, Zap, Target, DollarSign, PiggyBank } from 'lucide-react';
import { User } from '../types/user';

interface RecommendationBannerProps {
  user: User;
  onApplyRecommendation: (recommendationId: string) => void;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  cta: string;
  gradient: string;
  icon: React.ComponentType<{ className?: string }>;
  amount: string;
}

interface ParsedData {
  transactions?: {
    billPayments: number;
    p2pTransfers: number;
    monthlyVolume: number;
    merchantPayments: number;
    totalTransactions: number;
  };
  investments?: Array<{
    units?: number;
    amount?: number;
    returns?: {
      absoluteReturn: number;
      percentageReturn: number;
    };
    unitPrice?: number;
    productName?: string;
    productType: string;
    currentValue: number;
    interestRate?: number;
    investmentId: string;
    maturityDate?: string;
    purchaseDate?: string;
  }>;
  balance?: {
    currency: string;
    lastUpdated: string;
    currentBalance: number;
  };
  productOffered?: {
    productId: string;
    productName: string;
    interestRate: number;
    minimumAmount: number;
  };
  applicationData?: {
    tenure: number;
    purpose: string;
    interestRate: number;
    approvedAmount: number;
    applicationDate: string;
    requestedAmount: number;
  };
}

export default function RecommendationBanner({ user, onApplyRecommendation }: RecommendationBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const userId = "7ba341e4-62f7-4f51-a1fa-51cad91b27be-1750752402300";
  const apiUrl = `http://g488k00w480gw0ocwkwowo4g.138.197.129.114.sslip.io:8046/api/v1/recommend?user_id=${userId}&top_k=5`;

  const parseProductRecommended = (productRecommended: string[]): ParsedData => {
    const parsed: ParsedData = {};
    
    productRecommended.forEach((item) => {
      const colonIndex = item.indexOf(':');
      if (colonIndex === -1) return;
      
      // Extract the key (remove leading numbers and dots)
      const key = item.substring(0, colonIndex).trim().replace(/^\d+\.\s*/, '');
      const valueStr = item.substring(colonIndex + 1).trim();
      
      try {
        const parsedValue = JSON.parse(valueStr);
        (parsed as any)[key] = parsedValue;
      } catch (e) {
        console.error(`Failed to parse ${key}:`, e);
      }
    });
    
    return parsed;
  };

  const createRecommendationsFromData = (data: ParsedData): Recommendation[] => {
    const recommendations: Recommendation[] = [];

    // Premium Savings Account recommendation
    if (data.productOffered && data.balance) {
      recommendations.push({
        id: `savings-${data.productOffered.productId}`,
        title: data.productOffered.productName,
        description: `Earn ${data.productOffered.interestRate}% annual interest on your savings. With your current balance of ₦${data.balance.currentBalance.toLocaleString()}, this premium account offers better returns. Minimum deposit required: ₦${data.productOffered.minimumAmount.toLocaleString()}.`,
        cta: 'Open Account',
        gradient: 'from-emerald-500 to-emerald-600',
        icon: PiggyBank,
        amount: `${data.productOffered.interestRate}% APY`
      });
    }

    // Investment recommendations based on existing investments
    if (data.investments && data.investments.length > 0) {
      const totalInvestmentValue = data.investments.reduce((sum, inv) => sum + inv.currentValue, 0);
      
      // Group investments by type for better recommendations
      const mutualFunds = data.investments.filter(inv => inv.productType === 'Mutual_Fund');
      const fixedDeposits = data.investments.filter(inv => inv.productType === 'Fixed_Deposit');

      // Mutual Fund recommendations
      if (mutualFunds.length > 0) {
        const bestPerformer = mutualFunds.reduce((best, current) => 
          (current.returns?.percentageReturn || 0) > (best.returns?.percentageReturn || 0) ? current : best
        );

        recommendations.push({
          id: `investment-${bestPerformer.investmentId}`,
          title: `${bestPerformer.productName} - High Performer`,
          description: `Your ${bestPerformer.productName} investment of ₦${bestPerformer.currentValue.toLocaleString()} is generating excellent ${bestPerformer.returns?.percentageReturn}% returns. Consider increasing your investment to maximize growth potential.`,
          cta: 'Invest More',
          gradient: 'from-blue-500 to-blue-600',
          icon: TrendingUp,
          amount: `₦${bestPerformer.currentValue.toLocaleString()} invested`
        });
      }

      // Fixed Deposit recommendations
      if (fixedDeposits.length > 0) {
        const nearestMaturity = fixedDeposits.reduce((nearest, current) => {
          const currentDate = current.maturityDate ? new Date(current.maturityDate) : new Date('2099-12-31');
          const nearestDate = nearest.maturityDate ? new Date(nearest.maturityDate) : new Date('2099-12-31');
          return currentDate < nearestDate ? current : nearest;
        });

        if (nearestMaturity.maturityDate) {
          const maturityDate = new Date(nearestMaturity.maturityDate);
          const monthsToMaturity = Math.ceil((maturityDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30));
          
          recommendations.push({
            id: `fd-${nearestMaturity.investmentId}`,
            title: 'Fixed Deposit Strategy',
            description: `Your ₦${nearestMaturity.currentValue.toLocaleString()} fixed deposit at ${nearestMaturity.interestRate}% interest matures in ${monthsToMaturity} months. Plan your reinvestment strategy or explore higher-yield options.`,
            cta: 'Plan Renewal',
            gradient: 'from-indigo-500 to-indigo-600',
            icon: Shield,
            amount: `${nearestMaturity.interestRate}% interest`
          });
        }
      }

      // Portfolio diversification recommendation
      if (totalInvestmentValue > 0) {
        recommendations.push({
          id: 'portfolio-diversify',
          title: 'Portfolio Diversification',
          description: `Your total investment portfolio worth ₦${totalInvestmentValue.toLocaleString()} across ${data.investments.length} products shows good diversification. Consider rebalancing based on current market conditions.`,
          cta: 'Review Portfolio',
          gradient: 'from-purple-500 to-purple-600',
          icon: Target,
          amount: `${data.investments.length} products`
        });
      }
    }

    // Business Loan recommendation
    if (data.applicationData) {
      const { purpose, requestedAmount, approvedAmount, interestRate, tenure } = data.applicationData;
      
      recommendations.push({
        id: `loan-${Date.now()}`,
        title: `${purpose.replace(/_/g, ' ')} Loan`,
        description: `You've been pre-approved for ₦${approvedAmount.toLocaleString()} at ${interestRate}% interest over ${tenure} months. Your requested amount was ₦${requestedAmount.toLocaleString()}. Complete your application to access funds.`,
        cta: 'Complete Application',
        gradient: 'from-slate-600 to-slate-700',
        icon: DollarSign,
        amount: `₦${approvedAmount.toLocaleString()} approved`
      });
    }

    // Transaction-based recommendations
    if (data.transactions && data.balance) {
      const { monthlyVolume, totalTransactions } = data.transactions;
      const avgTransactionSize = monthlyVolume / totalTransactions;
      
      if (avgTransactionSize > 10000) { // High-value transactions
        recommendations.push({
          id: 'premium-account',
          title: 'Premium Transaction Account',
          description: `With ₦${monthlyVolume.toLocaleString()} monthly transaction volume across ${totalTransactions} transactions, upgrade to our premium account for better rates and exclusive benefits.`,
          cta: 'Upgrade Account',
          gradient: 'from-amber-500 to-amber-600',
          icon: Zap,
          amount: `₦${avgTransactionSize.toLocaleString()} avg transaction`
        });
      }
    }

    return recommendations;
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.recommendations?.status === 'success' && 
            data.recommendations.user_data_found && 
            data.recommendations.product_recommended?.length > 0) {
          
          const parsedData = parseProductRecommended(data.recommendations.product_recommended);
          const dynamicRecommendations = createRecommendationsFromData(parsedData);
          
          if (dynamicRecommendations.length > 0) {
            setRecommendations(dynamicRecommendations);
          } else {
            setError('No recommendations could be generated from the available data.');
          }
        } else {
          setError('No user data found or no recommendations available.');
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setError('Failed to load recommendations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [apiUrl]);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current && recommendations.length > 0) {
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
    if (scrollRef.current && recommendations.length > 0) {
      const cardWidth = scrollRef.current.children[0]?.clientWidth || 0;
      const gap = 16;
      const scrollLeft = scrollRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentIndex(Math.min(newIndex, recommendations.length - 1));
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [recommendations]);

  // Loading state
  if (loading) {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900">Recommended for You</h3>
        </div>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="min-w-[280px] bg-gray-200 rounded-2xl p-6 animate-pulse">
              <div className="w-12 h-12 bg-gray-300 rounded-full mb-4"></div>
              <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded mb-4 w-full"></div>
              <div className="h-10 bg-gray-300 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900">Recommended for You</h3>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <h4 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Recommendations</h4>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // No recommendations state
  if (recommendations.length === 0) {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900">Recommended for You</h3>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">No Recommendations Available</h4>
            <p className="text-gray-600 text-sm">Complete more transactions to receive personalized recommendations.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900">Recommended for You</h3>
        {recommendations.length > 1 && (
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
        )}
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {recommendations.map((rec) => {
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

      {/* Dots Indicator - only show if more than 1 recommendation */}
      {recommendations.length > 1 && (
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
      )}
    </div>
  );
}