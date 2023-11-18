// Import necessary modules and functions
import { NextResponse } from 'next/server';
import { Tags, revalidateTags } from '@/lib/tcg';
import { revalidateTag } from 'next/cache';

// Define the GET request handler
export async function GET(request: Request) {
  // Parse the URL from the incoming request
  const url = new URL(request.url);

  // Extract the 'token' parameter from the URL
  const token = url.searchParams.get('token');

  // Check if the token matches the expected value
  if (token !== process.env.REVALIDATE_TOKEN) {
    // If the token doesn't match, respond with a 403 Forbidden status and message
    return NextResponse.json(
      {
        code: 403,
        message: 'Forbidden',
        description: 'You do not have permission to access this resource',
      },
      { status: 403 },
    );
  }

  // Extract the 'tag' parameter from the URL
  const tag = url.searchParams.get('tag');

  // Check if 'tag' is missing or not in the list of valid tags
  if (!tag || !revalidateTags.includes(tag as Tags)) {
    // If 'tag' is missing or invalid, respond with a 400 Bad Request status and message
    return NextResponse.json({
      code: 400,
      message: 'Bad Request',
      description: `Tag must be one of ${revalidateTags.join(', ')}`,
    });
  }

  // Revalidate the specified tag
  revalidateTag(tag);

  // Respond with a 200 OK status and a success message
  return NextResponse.json({
    code: 200,
    message: 'OK',
    description: `Revalidated ${tag} ${new Date().toDateString()}`,
  });
}
