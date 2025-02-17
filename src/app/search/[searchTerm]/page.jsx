import React from 'react';
import Results from '@/app/components/Results';

export default async function SearchPage({ params }) {
  const searchTerm = params?.searchTerm || "";

  return (

    <div className="px-4 dark:bg-gray-700">

      <Results searchTerm={searchTerm} />

    </div>

  );
}
