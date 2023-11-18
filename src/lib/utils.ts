// Importing necessary modules and types
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { TCard, TCardFull, TSet } from '@/types/tcg';

// Utility function for combining class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to construct a URL with optional pathname
export const getURL = (pathname: `/${string}` = '/') => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000';
  url = url.includes('http') ? url : `https://${url}`;
  return url + pathname;
};

// Type for defining replacements in the `format` function
type Replace<T> = { from: T; to: T };
// Configuration type for the `format` function
type Config = {
  case: 'lowercase' | 'uppercase' | 'capitalize';
  'lv.': Replace<'lv.' | 'lv-'>;
  '&': Replace<'&' | 'and'>;
  "'s": Replace<"'s" | 's'>;
  space: Replace<' ' | '-'>;
  exceptions: string[];
};

// Main formatting function
export default function format(text: string, config: Partial<Config>) {
  // Default exceptions to an empty array
  config.exceptions ||= [];
  // If the text is in the exceptions list, return it as is
  if (config.exceptions.includes(text)) return text;

  // Decode URI component
  text = decodeURIComponent(text);
  // Extract alphanumeric characters and replace spaces with '-'
  const matches = text.match(/[a-zA-Z0-9é'&]+/gi) || [];
  text = matches.length ? matches.join('-') : text;

  // Apply formatting configurations
  Object.values(config).forEach((value) => {
    if (Array.isArray(value)) return;
    if (typeof value === 'string') {
      // Handle string-based configurations (e.g., 'uppercase', 'capitalize')
      switch (value) {
        case 'capitalize':
          text = text
            .split(' ')
            .map((t) => t[0].toUpperCase() + t.substring(1))
            .join(' ');
          break;
        case 'lowercase':
          text = text.toLowerCase();
          break;
        case 'uppercase':
          text = text.toUpperCase();
      }
      return;
    }
    // Replace specified values in the text
    text = text.replaceAll(value.from, value.to);
  });

  return text;
}

// Utility function to format set names
export function formatSetName(name: string, config?: Partial<Config>) {
  return format(name, {
    case: 'lowercase',
    '&': { from: '&', to: 'and' },
    "'s": { from: "'s", to: 's' },
    ...config,
  });
}

// Utility function to create search parameters
export function createSearchParams(key: string, name: string | undefined) {
  const params = new URLSearchParams();
  name && params.set(key, name);
  return params;
}

// Utility function to group sets by series
export function groupSetsBySeries(sets: TSet[]) {
  const group: { [key: string]: TSet[] } = {};

  sets.forEach((set) => {
    if (!set.series) return;
    group[set.series] ??= [];
    group[set.series].push(set);
  });

  return {
    series: Object.keys(group),
    setsBySeries: Object.entries(group),
  };
}

// Utility function to construct a URL for a card
export function getCardUrl(card: TCard) {
  if (!card) {
    // Handle the case where card is undefined
    return '/fallback-url'; // replace with your fallback URL
  }

  // Format card name for the URL
  const name = format(card.name, {
    case: 'lowercase',
    '&': { from: '&', to: 'and' },
    "'s": { from: "'s", to: 's' },
    'lv.': { from: 'lv.', to: 'lv-' },
  });
  return `/cards/${name}/${card.id}`;
}

// Utility function to construct a URL for a trait search
export function getTraitUrl(trait: NonNullable<TCardFull['ancientTrait']>) {
  return `/search?${createSearchParams('trait', trait.name)}`;
}

// Utility function to construct a URL for an ability search
export function getAbilityUrl(
  ability: NonNullable<TCardFull['abilities']>[number],
) {
  return `/search?${createSearchParams('abilities', ability.name)}`;
}

// Utility function to construct a URL for an attack search
export function getAttackUrl(name: string) {
  return `/search?${createSearchParams('attacks', name)}`;
}

// Utility function to format a price with currency
export function getPrice(
  currency: 'EUR' | 'USD' | 'GBP',
  value?: number | null,
) {
  if (typeof value !== 'number') return '--';
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}
