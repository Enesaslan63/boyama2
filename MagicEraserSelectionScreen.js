import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image, Dimensions } from 'react-native';
import { Audio } from 'expo-av';

const { width: screenWidth } = Dimensions.get('window');

export default function MagicEraserSelectionScreen({ onSelectImage, onNavigate, isSoundEnabled }) {
  const [buttonSound, setButtonSound] = useState(null);

  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('./assets/ses/button.mp3')
        );
        setButtonSound(sound);
      } catch (error) {
        console.log('Ses yükleme hatası:', error);
      }
    };
    
    loadSound();
    
    return () => {
      if (buttonSound) {
        buttonSound.unloadAsync();
      }
    };
  }, []);

  const playButtonSound = async () => {
    if (!isSoundEnabled) return;
    try {
      if (buttonSound) {
        await buttonSound.replayAsync();
      }
    } catch (error) {
      console.log('Ses çalma hatası:', error);
    }
  };
  const images = [
    { 
      id: 1, 
      name: 'Resim 1', 
      icon: '🎨',
      source: require('./sihirliSilgi/1.resim/1.webp')
    },
    { 
      id: 3, 
      name: 'Resim 3', 
      icon: '✨',
      source: require('./sihirliSilgi/1.resim/3.webp')
    },
    { 
      id: 5, 
      name: 'Resim 5', 
      icon: '🌟',
      source: require('./sihirliSilgi/1.resim/5.jpeg')
    },
    { 
      id: 7, 
      name: 'Resim 7', 
      icon: '🎭',
      source: require('./sihirliSilgi/1.resim/7.jpeg')
    },
    { 
      id: 9, 
      name: 'Resim 9', 
      icon: '🎪',
      source: require('./sihirliSilgi/1.resim/9.jpg')
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => { playButtonSound(); onNavigate(); }}>
          <Text style={styles.backButtonText}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🪄 Sihirli Silgi</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageGrid}>
          {images.map((image) => (
            <TouchableOpacity
              key={image.id}
              style={styles.imageCard}
              onPress={() => { playButtonSound(); onSelectImage(image.id); }}
              activeOpacity={0.8}
            >
              <View style={styles.imagePreview}>
                <Image 
                  source={image.source}
                  style={styles.previewImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.imageIcon}>{image.icon}</Text>
                <Text style={styles.imageName}>{image.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
  },
  header: {
    paddingTop: screenWidth >= 1024 ? 50 : 20,
    paddingHorizontal: 8,
    paddingBottom: 1,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: screenWidth >= 1024 ? 12 : 12,
    paddingVertical: screenWidth >= 1024 ? 6 : 6,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 3,
  },
  backButtonText: {
    fontSize: screenWidth >= 1024 ? 11 : 11,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: screenWidth >= 1024 ? 18 : 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 8,
    paddingTop: 0,
    paddingBottom: 12,
  },
  subtitle: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 12,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  imageCard: {
    width: '25%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  imagePreview: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#1a252f',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    gap: 3,
  },
  imageIcon: {
    fontSize: 10,
  },
  imageName: {
    fontSize: 8,
    fontWeight: 'bold',
    color: 'white',
  },
});
