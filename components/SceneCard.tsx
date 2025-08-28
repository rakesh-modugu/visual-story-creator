
import React from 'react';
import type { Scene } from '../types';

interface SceneCardProps {
  scene: Scene;
  sceneNumber: number;
}

const ImagePlaceholder: React.FC = () => (
  <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center animate-pulse">
    <svg className="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.55a2.5 2.5 0 010 4l-4.55 2.5M4 10h6.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M4 14h6.586a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H15"></path>
    </svg>
  </div>
);

const SceneCard: React.FC<SceneCardProps> = ({ scene, sceneNumber }) => {
  return (
    <div className="space-y-3">
        <h4 className="font-semibold text-gray-500 dark:text-gray-400">Scene {sceneNumber}</h4>
        <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center text-white">
        {scene.isLoading ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <svg className="animate-spin h-8 w-8 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="mt-3 text-sm text-gray-600 dark:text-gray-300">Generating image...</span>
          </div>
        ) : scene.error ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 text-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="font-semibold">Image Generation Failed</p>
            <p className="text-xs mt-1">{scene.error}</p>
          </div>
        ) : scene.imageUrl ? (
            <img src={scene.imageUrl} alt={scene.prompt} className="w-full h-full object-cover" />
        ) : (
           <ImagePlaceholder />
        )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
            "{scene.prompt}"
        </p>
    </div>
  );
};

export default SceneCard;
