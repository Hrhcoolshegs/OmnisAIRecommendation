import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitFeedback: (feedback: 'yes' | 'no', comment?: string) => void;
}

export default function FeedbackModal({ isOpen, onClose, onSubmitFeedback }: FeedbackModalProps) {
  const [selectedFeedback, setSelectedFeedback] = useState<'yes' | 'no' | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (selectedFeedback) {
      onSubmitFeedback(selectedFeedback, comment);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSelectedFeedback(null);
        setComment('');
        setSubmitted(false);
      }, 2000);
    }
  };

  const getFeedbackMessage = () => {
    if (selectedFeedback === 'yes') {
      return "Thank you for your feedback! We're glad the recommendation was helpful.";
    } else {
      return "Sorry to hear that! We'll improve future recommendations.";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in slide-in-from-bottom duration-300">
        
        {!submitted ? (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-slate-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Help Us Improve</h3>
              <p className="text-slate-600 text-sm">Was this recommendation helpful?</p>
            </div>

            {/* Feedback Options */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => setSelectedFeedback('yes')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedFeedback === 'yes' 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-slate-200 hover:border-emerald-300'
                }`}
              >
                <ThumbsUp className={`w-6 h-6 mx-auto mb-2 ${
                  selectedFeedback === 'yes' ? 'text-emerald-600' : 'text-slate-400'
                }`} />
                <p className={`text-sm font-medium ${
                  selectedFeedback === 'yes' ? 'text-emerald-700' : 'text-slate-600'
                }`}>
                  Yes, helpful
                </p>
              </button>

              <button
                onClick={() => setSelectedFeedback('no')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedFeedback === 'no' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-slate-200 hover:border-red-300'
                }`}
              >
                <ThumbsDown className={`w-6 h-6 mx-auto mb-2 ${
                  selectedFeedback === 'no' ? 'text-red-600' : 'text-slate-400'
                }`} />
                <p className={`text-sm font-medium ${
                  selectedFeedback === 'no' ? 'text-red-700' : 'text-slate-600'
                }`}>
                  Not helpful
                </p>
              </button>
            </div>

            {/* Optional Comment */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Additional comments (optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us more about your experience..."
                className="w-full p-3 border border-slate-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 bg-slate-100 text-slate-700 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-slate-200"
              >
                Skip
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedFeedback}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  selectedFeedback
                    ? 'bg-slate-800 text-white hover:bg-slate-900 hover:shadow-lg transform hover:scale-105 active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        ) : (
          /* Thank You State */
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Thank You!</h3>
            <p className="text-slate-700 leading-relaxed">
              {getFeedbackMessage()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}