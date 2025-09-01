import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Sparkles, Send, User, Bot } from 'lucide-react';

interface ChatBubbleProps {
  message: string;
  onViewRecommendation: () => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  productInfo?: {
    productName: string;
    productId: string;
  };
}

export default function ChatBubble({ message, onViewRecommendation }: ChatBubbleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');

  const templateQuestions = [
    "How can I improve my financial health score?",
    "What savings products do you recommend for me?",
    "How much should I be saving monthly?",
    "What investment options are available?",
    "How can I reach my ₦50,000 savings goal faster?",
    "What insurance products do I need?"
  ];

  const responses: { [key: string]: string } = {
    "financial health": "Great question! Your current financial health score is 99/100 - excellent! To maintain this, continue your 15% savings rate and consider diversifying with our Smart Investment Portfolio. I also recommend setting up automatic transfers to make saving effortless.|PRODUCT:Smart Investment Portfolio|ID:investment-plan",
    
    "savings products": "Based on your profile, I recommend three products: 1) Flexible Savings Plan (12% interest, no lock-in) - perfect for your emergency fund, 2) Fixed Deposit (15% interest, 6-month term) for higher returns, and 3) Target Savings for your ₦50,000 goal with automatic monthly deductions.|PRODUCT:Flexible Savings Plan|ID:flexible-savings",
    
    "saving monthly": "With your ₦850,000 monthly income, I recommend saving ₦127,500 (15% - which you're already doing!). To reach your ₦50,000 goal in 4 months, save an additional ₦7,500 monthly. This keeps you well within your safe spending limit of ₦70,000 weekly.|PRODUCT:Target Savings Plan|ID:target-savings",
    
    "investment": "Perfect timing! With your stable income, consider our Smart Investment Portfolio: 40% government bonds (low risk), 35% blue-chip stocks (medium risk), 20% mutual funds (diversified), and 5% tech stocks (growth potential). Minimum investment: ₦10,000. Expected annual return: 18-22%.|PRODUCT:Smart Investment Portfolio|ID:investment-plan",
    
    "savings goal": "Excellent goal! To reach ₦50,000 faster: 1) Increase monthly savings by ₦2,500 (reach goal in 3 months), 2) Use our Round-Up feature to save spare change, 3) Set up automatic transfers on salary day, 4) Consider our High-Yield Savings at 15% interest. You're already 10% there!|PRODUCT:High-Yield Savings|ID:high-yield-savings",
    
    "insurance": "Smart thinking! I recommend: 1) Life Insurance (₦2,000/month premium, ₦5M coverage) - essential for SME owners, 2) Health Insurance (₦1,500/month, comprehensive coverage), 3) Business Protection Insurance for your SME. Total monthly cost: ₦3,500 - well within your budget.|PRODUCT:Life Insurance Plan|ID:life-insurance"
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showChatPanel && messages.length === 0) {
      // Add introduction message when chat panel opens
      const introMessage: ChatMessage = {
        id: '1',
        type: 'bot',
        content: "Hi Oluwasegun! 👋 I am OMNIS, your AI financial concierge. I've been analyzing your financial profile and I'm impressed - you're doing great with a 99/100 health score! I'm here to help you with savings, investments, financial planning, and reaching your goals. What would you like to know?",
        timestamp: new Date()
      };
      setMessages([introMessage]);
    }
  }, [showChatPanel]);

  if (!isVisible) return null;

  const handleMaybeLater = () => {
    setIsExpanded(false);
    setShowChatPanel(true);
  };

  const handleViewRecommendation = () => {
    onViewRecommendation();
    setIsExpanded(false);
  };

  const getProductInfo = (userInput: string): { productName: string; productId: string } | null => {
    const input = userInput.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
      if (input.includes(key)) {
        const parts = response.split('|');
        if (parts.length >= 3) {
          return {
            productName: parts[1].replace('PRODUCT:', ''),
            productId: parts[2].replace('ID:', '')
          };
        }
      }
    }
    return null;
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    const productInfo = getProductInfo(content);

    // Generate bot response
    setTimeout(() => {
      const botResponse = generateResponse(content);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
        productInfo: productInfo
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
      if (input.includes(key)) {
        return response.split('|')[0]; // Return only the text part
      }
    }
    
    // Default response
    return "That's a great question! Based on your financial profile, I'd recommend scheduling a consultation with our financial advisors for personalized advice. In the meantime, you're doing excellent with your current 15% savings rate and ₦1.2M balance. Keep up the great work!";
  };

  const handleTemplateQuestion = (question: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: question.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    const productInfo = getProductInfo(question);

    // Generate bot response
    setTimeout(() => {
      const botResponse = generateResponse(question);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
        productInfo: productInfo
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Backdrop */}
      {(isExpanded || showChatPanel) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-40 lg:hidden"
          onClick={() => {
            setIsExpanded(false);
            setShowChatPanel(false);
          }}
        />
      )}

      {/* Chat Panel */}
      {showChatPanel && (
        <div className="fixed inset-4 lg:right-4 lg:left-auto lg:top-4 lg:bottom-4 lg:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-slate-800 p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">OMNIS</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <p className="text-slate-300 text-xs">Personal Financial Assistant</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowChatPanel(false)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-3 ${
                  msg.type === 'user' 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-slate-100 text-slate-800'
                }`}>
                  <div className="flex items-start space-x-2">
                    {msg.type === 'bot' && (
                      <Bot className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                    )}
                    {msg.type === 'user' && (
                      <User className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                    )}
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Template Questions */}
          {messages.length === 1 && (
            <div className="p-4 border-t border-slate-100">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-slate-600" />
                </div>
                <p className="text-sm text-slate-700 font-medium">Popular questions</p>
              </div>
              <div className="space-y-3">
                {templateQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleTemplateQuestion(question)}
                    className="w-full text-left p-4 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 rounded-xl transition-all duration-300 text-slate-700 border border-slate-200 hover:border-slate-300 hover:shadow-sm transform hover:scale-[1.02] active:scale-[0.98] group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium leading-relaxed">{question}</span>
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
                        <Send className="w-3 h-3 text-slate-600" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-slate-100">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                placeholder="Ask me anything about your finances..."
                className="flex-1 p-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                className="p-3 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors duration-200"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Bubble */}
      <div className={`fixed z-50 transition-all duration-300 ease-out ${
        isExpanded 
          ? 'bottom-4 right-4 left-4 lg:left-auto lg:max-w-sm lg:min-w-80' 
          : 'bottom-6 right-4 lg:right-6'
      }`}>
        
        {!isExpanded ? (
          /* Collapsed State - Just Icon */
          <div 
            onClick={() => setIsExpanded(true)}
            className="w-14 h-14 bg-slate-800 hover:bg-slate-900 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse border-2 border-white" />
          </div>
        ) : (
          /* Expanded State - Recommendation Card */
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            
            {/* Header */}
            <div className="bg-slate-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">OMNIS</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <p className="text-slate-300 text-xs">AI Financial Concierge</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                <p className="text-slate-800 text-sm leading-relaxed">{message}</p>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={handleMaybeLater}
                  className="flex-1 bg-slate-100 text-slate-700 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-slate-200"
                >
                  Maybe Later
                </button>
                <button
                  onClick={handleViewRecommendation}
                  className="flex-1 bg-slate-800 text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-slate-900 hover:shadow-lg transform hover:scale-105 active:scale-95"
                >
                  View Recommendation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}