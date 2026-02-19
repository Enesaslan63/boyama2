import React, { useState } from 'react';
import HomeScreen from './HomeScreen';
import FreeDrawScreen from './FreeDrawScreen';
import AnimalPaintingScreen from './AnimalPaintingScreen';
import AnimalSelectionScreen from './AnimalSelectionScreen';
import MagicEraserScreen from './MagicEraserScreen';
import MagicEraserSelectionScreen from './MagicEraserSelectionScreen';
import MyPicturesScreen from './MyPicturesScreen';
import PictureDetailScreen from './PictureDetailScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedAnimal, setSelectedAnimal] = useState('aslan');
  const [selectedMagicImage, setSelectedMagicImage] = useState(1);
  const [savedPictures, setSavedPictures] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(null);

  if (currentScreen === 'home') {
    return (
      <HomeScreen 
        onNavigateToFreeDraw={() => setCurrentScreen('freeDraw')}
        onNavigateToAnimalPainting={() => setCurrentScreen('animalSelection')}
        onNavigateToMagicEraser={() => setCurrentScreen('magicEraserSelection')}
        onNavigateToMyPictures={() => setCurrentScreen('myPictures')}
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
        onSave={(pictureData) => {
          setSavedPictures(prev => [...prev, pictureData]);
          setCurrentScreen('myPictures');
        }}
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

  if (currentScreen === 'myPictures') {
    return (
      <MyPicturesScreen 
        pictures={savedPictures}
        onNavigate={() => setCurrentScreen('home')}
        onSelectPicture={(picture) => {
          setSelectedPicture(picture);
          setCurrentScreen('pictureDetail');
        }}
      />
    );
  }

  if (currentScreen === 'pictureDetail') {
    return (
      <PictureDetailScreen 
        picture={selectedPicture}
        onNavigate={() => setCurrentScreen('myPictures')}
      />
    );
  }

  return <FreeDrawScreen onNavigate={() => setCurrentScreen('home')} />;
}
