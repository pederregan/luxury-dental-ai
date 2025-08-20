'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '@/components/icons';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ChatWidget({ isOpen, onToggle }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm DSM's AI assistant. I can help you calculate ROI, answer questions about our platform, or connect you with our team. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes('roi') || input.includes('return') || input.includes('calculate')) {
      return "I'd be happy to help you calculate your practice's ROI! Our calculator shows most dental practices see 300-500% ROI within 6 months. Would you like me to guide you through our ROI calculator or schedule a personalized demo?";
    }

    if (input.includes('price') || input.includes('cost') || input.includes('pricing')) {
      return "Our pricing starts at $597/month for single practices and $1,997/month for multi-location groups. We also offer white-label partnerships. Each plan includes full implementation and ongoing support. Would you like a custom quote for your practice?";
    }

    if (input.includes('demo') || input.includes('trial') || input.includes('test')) {
      return "Perfect! I can schedule a personalized 15-minute demo where you'll see exactly how DSM works with your practice management system. Our demos typically show a clear path to 30%+ revenue increase. What's the best time for you this week?";
    }

    if (input.includes('integration') || input.includes('software') || input.includes('system')) {
      return "DSM integrates with 20+ major dental practice management systems including Dentrix, Eaglesoft, Open Dental, and more. Our integration typically takes 24-48 hours with zero downtime. Which PMS does your practice currently use?";
    }

    if (input.includes('hello') || input.includes('hi') || input.includes('help')) {
      return "Hello! I'm here to help you discover how DSM can transform your dental practice. I can help with ROI calculations, pricing questions, scheduling demos, or technical details. What interests you most?";
    }

    if (input.includes('locations') || input.includes('multiple') || input.includes('group')) {
      return "Great question! DSM is specifically designed for multi-location dental groups. Our enterprise platform provides centralized management, location-specific analytics, and unified reporting. We currently serve practice groups with 2-50+ locations. How many locations does your group have?";
    }

    // Default response
    return "That's a great question! Our platform is designed specifically for dental practices to increase revenue and efficiency. Would you like me to connect you with one of our dental technology specialists who can give you detailed information? Or I can schedule a quick demo to show you exactly how it works.";
  };

  const quickActions = [
    { text: "Calculate ROI", icon: Icons.TrendingUp },
    { text: "Schedule Demo", icon: Icons.Clock },
    { text: "View Pricing", icon: Icons.Award },
    { text: "Ask Question", icon: Icons.Phone }
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={onToggle}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center focus:outline-none ${
          isOpen
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-gradient-to-r from-[#1a365d] to-[#2d3748] hover:from-[#2d3748] hover:to-[#1a365d]'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.2 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat support'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <Icons.X className="h-6 w-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Icons.Phone className="h-6 w-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* New message indicator */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs text-white font-bold">1</span>
          </motion.div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1a365d] to-[#2d3748] p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Icons.PatientAcquisition className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">DSM AI Assistant</h3>
                  <div className="flex items-center gap-1 text-xs text-white/80">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Online now</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-[#1a365d] text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="bg-gray-100 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <div className="text-xs text-gray-500 mb-2">Quick actions:</div>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <motion.button
                        key={index}
                        onClick={() => setInputValue(action.text)}
                        className="flex items-center gap-2 p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="h-3 w-3 text-[#1a365d]" />
                        <span className="text-gray-700">{action.text}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#1a365d]/30 focus:border-[#1a365d]"
                  disabled={isTyping}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-8 h-8 bg-[#1a365d] hover:bg-[#2d3748] disabled:bg-gray-300 rounded-full flex items-center justify-center focus:outline-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icons.ChevronRight className="h-4 w-4 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
