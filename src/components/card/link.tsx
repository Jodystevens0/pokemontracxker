// Import necessary modules and components
'use client';
import type { TCard } from '@/types/tcg';
import { Link } from '@/ui/link';
import Image from '@/ui/image';
import { getCardUrl } from '@/lib/utils';
import { useState } from 'react';
import { useWatchlist } from '../../hooks/use-watchlist';

// Card component definition
export default function Card({ ...card }: TCard) {
  // Use the watchlist hook to manage watchlist state
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  // Function to handle toggling the card in the watchlist
  const handleWatchlistToggle = () => {
    if (isInWatchlist(card)) {
      removeFromWatchlist(card);
    } else {
      addToWatchlist(card);
    }
  };

  // Render the card information and watchlist button
  return (
    <div className="relative" key={card.key}>
      {/* Link to the detailed card view */}
      <Link
        focus="none"
        className="focus-visible:outline-1 focus-visible:outline-primary group"
        href={getCardUrl(card)}
      >
        {/* Image of the card */}
        <Image
          referrerPolicy="no-referrer"
          src={card.images.small || card.images.large || '/back.png'}
          alt={card.name}
          width={250}
          height={350}
          sizes="(max-width: 768px) 12rem, (max-width: 1280px) 16rem, 16rem"
          className="transition-transform group-hover:scale-105 group-focus:scale-105"
          placeholder="blur"
        />
      </Link>

      {/* Watchlist Button */}
      <button
        onClick={handleWatchlistToggle}
        className="absolute bottom-2 left-12 px-2 py-1 bg-gray-800 text-white rounded-md opacity-50 hover:opacity-100 transition-opacity"
      >
        {isInWatchlist(card) ? 'Remove from Collection' : 'Add to Collection'}
      </button>
    </div>
  );
}
