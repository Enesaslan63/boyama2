import React, { useState } from 'react';
import HomeScreen from './HomeScreen';
import FreeDrawScreen from './FreeDrawScreen';
import AnimalPaintingScreen from './AnimalPaintingScreen';
import AnimalSelectionScreen from './AnimalSelectionScreen';
import MagicEraserScreen from './MagicEraserScreen';
import MagicEraserSelectionScreen from './MagicEraserSelectionScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedAnimal, setSelectedAnimal] = useState('aslan');
  const [selectedMagicImage, setSelectedMagicImage] = useState(1);

  if (currentScreen === 'home') {
    return (
      <HomeScreen 
        onNavigateToFreeDraw={() => setCurrentScreen('freeDraw')}
        onNavigateToAnimalPainting={() => setCurrentScreen('animalSelection')}
        onNavigateToMagicEraser={() => setCurrentScreen('magicEraserSelection')}
      />
    );
  }

  if (currentScreen === 'animalSelection') {
    return (
      <AnimalSelectionScreen 
        onSelectAnimal={(animal) => {
          setSelectedAnimal(animal);
          setCurrentScreen('animalPainting');
        }}
        onNavigate={() => setCurrentScreen('home')}
      />
    );
  }

  if (currentScreen === 'animalPainting') {
    return (
      <AnimalPaintingScreen 
        initialAnimal={selectedAnimal}
        onNavigate={() => setCurrentScreen('animalSelection')} 
      />
    );
  }

  if (currentScreen === 'magicEraserSelection') {
    return (
      <MagicEraserSelectionScreen 
        onSelectImage={(imageId) => {
          setSelectedMagicImage(imageId);
          setCurrentScreen('magicEraser');
        }}
        onNavigate={() => setCurrentScreen('home')}
      />
    );
  }

  if (currentScreen === 'magicEraser') {
    return (
      <MagicEraserScreen 
        imageId={selectedMagicImage}
        onNavigate={() => setCurrentScreen('magicEraserSelection')} 
      />
    );
  }

  return <FreeDrawScreen onNavigate={() => setCurrentScreen('home')} />;
}
