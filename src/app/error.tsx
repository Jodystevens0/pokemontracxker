'use client';

import { useEffect } from 'react';
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid place-content-center min-h-96">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again?</button>
    </div>
  );
}
