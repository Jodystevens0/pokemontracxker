// Import necessary modules and components
'use client';
import Card from '@/components/card/link'; // Importing the Card component
import PageControls from './page-controls'; // Importing the PageControls component
import useCards from '@/hooks/use-cards'; // Importing a custom hook for handling cards
import Image, { blur } from '@/ui/image'; // Importing the Image component and blur constant
import { DEFAULT_PAGE_SIZE } from '@/lib/tcg'; // Importing a constant for default page size
import { useSearchParams } from 'next/navigation'; // Importing a hook for accessing query parameters

// Images component definition
export default function Images() {
  // Using the useCards hook to fetch card data
  const { cards, isLoading, error } = useCards();

  // Using the useSearchParams hook to get query parameters
  const params = useSearchParams();
  const size = parseInt(`${params.get('pageSize')}`) || DEFAULT_PAGE_SIZE;

  // Loading state: Display placeholders while cards are loading
  if (isLoading) {
    return (
      <ul className="grid gap-3 justify-items-center items-center grid-cols-fluid-sm md:grid-cols-fluid">
        {Array.from({ length: size }).map((_, i) => (
          <li key={`fallback-${i}`}>
            <Image
              alt="card image fallback"
              src={blur}
              width={250}
              height={350}
              className="w-[250px] h-[350px]"
            />
          </li>
        ))}
      </ul>
    );
  }

  // Error state: Display an error message if there's an error fetching cards
  if (error) {
    return <span>An error occurred</span>;
  }

  // No cards found state: Display a message if no cards are available
  if (!cards?.count) {
    return <span>No cards found</span>;
  }

  // Display the list of cards and page controls
  return (
    <>
      <ul className="grid gap-3 mb-2 justify-items-center items-center grid-cols-fluid-sm md:grid-cols-fluid">
        {cards.data.map((card) => (
          <li key={`${card.id}-list`}>
            <Card {...card} />
          </li>
        ))}
      </ul>
      <PageControls />
    </>
  );
}
