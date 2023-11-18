// Import necessary modules and components
import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageControls from '@/components/gallery/page-controls';
import ViewAs from '@/components/gallery/view-as';
import Form from '@/components/search-form';
import { keywords } from '@/lib/tcg';
import Gallery from '@/components/gallery';
import { FormProvider } from '@/context/search';
import SWRConfig from '@/components/swr-config';

// Metadata for the page
export const metadata: Metadata = {
  title: 'Search',
  keywords: [
    'Pokemon card search',
    'Card lookup',
    'Card finder',
    'Card database',
    'Pokemon TCG search',
    'Find Pokemon cards',
    'Search for cards',
    'Card collection search',
    'Pokemon card inventory',
    'Card catalog',
    'Card exploration',
    'Pokemon card database',
    'Trading card search',
    'Card rarity search',
    'Card details lookup',
    ...keywords,
  ],
  description:
    'Discover and find your favorite Pokemon cards with ease. Our powerful search feature allows you to quickly locate specific cards, explore rarities, and build your perfect deck. Unleash your strategic skills in the Pokemon TCG and dominate the competition',
};

// Main component for the search page
export default function Page() {
  return (
    <main className="my-6 md:my-10 flex flex-col gap-3">
      {/* Suspense is used to handle async operations in React */}
      <Suspense>
        {/* SWRConfig provides configuration for the SWR library */}
        <SWRConfig>
          {/* FormProvider provides the search form context */}
          <FormProvider>
            {/* Container for search form, view toggle, page controls, and gallery */}
            <div className="flex items-center xs:justify-between gap-1 flex-wrap">
              {/* Search form and view toggle */}
              <div className="flex gap-1 items-center">
                <Form /> {/* Search form component */}
                <ViewAs /> {/* View toggle component */}
              </div>
              {/* Page controls component */}
              <PageControls />
            </div>
            {/* Gallery component for displaying search results */}
            <Gallery />
          </FormProvider>
        </SWRConfig>
      </Suspense>
    </main>
  );
}
