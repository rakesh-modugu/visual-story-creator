
import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Scene } from './types';
import { generateImageForPrompt } from './services/geminiService';
import Header from './components/Header';
import StoryInputForm from './components/StoryInputForm';
import StoryDisplay from './components/StoryDisplay';

const App: React.FC = () => {
  const [storyTitle, setStoryTitle] = useState<string>('My AI-Generated Story');
  const [scenes, setScenes] = useState<Scene[]>([
    { id: uuidv4(), prompt: 'A mystical forest at twilight with glowing mushrooms.', imageUrl: undefined, isLoading: false, error: undefined },
    { id: uuidv4(), prompt: 'A wise old owl with spectacles reading a book on a branch.', imageUrl: undefined, isLoading: false, error: undefined },
  ]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerateStory = useCallback(async () => {
    const scenesWithPrompts = scenes.filter(s => s.prompt.trim() !== '');
    if (scenesWithPrompts.length === 0) {
      alert('Please add at least one scene prompt.');
      return;
    }

    setIsGenerating(true);
    setScenes(currentScenes =>
      currentScenes.map(scene =>
        scene.prompt.trim() ? { ...scene, isLoading: true, error: undefined, imageUrl: undefined } : scene
      )
    );

    const generationPromises = scenesWithPrompts.map(scene =>
      generateImageForPrompt(scene.prompt).then(
        imageUrl => ({ id: scene.id, imageUrl, error: undefined }),
        error => ({ id: scene.id, imageUrl: undefined, error: error instanceof Error ? error.message : 'An unknown error occurred' })
      )
    );

    const results = await Promise.allSettled(generationPromises);

    setScenes(currentScenes => {
      const newScenes = [...currentScenes];
      results.forEach(result => {
        if (result.status === 'fulfilled') {
          const { id, imageUrl, error } = result.value;
          const sceneIndex = newScenes.findIndex(s => s.id === id);
          if (sceneIndex !== -1) {
            newScenes[sceneIndex] = { ...newScenes[sceneIndex], imageUrl, error, isLoading: false };
          }
        } else {
            // This case handles failures in the promise itself, not API errors caught inside
            console.error("A generation promise was rejected:", result.reason);
        }
      });
      return newScenes;
    });

    setIsGenerating(false);
  }, [scenes]);

  return (
    <div className="min-h-screen font-sans text-gray-800 dark:text-gray-200">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <StoryInputForm
            storyTitle={storyTitle}
            setStoryTitle={setStoryTitle}
            scenes={scenes}
            setScenes={setScenes}
            onGenerate={handleGenerateStory}
            isGenerating={isGenerating}
          />
          <StoryDisplay storyTitle={storyTitle} scenes={scenes} />
        </div>
      </main>
    </div>
  );
};

export default App;
