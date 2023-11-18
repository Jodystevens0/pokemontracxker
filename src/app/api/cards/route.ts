// Import necessary modules and functions
import { getCards } from '@/lib/fetch';
import { type NextRequest, NextResponse } from 'next/server';

// Define the GET request handler
export async function GET(request: NextRequest) {
  // Clone the request headers for manipulation
  const headers = new Headers(request.headers);

  // TODO: Use a different/additional way to restrict access.
  // Check if the referer header is present in the request
  const referer = headers.get('referer');
  if (!referer) {
    // If referer is missing, respond with a 403 Forbidden status and message
    return NextResponse.json({
      code: 403,
      message: 'You do not have permission to access this resource.',
    });
  }

  // Parse the referer URL
  const url = new URL(referer);

  // Check if the referer path is '/search'
  if (url.pathname !== '/search') {
    // If the path is not '/search', respond with a 403 Forbidden status and message
    return NextResponse.json({
      code: 403,
      message: 'You do not have permission to access this resource.',
    });
  }

  try {
    // Attempt to fetch cards based on the search parameters from the referer URL
    const cards = await getCards(url.searchParams);

    // Respond with the fetched cards and a 200 status
    return NextResponse.json(cards, { status: 200 });
  } catch (error) {
    // Handle errors that may occur during the fetching process
    console.error('An error occurred fetching cards\n\n', error);

    // Respond with an error message and status based on the error
    return NextResponse.json(
      {
        error: {
          code: error.code ?? 500,
          message: error.message ?? 'An error occurred',
        },
      },
      { status: error.code },
    );
  }
}
