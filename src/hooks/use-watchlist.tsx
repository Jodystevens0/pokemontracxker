'use client';
// WatchlistContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import type { TCard } from '@/types/tcg';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';

interface WatchlistContextProps {
  watchlist: TCard[];
  addToWatchlist: (card: TCard) => void;
  removeFromWatchlist: (card: TCard) => void;
  isInWatchlist: (card: TCard) => boolean;
}

const LOCAL_STORAGE_KEY = 'watchlist';

const WatchlistContext = createContext<WatchlistContextProps | undefined>(
  undefined,
);

interface WatchlistProviderProps {
  children: ReactNode;
}

export const WatchlistProvider: React.FC<WatchlistProviderProps> = ({
  children,
}) => {
  const [user] = useAuthState(auth);
  const [watchlist, setWatchlist] = useState<TCard[]>([]);

  const getLocalStorage = (user) => {
    let watchlist = localStorage.getItem(user?.uid);
    console.log(watchlist, 'watchlist');
    if (watchlist) {
      return JSON.parse(watchlist);
    }
    return [];
  };

  React.useEffect(() => {
    var data = getLocalStorage(user);
    setWatchlist(data);
  }, [user]);

  useEffect(() => {
    // Save watchlist to localStorage whenever it changes
    localStorage.setItem(user?.uid ?? '', JSON.stringify(watchlist));
  }, [watchlist]);

  const isInWatchlist = (card: TCard) => {
    return watchlist.some((item) => item.id === card.id);
  };

  const addToWatchlist = (card: TCard) => {
    setWatchlist((prevWatchlist) => [...prevWatchlist, card]);
  };

  const removeFromWatchlist = (card: TCard) => {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((item) => item.id !== card.id),
    );
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = (): WatchlistContextProps => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};
