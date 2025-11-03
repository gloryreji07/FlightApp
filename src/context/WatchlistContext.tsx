'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useFirebase, useUser, useFirestore } from '@/firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

interface WatchlistContextType {
  watchlistIds: string[];
  addToWatchlist: (flightId: string) => Promise<void>;
  removeFromWatchlist: (flightId:string) => Promise<void>;
  isFlightInWatchlist: (flightId: string) => boolean;
  isLoaded: boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const getWatchlistRef = useCallback(() => {
    if (!user) return null;
    return doc(firestore, 'watchlists', user.uid);
  }, [user, firestore]);

  useEffect(() => {
    if (isUserLoading) {
        setIsLoaded(false);
        return;
    }
    
    if (!user) {
        // Handle guest user - maybe use localStorage or just an empty list
        setWatchlistIds([]);
        setIsLoaded(true);
        return;
    }

    const fetchWatchlist = async () => {
        const watchlistRef = getWatchlistRef();
        if (!watchlistRef) return;

        try {
            const docSnap = await getDoc(watchlistRef);
            if (docSnap.exists()) {
                setWatchlistIds(docSnap.data().flights || []);
            } else {
                // If the user has no watchlist document, create one
                await setDoc(watchlistRef, { flights: [] });
                setWatchlistIds([]);
            }
        } catch (error) {
            console.error("Error fetching watchlist:", error);
        } finally {
            setIsLoaded(true);
        }
    };

    fetchWatchlist();
  }, [user, isUserLoading, getWatchlistRef]);


  const addToWatchlist = async (flightId: string) => {
    const watchlistRef = getWatchlistRef();
    if (!watchlistRef) return;
    
    try {
        await updateDoc(watchlistRef, {
            flights: arrayUnion(flightId)
        });
        setWatchlistIds((prev) => [...prev, flightId]);
    } catch (error) {
        console.error("Error adding to watchlist: ", error);
        // Here you might want to show a toast to the user
    }
  };

  const removeFromWatchlist = async (flightId: string) => {
    const watchlistRef = getWatchlistRef();
    if (!watchlistRef) return;

    try {
        await updateDoc(watchlistRef, {
            flights: arrayRemove(flightId)
        });
        setWatchlistIds((prev) => prev.filter((id) => id !== flightId));
    } catch (error) {
        console.error("Error removing from watchlist: ", error);
    }
  };

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
