
import React from 'react';
import type { Scene } from '../types';
import SceneCard from './SceneCard';

interface StoryDisplayProps {
  storyTitle: string;
  scenes: Scene[];
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ storyTitle, scenes }) => {
  const hasGeneratedContent = scenes.some(s => s.imageUrl || s.isLoading || s.error);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
      {hasGeneratedContent ? (
        <>
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white break-words">
            {storyTitle}
          </h2>
          <div className="space-y-8">
            {scenes.map((scene, index) => (
                scene.prompt.trim() ? <SceneCard key={scene.id} scene={scene} sceneNumber={index + 1} /> : null
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center text-gray-500 dark:text-gray-400">
          <svg className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <h3 className="text-xl font-semibold">Your visual story will appear here.</h3>
          <p className="mt-2">Enter your prompts on the left and click "Generate" to begin.</p>
        </div>
      )}
    </div>
  );
};

export default StoryDisplay;
