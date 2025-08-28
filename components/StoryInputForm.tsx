
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Scene } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface StoryInputFormProps {
  storyTitle: string;
  setStoryTitle: (title: string) => void;
  scenes: Scene[];
  setScenes: React.Dispatch<React.SetStateAction<Scene[]>>;
  onGenerate: () => void;
  isGenerating: boolean;
}

const StoryInputForm: React.FC<StoryInputFormProps> = ({
  storyTitle,
  setStoryTitle,
  scenes,
  setScenes,
  onGenerate,
  isGenerating,
}) => {
  const handleAddScene = () => {
    setScenes([
      ...scenes,
      { id: uuidv4(), prompt: '', imageUrl: undefined, isLoading: false, error: undefined },
    ]);
  };

  const handleRemoveScene = (id: string) => {
    setScenes(scenes.filter(scene => scene.id !== id));
  };

  const handlePromptChange = (id: string, prompt: string) => {
    setScenes(
      scenes.map(scene => (scene.id === id ? { ...scene, prompt } : scene))
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
      <div>
        <label htmlFor="storyTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Story Title
        </label>
        <input
          type="text"
          id="storyTitle"
          value={storyTitle}
          onChange={e => setStoryTitle(e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g., The Adventures of Sparky the Robot"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Scenes</h3>
        {scenes.map((scene, index) => (
          <div key={scene.id} className="flex items-start space-x-3">
            <span className="mt-2 text-lg font-bold text-gray-400 dark:text-gray-500">{index + 1}</span>
            <textarea
              value={scene.prompt}
              onChange={e => handlePromptChange(scene.id, e.target.value)}
              rows={3}
              className="flex-grow px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              placeholder={`Describe scene ${index + 1}...`}
            />
            <button
              onClick={() => handleRemoveScene(scene.id)}
              className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50"
              aria-label="Remove scene"
              disabled={isGenerating}
            >
              <TrashIcon />
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleAddScene}
          disabled={isGenerating}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <PlusIcon className="mr-2" />
          Add Scene
        </button>
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-wait"
        >
          {isGenerating ? (
            <>
              <SpinnerIcon />
              Generating...
            </>
          ) : (
            'Generate Visual Story'
          )}
        </button>
      </div>
    </div>
  );
};

export default StoryInputForm;
