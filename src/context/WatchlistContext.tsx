'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface WatchlistContextType {
  watchlistIds: string[];
  addToWatchlist: (flightId: string) => void;
  removeFromWatchlist: (flightId: string) => void;
  isFlightInWatchlist: (flightId: string) => boolean;
  isLoaded: boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedWatchlist = localStorage.getItem('flightWatchlist');
      if (storedWatchlist) {
        setWatchlistIds(JSON.parse(storedWatchlist));
      }
    } catch (error) {
      console.error("Failed to load watchlist from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('flightWatchlist', JSON.stringify(watchlistIds));
      } catch (error) {
        console.error("Failed to save watchlist to localStorage", error);
      }
    }
  }, [watchlistIds, isLoaded]);

  const addToWatchlist = useCallback((flightId: string) => {
    setWatchlistIds((prev) => [...new Set([...prev, flightId])]);
  }, []);

  const removeFromWatchlist = useCallback((flightId: string) => {
    setWatchlistIds((prev) => prev.filter((id) => id !== flightId));
  }, []);

  const isFlightInWatchlist = useCallback(
    (flightId: string) => watchlistIds.includes(flightId),
    [watchlistIds]
  );
  
  const value = { watchlistIds, addToWatchlist, removeFromWatchlist, isFlightInWatchlist, isLoaded };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};
