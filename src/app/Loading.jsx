import React from 'react';

export default function Loading() {
  return (
    <div className="flex justify-center items-center p-4 mt-32 bg-white dark:bg-gray-700">
      {/* Light Mode Spinner */}
      <img src="Spinner.svg" alt="Loading..." className="w-12 h-12 dark:hidden" style={{width:'150px', height: '100px'}} />

      {/* Dark Mode Spinner */}
      <img src="SpinnerDark.svg" alt="Loading..." className="w-12 h-12 hidden dark:block"style={{width:'150px', height: '100px'}} />
    </div>
  );
}
