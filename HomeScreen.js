import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { Audio } from 'expo-av';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen({ onNavigateToFreeDraw, onNavigateToAnimalPainting, onNavigateToMagicEraser, onNavigateToMyPictures, isSoundEnabled, onToggleSound }) {
  const [buttonSound, setButtonSound] = useState(null);
  const { width: currentScreenWidth } = Dimensions.get('window');
  const isTablet = currentScreenWidth >= 1024;

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
  const categories = [
    { id: 1, title: 'Serbest Boyama', color: '#FF6B9D', shadowColor: '#FF1744', icon: '🎨', route: 'freeDraw' },
    { id: 3, title: 'Hayvan Boyama', color: '#FFA726', shadowColor: '#F57C00', icon: '🦁', route: 'animalPainting' },
    { id: 6, title: 'Sihirli Silgi', color: '#AB47BC', shadowColor: '#7B1FA2', icon: '✨', route: 'magicEraser' },
    { id: 5, title: 'Resimlerim', color: '#42A5F5', shadowColor: '#1976D2', icon: '🖼️', route: 'myPictures' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ImageBackground 
        source={require('./assets/backgraound.png')} 
        style={styles.backgroundImage}
        resizeMode={isTablet ? "cover" : "stretch"}
      >
      
      {/* Yıldızlı arka plan */}
      <View style={styles.starsContainer}>
        {[...Array(20)].map((_, i) => (
          <View 
            key={i} 
            style={[
              styles.star, 
              { 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3
              }
            ]} 
          />
        ))}
      </View>

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: isTablet ? 220 : 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Ses Açma/Kapatma Butonu */}
        <TouchableOpacity 
          style={styles.soundButton}
          onPress={() => {
            playButtonSound();
            onToggleSound();
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.soundIcon}>{isSoundEnabled ? '🔊' : '🔇'}</Text>
        </TouchableOpacity>

        {/* Kategoriler Grid */}
        <View style={styles.gridContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.cardWrapper}
              onPress={() => {
                playButtonSound();
                if (category.route === 'freeDraw') onNavigateToFreeDraw();
                else if (category.route === 'animalPainting') onNavigateToAnimalPainting();
                else if (category.route === 'magicEraser') onNavigateToMagicEraser();
                else if (category.route === 'myPictures') onNavigateToMyPictures();
              }}
              activeOpacity={0.8}
            >
              <View style={[styles.card, { backgroundColor: category.color }]}>
                <View style={styles.iconContainer}>
                  <Text style={styles.cardIcon}>{category.icon}</Text>
                </View>
                <Text style={styles.cardTitle}>{category.title}</Text>
              </View>
              <View style={[styles.cardShadow, { backgroundColor: category.shadowColor }]} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  starsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  star: {
    position: 'absolute',
    width: 3,
    height: 3,
    backgroundColor: 'white',
    borderRadius: 1.5,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  logoContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoIcon: {
    fontSize: 14,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1.2,
  },
  subtitle: {
    fontSize: 6,
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 1.2,
    marginTop: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: screenWidth >= 1024 ? 40 : 20,
    gap: screenWidth >= 1024 ? 15 : 10,
  },
  cardWrapper: {
    width: screenWidth >= 1024 ? '40%' : '38%',
    maxWidth: screenWidth >= 1024 ? 180 : 110,
    aspectRatio: 1,
    marginBottom: 10,
    position: 'relative',
  },
  card: {
    flex: 1,
    borderRadius: screenWidth >= 1024 ? 25 : 16,
    padding: screenWidth >= 1024 ? 15 : 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: screenWidth >= 1024 ? 4 : 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    transform: [{ translateY: screenWidth >= 1024 ? -5 : -2 }],
  },
  cardShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    borderRadius: screenWidth >= 1024 ? 25 : 16,
    zIndex: -1,
  },
  badge: {
    position: 'absolute',
    top: screenWidth >= 1024 ? 10 : 6,
    right: screenWidth >= 1024 ? 10 : 6,
    backgroundColor: '#FFD700',
    paddingHorizontal: screenWidth >= 1024 ? 10 : 6,
    paddingVertical: screenWidth >= 1024 ? 4 : 2,
    borderRadius: screenWidth >= 1024 ? 15 : 10,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  badgeText: {
    fontSize: screenWidth >= 1024 ? 10 : 7,
    fontWeight: 'bold',
    color: '#FF6B00',
  },
  iconContainer: {
    width: screenWidth >= 1024 ? 60 : 35,
    height: screenWidth >= 1024 ? 60 : 35,
    borderRadius: screenWidth >= 1024 ? 30 : 17.5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: screenWidth >= 1024 ? 10 : 5,
    borderWidth: screenWidth >= 1024 ? 3 : 2,
    borderColor: 'white',
  },
  cardIcon: {
    fontSize: screenWidth >= 1024 ? 35 : 22,
  },
  cardTitle: {
    fontSize: screenWidth >= 1024 ? 16 : 10,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  footer: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 18,
    marginTop: 30,
    marginBottom: 20,
    fontWeight: '600',
  },
  soundButton: {
    position: 'absolute',
    top: screenWidth >= 1024 ? 50 : 30,
    right: 25,
    width: screenWidth >= 1024 ? 60 : 50,
    height: screenWidth >= 1024 ? 60 : 50,
    borderRadius: screenWidth >= 1024 ? 30 : 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  soundIcon: {
    fontSize: screenWidth >= 1024 ? 30 : 25,
  },
});
