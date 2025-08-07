import React, { useState, useMemo, useEffect } from 'react';
import type { LeaderboardEntry, SortKey } from '../types';
import { SortAscIcon, SortDescIcon } from './icons/Icons';

const mockData: LeaderboardEntry[] = [
  { id: 1, name: 'Alice', avatar: 'https://picsum.photos/seed/alice/40/40', votes: 1500, submissionDate: '2025-07-20T10:00:00Z' },
  { id: 2, name: 'Bob', avatar: 'https://picsum.photos/seed/bob/40/40', votes: 1250, submissionDate: '2025-07-22T14:30:00Z' },
  { id: 3, name: 'Charlie', avatar: 'https://picsum.photos/seed/charlie/40/40', votes: 1800, submissionDate: '2025-07-19T09:00:00Z' },
  { id: 4, name: 'Diana', avatar: 'https://picsum.photos/seed/diana/40/40', votes: 980, submissionDate: '2025-07-23T11:00:00Z' },
  { id: 5, name: 'Ethan', avatar: 'https://picsum.photos/seed/ethan/40/40', votes: 2100, submissionDate: '2025-07-21T18:45:00Z' },
];

interface SortConfig {
  key: SortKey;
  direction: 'asc' | 'desc';
}

const getInitialSortConfig = (): SortConfig => {
    const savedSortConfig = localStorage.getItem('leaderboardSortConfig');
    if (savedSortConfig) {
        try {
            const parsed = JSON.parse(savedSortConfig);
            if (parsed.key && parsed.direction) {
                return parsed;
            }
        } catch (e) {
            console.error("Failed to parse sort config from localStorage", e);
        }
    }
    return { key: 'votes', direction: 'desc' };
};


export const Leaderboard: React.FC = () => {
  const [data] = useState<LeaderboardEntry[]>(mockData);
  const [sortConfig, setSortConfig] = useState<SortConfig>(getInitialSortConfig);

  useEffect(() => {
    localStorage.setItem('leaderboardSortConfig', JSON.stringify(sortConfig));
  }, [sortConfig]);

  const handleSort = (key: SortKey) => {
    setSortConfig(prevConfig => {
        const direction = prevConfig.key === key && prevConfig.direction === 'desc' ? 'asc' : 'desc';
        // For name, default to 'asc' on first click
        if (prevConfig.key !== key && key === 'name') {
          return { key, direction: 'asc' };
        }
        return { key, direction };
    });
  };

  const sortedData = useMemo(() => {
    const sorted = [...data];
    const { key, direction } = sortConfig;
    
    sorted.sort((a, b) => {
        let comparison = 0;
        if (key === 'votes') {
            comparison = a.votes - b.votes;
        } else if (key === 'recency') {
            comparison = new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime();
        } else if (key === 'name') {
            comparison = a.name.localeCompare(b.name);
        }

        return direction === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  }, [data, sortConfig]);

  const SortButton: React.FC<{
    buttonKey: SortKey;
    children: React.ReactNode;
  }> = ({ buttonKey, children }) => (
    <button
      onClick={() => handleSort(buttonKey)}
      className={`flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        sortConfig.key === buttonKey ? 'bg-accent text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {children}
      {sortConfig.key === buttonKey && (
        <span className="ml-2 w-4 h-4">
            {sortConfig.direction === 'asc' ? <SortAscIcon/> : <SortDescIcon/>}
        </span>
      )}
    </button>
  );

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Leaderboard</h1>
        <div className="flex items-center space-x-2 flex-wrap">
          <span className="text-sm font-medium text-gray-500 hidden sm:inline">Sort by:</span>
          <SortButton buttonKey="votes">Top-Rated</SortButton>
          <SortButton buttonKey="recency">Recency</SortButton>
          <SortButton buttonKey="name">Name</SortButton>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-light border-b border-gray-200">
              <th className="p-4 text-sm font-semibold text-gray-600">Rank</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Creator</th>
              <th className="p-4 text-sm font-semibold text-gray-600 text-right">Votes</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((entry, index) => (
              <tr key={entry.id} className="border-b border-gray-100 last:border-b-0 hover:bg-light-hover transition-colors">
                <td className="p-4 font-bold text-primary">{index + 1}</td>
                <td className="p-4">
                  <div className="flex items-center">
                    <img src={entry.avatar} alt={entry.name} className="w-10 h-10 rounded-full mr-4" />
                    <div>
                      <p className="font-semibold text-gray-800">{entry.name}</p>
                      <p className="text-xs text-gray-500">Submitted: {new Date(entry.submissionDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right font-semibold text-accent">{entry.votes.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};