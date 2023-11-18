// Import necessary modules and components
'use client';
import { useWatchlist } from '../../hooks/use-watchlist';
import Card from '../../components/card/link';
import { getPrice } from '@/lib/utils';

// Default component for rendering the Collections page
export default function Collections() {
  // Fetch the watchlist data using a custom hook
  const { watchlist } = useWatchlist();

  // Calculate the total collection price in GBP
  const totalCollectionPriceGBP = watchlist.reduce((total, card) => {
    // Get the TCGPlayer price for the card, defaulting to 0 if not available
    const tcgplayerPrice = card.tcgplayer?.prices?.holofoil?.mid || 0;

    // Calculate the total price for the card
    const totalPrice = tcgplayerPrice;

    // Accumulate the total price for all cards in the watchlist
    return total + totalPrice;
  }, 0);

  // Render the Collections page
  return (
    <div className="container mx-auto my-8 p-4">
      <div className="text-left mt-2">
        <div className="flex justify-left items-center mb-4">
          {/* Heading for the Collections page */}
          <h1 className="text-left text-3xl font-bold mr-2">My Collections</h1>

          {/* Display the total price of the collection in GBP */}
          <div className="text-center ml-64 text-3xl">
            <strong>Total Price:</strong>{' '}
            {getPrice('GBP', totalCollectionPriceGBP)}
          </div>
        </div>
      </div>

      {/* Display the cards in a grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Check if the watchlist is empty */}
        {watchlist.length === 0 ? (
          // Display a message if the watchlist is empty
          <p className="text-gray-600">Your watchlist is empty.</p>
        ) : (
          // Display each card in the watchlist using the Card component
          // @ts-ignore
          watchlist.map((card) => <Card key={card.id} {...card} />)
        )}
      </div>
    </div>
  );
}
