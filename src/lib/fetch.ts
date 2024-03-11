// Import necessary types and utilities
import type { TCGApiResponse, TCardFull, TSet, TSetFull } from '@/types/tcg';
import { type Resource, createTCGQueryString } from './tcg';
import { cache } from 'react';
import 'server-only';

// API endpoint and headers
const API_URL = 'https://api.pokemontcg.io/v2/';
const headers: RequestInit['headers'] = {
  'content-type': 'application/json',
  'x-api-key': `${process.env.TCG_KEY}`, // API key stored in environment variable
};

// Type definition for fetching sets
// Define a type `GetSets` representing a function that returns a promise.
type GetSets = () => Promise<TCGApiResponse<TSet> | null>;

// Define a function `getSets` that implements the `GetSets` type.
export const getSets: GetSets = cache(async () => {
  // Construct the URL for fetching sets from the API.
  const url = new URL('sets', API_URL);
  // Set query parameters for ordering and selecting specific fields.
  url.searchParams.set('orderBy', 'series');
  url.searchParams.set('select', 'id,name,series,releaseDate,images');

  try {
    // Fetch sets from the API with caching enabled.
    const response = await fetch(url, { next: { revalidate: 86400 }, headers });
    // Throw an error if the response is not successful.
    if (!response.ok) throw new Error('failed to fetch');
    // Parse the response body as JSON and return it.
    return response.json();
  } catch (error) {
    // Log any errors that occur during the fetch operation.
    console.error(error);
    // Return null in case of error.
    return null;
  }
});


// Type definition for fetching types
// Define a type `GetTypes` representing a function that takes a `Resource` parameter and returns a promise.
type GetTypes = (r: Resource) => Promise<TCGApiResponse<string>>;

// Define a function `getTypes` that implements the `GetTypes` type.
export const getTypes: GetTypes = cache(async (resource) => {
  // Construct the URL for fetching types from the API based on the provided `resource`.
  const url = new URL(resource, API_URL);

  try {
    // Fetch types from the API with caching enabled and specific tags.
    const response = await fetch(url, {
      cache: 'force-cache',
      next: { tags: [resource] },
      headers,
    });
    // Throw an error if the response is not successful.
    if (!response.ok) throw new Error('Failed to fetch');

    // Parse the response body as JSON and return it.
    return response.json();
  } catch (error) {
    // Log any errors that occur during the fetch operation along with the URL.
    console.error({ error, url });
    // Return null in case of error.
    return null;
  }
});


// Type definition for searching cards
// Define a type `Search` representing a function that takes URLSearchParams as parameters and returns a promise.
type Search = (params: URLSearchParams) => Promise<TCGApiResponse<TCardFull>>;

// Define a function `getCards` that implements the `Search` type.
export const getCards: Search = async (params) => {
  // Create a query string from the provided URLSearchParams.
  const searchParams = createTCGQueryString(params);
  // Construct the URL for fetching cards from the API with the specified search parameters.
  const url = decodeURIComponent(`${API_URL}cards?${searchParams}`);

  // Fetch cards from the API with caching enabled.
  const response = await fetch(url, { headers, next: { revalidate: 86400 } });
  // Throw an error if the response is not successful.
  if (!response.ok) throw response;

  // Parse the response body as JSON and return it.
  return response.json();
};

// Define a type `GetItem` representing a function that takes an ID as a string parameter and returns a promise.
type GetItem<T> = (id: string) => Promise<{ data: T } | null>;

// Define a function `getCard` that implements the `GetItem` type.
export const getCard: GetItem<TCardFull> = cache(async (id) => {
  // Construct the URL for fetching a specific card from the API based on the provided ID.
  const url = new URL(`cards/${id}`, API_URL);

  try {
    // Fetch the card from the API with caching enabled.
    const response = await fetch(url, { headers, next: { revalidate: 86400 } });
    // Throw an error if the response is not successful.
    if (!response.ok) throw new Error('Failed to fetch');

    // Parse the response body as JSON and return it.
    return response.json();
  } catch (error) {
    // Log any errors that occur during the fetch operation.
    console.error(`Failed to fetch card with id ${id}`, error);
    // Return null in case of error.
    return null;
  }
});


// Define a function `getSet` that implements the `GetItem` type, specifically for fetching set data.
export const getSet: GetItem<TSetFull> = cache(async (id) => {
  // Construct the URL for fetching a specific set from the API based on the provided ID.
  const url = new URL(`sets/${id}`, API_URL);

  try {
    // Fetch the set from the API with caching enabled and specific tags.
    const response = await fetch(url, { headers, next: { tags: ['sets'] } });
    // Throw an error if the response is not successful.
    if (!response.ok) throw new Error('Failed to fetch set');

    // Parse the response body as JSON and return it.
    return response.json();
  } catch (error) {
    // Log any errors that occur during the fetch operation.
    console.error(error);
    // Return null in case of error.
    return null;
  }
});

