import React, { useState } from 'react';
import HomeScreen from './HomeScreen';
import FreeDrawScreen from './FreeDrawScreen';
import AnimalPaintingScreen from './AnimalPaintingScreen';
import AnimalSelectionScreen from './AnimalSelectionScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedAnimal, setSelectedAnimal] = useState('aslan');

  if (currentScreen === 'home') {
    return (
      <HomeScreen 
        onNavigateToFreeDraw={() => setCurrentScreen('freeDraw')}
        onNavigateToAnimalPainting={() => setCurrentScreen('animalSelection')}
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

  return <FreeDrawScreen onNavigate={() => setCurrentScreen('home')} />;
}
