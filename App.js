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
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [editingPicture, setEditingPicture] = useState(null);

  if (currentScreen === 'home') {
    return (
      <HomeScreen 
        onNavigateToFreeDraw={() => setCurrentScreen('freeDraw')}
        onNavigateToAnimalPainting={() => setCurrentScreen('animalSelection')}
        onNavigateToMagicEraser={() => setCurrentScreen('magicEraserSelection')}
        onNavigateToMyPictures={() => setCurrentScreen('myPictures')}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={() => setIsSoundEnabled(!isSoundEnabled)}
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
        isSoundEnabled={isSoundEnabled}
      />
    );
  }

  if (currentScreen === 'animalPainting') {
    return (
      <AnimalPaintingScreen 
        initialAnimal={editingPicture ? editingPicture.animal : selectedAnimal}
        initialPaths={editingPicture ? editingPicture.paths : []}
        onNavigate={() => {
          if (editingPicture) {
            // Düzenleme modundan geri dönüyorsa resimlerim sayfasına git
            setEditingPicture(null);
            setCurrentScreen('myPictures');
          } else {
            // Normal modda hayvan seçme sayfasına git
            setCurrentScreen('animalSelection');
          }
        }}
        onSave={(pictureData) => {
          if (editingPicture) {
            // Düzenleme modunda - mevcut resmi güncelle
            setSavedPictures(prev => prev.map(pic => 
              pic.id === editingPicture.id ? { ...pictureData, id: editingPicture.id } : pic
            ));
            setEditingPicture(null);
          } else {
            // Yeni resim ekleme
            setSavedPictures(prev => [...prev, pictureData]);
          }
          setCurrentScreen('myPictures');
        }}
        isSoundEnabled={isSoundEnabled}
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
        isSoundEnabled={isSoundEnabled}
      />
    );
  }

  if (currentScreen === 'magicEraser') {
    return (
      <MagicEraserScreen 
        imageId={selectedMagicImage}
        onNavigate={() => setCurrentScreen('magicEraserSelection')}
        isSoundEnabled={isSoundEnabled}
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
        isSoundEnabled={isSoundEnabled}
      />
    );
  }

  if (currentScreen === 'pictureDetail') {
    return (
      <PictureDetailScreen 
        picture={selectedPicture}
        onNavigate={() => setCurrentScreen('myPictures')}
        onEdit={(picture) => {
          setEditingPicture(picture);
          setCurrentScreen('animalPainting');
        }}
        isSoundEnabled={isSoundEnabled}
      />
    );
  }

  return <FreeDrawScreen onNavigate={() => setCurrentScreen('home')} isSoundEnabled={isSoundEnabled} />;
}
