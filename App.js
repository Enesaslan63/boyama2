import React, { useState } from 'react';
import HomeScreen from './HomeScreen';
import PaintingScreen from './PaintingScreen';
import FreeDrawScreen from './FreeDrawScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  if (currentScreen === 'home') {
    return <HomeScreen onNavigateToPainting={() => setCurrentScreen('painting')} onNavigateToFreeDraw={() => setCurrentScreen('freeDraw')} />;
  }

  if (currentScreen === 'painting') {
    return <PaintingScreen onNavigate={() => setCurrentScreen('home')} />;
  }

  return <FreeDrawScreen onNavigate={() => setCurrentScreen('home')} />;
}
