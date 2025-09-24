import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, X, Sparkles, TrendingUp } from 'lucide-react';

interface SmartBannerProps {
  onApplyRecommendation: (recommendationId: string) => void;
  onViewRecommendation: () => void;
}

export default function SmartBanner({ onApplyRecommendation, onViewRecommendation }: SmartBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initial banner appearance after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Continuous loop management - handles auto-dismiss and reappearance
  useEffect(() => {
    // Clear any existing timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (isVisible && !isExpanded) {
      // Auto-dismiss after 30 seconds when visible and collapsed
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 30000);
    } else if (!isVisible && !isExpanded) {
      // Reappear after 60 seconds when not visible and not expanded
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, 60000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isVisible, isExpanded]);

  // Clear auto-dismiss timer when user interacts
  const clearAutoDismiss = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    clearAutoDismiss();
  };

  const handleExpand = () => {
    setIsExpanded(true);
    clearAutoDismiss();
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
    clearAutoDismiss();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe && !isExpanded) {
      handleExpand();
    } else if (isDownSwipe) {
      if (isExpanded) {
        handleCollapse();
      } else {
        handleDismiss();
      }
    }
  };

  const handleApplyNow = () => {
    onApplyRecommendation('flexible-savings');
    setIsVisible(false);
    clearAutoDismiss();
  };

  const handleViewMore = () => {
    onViewRecommendation();
    setIsVisible(false);
    clearAutoDismiss();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm z-40 pointer-events-none" />
      
      {/* Banner */}
      <div
        ref={bannerRef}
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          animation: isVisible ? 'slideUpBounce 0.6s ease-out' : undefined
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="mx-4 mb-4">
          <div className={`bg-white rounded-t-2xl shadow-2xl border border-slate-200 transition-all duration-300 ${
            isExpanded ? 'rounded-b-2xl' : 'rounded-b-none'
          }`}>
            
            {/* Collapsed State */}
            {!isExpanded && (
              <div 
                className="p-4 cursor-pointer"
                onClick={handleExpand}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-semibold text-sm">💡 We found ways to grow your money faster</p>
                      <p className="text-slate-500 text-xs">3 personalized opportunities available</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDismiss();
                      }}
                      className="p-1 hover:bg-slate-100 rounded-full transition-colors duration-200"
                    >
                      <X className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>
                
                {/* Swipe Indicator */}
                <div className="flex justify-center mt-2">
                  <div className="w-8 h-1 bg-slate-300 rounded-full" />
                </div>
              </div>
            )}

            {/* Expanded State */}
            {isExpanded && (
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-bold text-lg">High-Yield Savings Account</h3>
                      <p className="text-emerald-600 text-sm font-medium">Earn 12% APY on your balance</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCollapse}
                      className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200"
                    >
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    </button>
                    <button
                      onClick={handleDismiss}
                      className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200"
                    >
                      <X className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <p className="text-slate-700 text-sm leading-relaxed mb-3">
                    Based on your recent ₦15,000 deposit and excellent financial health score, 
                    you could earn an extra ₦1,800 annually with our flexible savings plan.
                  </p>
                  
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span className="text-emerald-800 text-xs font-medium">Smart Recommendation</span>
                    </div>
                    <p className="text-emerald-700 text-xs">
                      Start with ₦5,000 minimum • No lock-in period • Withdraw anytime
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={handleViewMore}
                    className="flex-1 bg-slate-100 text-slate-700 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-slate-200"
                  >
                    Tell me more
                  </button>
                  <button
                    onClick={handleApplyNow}
                    className="flex-1 bg-slate-800 text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-slate-900 hover:shadow-lg transform hover:scale-105 active:scale-95"
                  >
                    Apply Now
                  </button>
                </div>

                {/* Swipe Indicator */}
                <div className="flex justify-center mt-4">
                  <div className="w-8 h-1 bg-slate-300 rounded-full" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUpBounce {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          70% {
            transform: translateY(-10px);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}