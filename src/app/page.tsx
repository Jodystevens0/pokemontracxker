// Import necessary modules and components
import type { Metadata } from 'next';
import { Clock, Gem, Search } from '@/ui/icons';
import { Searchbar } from '@/components/searchbar';
import { cn } from '@/lib/utils';
import { Link } from '@/ui/link';

// Define metadata for the page (SEO-related information)
export const metadata: Metadata = {
  description:
    'Unleash your Pokemon TCG prowess with Pokefolder! Discover rare cards, build custom decks, and conquer opponents. Dive into a world of Pokemon battles.',
};

// Define an array of pages with their titles, hrefs, and associated icons
const pages = [
  { title: 'view sets', href: '/sets', icon: Gem },
  { title: 'search', href: '/search', icon: Search },
  { title: 'coming soon', href: '/', icon: Clock },
] as const;

// Define the Page component
export default function Page() {
  return (
    // Main content section with flex layout and vertical gap
    <main className="my-12 lg:my-36 flex flex-col gap-20 lg:gap-36">
      {/* Section for building the perfect deck with search functionality */}
      <section className="flex flex-col items-center justify-center gap-2 relative">
        <div className="flex text-center flex-col items-center justify-center gap-3 w-full sm:w-3/4">
          {/* Main title for the section */}
          <h1 className="font-bungee select-none gradient-text break-words text-5xl md:text-6xl uppercase">
            Discover cards, and track your own portfolio!
          </h1>
          {/* Searchbar component for searching Pokemon cards */}
          <Searchbar id="search" to="/search" size="md" />
          {/* Description and example search links */}
          <p className="w-4/5 md:w-3/5">
            Try searching&nbsp;
            {/* Link to search for 'vikavolt' */}
            <Link
              variant="primary"
              highlight="primary"
              focus="ring"
              className="focus-visible:px-1"
              size="bold"
              href="/search?cards=vikavolt"
            >
              vikavolt
            </Link>
            ,&nbsp;
            {/* Link to search for 'mew' and 'cynthia' */}
            <Link
              variant="primary"
              highlight="primary"
              focus="ring"
              className="focus-visible:px-1"
              size="bold"
              href="/search?cards=mew,cynthia"
            >
              mew, cynthia
            </Link>
            &nbsp;or&nbsp;
            {/* Link to browse sets */}
            <Link
              prefetch={true}
              variant="primary"
              highlight="primary"
              focus="ring"
              className="focus-visible:px-1"
              size="bold"
              href="/sets"
            >
              browse by sets
            </Link>
          </p>
        </div>
      </section>

      {/* Section for displaying links to other pages */}
      <section className="flex items-center justify-evenly flex-wrap gap-6 lg:gap-3 relative after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-z-10 after:-translate-y-1/2 after:hidden lg:after:block after:content-[''] after:w-1/2 after:mx-auto after:h-8 after:bg-gradient-to-r after:from-foreground after:via-spotlight after:to-accent">
        {/* Map through the pages array and render links with icons */}
        {pages.map((page, i) => (
          <Link
            prefetch={page.href !== '/search'}
            key={page.href}
            href={page.href}
            highlight="none"
            className={cn(
              'relative w-full h-screen max-h-[9rem] xs:aspect-video xs:max-w-[16rem] overflow-hidden rounded-sm text-xl uppercase font-bold transition-transform hover:-translate-y-1 focus-visible:-translate-y-1 sm:last:col-span-2 sm:last:max-h-[9rem] lg:last:col-span-1 lg:last:max-h-auto',
              {
                'bg-foreground text-background': i == 0,
                'bg-spotlight text-foreground': i == 1,
                'bg-accent text-accent-foreground': i == 2,
              },
            )}
          >
            {/* Display page title */}
            <span className="absolute bottom-3 right-3">{page.title}</span>
            {/* Display page icon */}
            <page.icon className="w-full h-full absolute top-0 -left-1/3 opacity-25" />
          </Link>
        ))}
      </section>
    </main>
  );
}
