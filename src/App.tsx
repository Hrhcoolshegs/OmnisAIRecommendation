import React, { useState } from 'react';
import EnhancedUserProfile from './components/EnhancedUserProfile';
import RecommendationBanner from './components/RecommendationBanner';
import TransactionHistory from './components/TransactionHistory';
import BottomNavigation from './components/BottomNavigation';
import InsightsTab from './components/InsightsTab';
import NotificationsTab from './components/NotificationsTab';
import SettingsTab from './components/SettingsTab';
import ChatBubble from './components/ChatBubble';
import RecommendationModal from './components/RecommendationModal';
import TransactionModal from './components/TransactionModal';
import FeedbackModal from './components/FeedbackModal';
import Dashboard from './components/Dashboard';
import SmartBanner from './components/SmartBanner';
import { dummyUser, flexibleSavingsRecommendation } from './data/userData';
import { TransactionResult } from './types/user';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [transactionResult, setTransactionResult] = useState<TransactionResult>({
    success: true,
    message: "Transaction Successful!",
    amount: 5000,
    planName: "Flexible Savings Plan"
  });
  const [feedback, setFeedback] = useState<{
    rating: 'yes' | 'no';
    comment?: string;
  } | null>(null);

  const handleViewRecommendation = () => {
    setShowRecommendationModal(true);
  };

  const handleApplyRecommendation = (recommendationId: string) => {
    setShowRecommendationModal(true);
  };

  const handleApplyNow = () => {
    setShowRecommendationModal(false);
    setShowTransactionModal(true);
  };

  const handleTransactionComplete = () => {
    setShowTransactionModal(false);
    setShowFeedbackModal(true);
    setShowDashboard(true);
  };

  const handleSubmitFeedback = (rating: 'yes' | 'no', comment?: string) => {
    setFeedback({ rating, comment });
    setShowFeedbackModal(false);
  };

  const chatMessage = `Based on your recent deposit of ₦${dummyUser.recentTransaction.amount.toLocaleString()}, we recommend a Flexible Savings Plan. Want to learn more?`;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <EnhancedUserProfile user={dummyUser} />
            <RecommendationBanner 
              user={dummyUser} 
              onApplyRecommendation={handleApplyRecommendation} 
            />
            {showDashboard && <Dashboard />}
            <TransactionHistory />
          </>
        );
      case 'transactions':
        return <TransactionHistory />;
      case 'insights':
        return <InsightsTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto">
        {/* Tab Content */}
        <div className="px-4 py-6">
          {renderTabContent()}
        </div>

        {/* Feedback Success Message */}
        {feedback && (
          <div className="mx-4 mb-6 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 border-l-4 border-l-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Feedback Received</h3>
            <p className="text-slate-700 mb-2">
              {feedback.rating === 'yes' 
                ? "Thank you for your positive feedback! We're glad the recommendation was helpful."
                : "Thank you for your feedback. We'll use this to improve future recommendations."
              }
            </p>
            {feedback.comment && (
              <div className="bg-slate-50 rounded-lg p-3 mt-3">
                <p className="text-sm text-slate-700">Your comment: "{feedback.comment}"</p>
              </div>
            )}
          </div>
        )}

        {/* Floating Chat Bubble */}
        {activeTab === 'home' && (
          <ChatBubble
            message={chatMessage}
            onViewRecommendation={handleViewRecommendation}
          />
        )}

        {/* Smart Banner Notification */}
        <SmartBanner
          onApplyRecommendation={handleApplyRecommendation}
          onViewRecommendation={handleViewRecommendation}
        />

        {/* Bottom Navigation */}
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Modals */}
        <RecommendationModal
          isOpen={showRecommendationModal}
          onClose={() => setShowRecommendationModal(false)}
          recommendation={flexibleSavingsRecommendation}
          onApply={handleApplyNow}
        />

        <TransactionModal
          isOpen={showTransactionModal}
          onClose={handleTransactionComplete}
          transaction={transactionResult}
        />

        <FeedbackModal
          isOpen={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
          onSubmitFeedback={handleSubmitFeedback}
        />
      </div>
    </div>
  );
}