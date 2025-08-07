
import React from 'react';
import { useToast } from '../hooks/useToast';
import { LinkIcon } from './icons/Icons';

export const Referral: React.FC = () => {
  const { addToast } = useToast();
  const referralLink = 'https://creator.fast-track.app/referral/u12345xyz';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        addToast('Referral link copied to clipboard!', 'success');
      })
      .catch(err => {
        addToast('Failed to copy link.', 'error');
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4">Share Your Referral Link</h1>
      <p className="text-gray-600 mb-6">
        Share this link with other creators. You'll get bonus votes for every creator who signs up!
      </p>
      <div className="flex flex-col sm:flex-row items-stretch gap-2">
        <div className="flex-grow p-3 bg-light border border-gray-200 rounded-lg text-gray-700 font-mono text-sm overflow-x-auto">
          {referralLink}
        </div>
        <button
          onClick={copyToClipboard}
          className="flex-shrink-0 bg-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center"
        >
          <LinkIcon className="w-5 h-5 mr-2" />
          Copy Link
        </button>
      </div>
    </div>
  );
};
