
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-6 md:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Visual Story Creator
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Bring your stories to life with AI-generated imagery.
        </p>
      </div>
    </header>
  );
};

export default Header;
