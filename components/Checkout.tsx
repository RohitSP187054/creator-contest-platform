import React, { useState, useEffect } from 'react';
import { useToast } from '../hooks/useToast';
import { CreditCardIcon, LockIcon, CheckCircleIcon, XCircleIcon } from './icons/Icons';

export const Checkout: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<'success' | 'error' | null>(null);
  const { addToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1500); // Simulate session initialization
    return () => clearTimeout(timer);
  }, []);

  const handlePayment = () => {
    setIsProcessing(true);
    setPaymentResult(null); // Reset result on new attempt
    // Simulate payment API call
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% success rate
      if (isSuccess) {
        addToast('Payment complete - entry added!', 'success');
        setPaymentResult('success');
      } else {
        addToast('Payment failed. Please try again.', 'error');
        setPaymentResult('error');
      }
      setIsProcessing(false);
    }, 2000);
  };
  
  const buttonDisabled = isInitializing || isProcessing;

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-primary mb-2">Secure Checkout</h1>
      <p className="text-gray-500 mb-6">Submit your entry fee to join the contest.</p>
      
      <div className="bg-light p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center">
            <span className="font-medium text-gray-800">Contest Entry Fee</span>
            <span className="font-bold text-2xl text-primary">$25.00</span>
        </div>
      </div>
      
      {paymentResult === null && (
        <button
          onClick={handlePayment}
          disabled={buttonDisabled}
          className={`w-full flex items-center justify-center bg-accent text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105
            ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'}
          `}
        >
          <LockIcon className="w-5 h-5 mr-2" />
          {isInitializing ? 'Initializing...' : isProcessing ? 'Processing...' : 'Pay $25'}
        </button>
      )}

      {paymentResult === 'success' && (
        <div className="mt-4 flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
            <CheckCircleIcon className="w-6 h-6 mr-3 text-green-500" />
            <span className="font-semibold">Payment Successful! Your entry is submitted.</span>
        </div>
      )}
      {paymentResult === 'error' && (
        <div className="mt-4 text-center">
          <div className="flex items-center justify-center p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
              <XCircleIcon className="w-6 h-6 mr-3 text-red-500" />
              <span className="font-semibold">Payment Failed.</span>
          </div>
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="mt-4 w-full flex items-center justify-center bg-accent text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Try Again'}
          </button>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-400 text-center">
          Secure payment powered by Stripe.
      </div>
    </div>
  );
};