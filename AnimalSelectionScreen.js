import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, ImageBackground } from 'react-native';
import Svg from 'react-native-svg';
import { Audio } from 'expo-av';

const { width: screenWidth } = Dimensions.get('window');
import { AslanSiyahCizgiler } from './hayvan/aslan';
import { KediSiyahCizgiler } from './hayvan/kedi';
import { KopekSiyahCizgiler } from './hayvan/kopek';
import { KusSiyahCizgiler } from './hayvan/kus';
import { KurtSiyahCizgiler } from './hayvan/kurt';
import { MaymunSiyahCizgiler } from './hayvan/maymun';
import { FilSiyahCizgiler } from './hayvan/fil';
import { InekSiyahCizgiler } from './hayvan/inek';
import { KartalSiyahCizgiler } from './hayvan/kartal';
import { TimsahSiyahCizgiler } from './hayvan/timsah';
import { ZürafaSiyahCizgiler } from './hayvan/zürafa';
import { PenguenSiyahCizgiler } from './hayvan/penguen';

export default function AnimalSelectionScreen({ onSelectAnimal, onNavigate, isSoundEnabled }) {
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
  const animals = [
    { id: 'aslan', Component: AslanSiyahCizgiler },
    { id: 'kedi', Component: KediSiyahCizgiler },
    { id: 'kopek', Component: KopekSiyahCizgiler },
    { id: 'kus', Component: KusSiyahCizgiler },
    { id: 'kurt', Component: KurtSiyahCizgiler },
    { id: 'maymun', Component: MaymunSiyahCizgiler },
    { id: 'fil', Component: FilSiyahCizgiler },
    { id: 'inek', Component: InekSiyahCizgiler },
    { id: 'kartal', Component: KartalSiyahCizgiler },
    { id: 'timsah', Component: TimsahSiyahCizgiler },
    { id: 'zürafa', Component: ZürafaSiyahCizgiler },
    { id: 'penguen', Component: PenguenSiyahCizgiler },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={require('./assets/backgraound.png')} 
        style={styles.backgroundImage}
        resizeMode={screenWidth >= 1024 ? "cover" : "stretch"}
      >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => { playButtonSound(); onNavigate(); }}>
          <Text style={styles.backButtonText}>← Geri</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.animalGrid}>
          {animals.map((animal) => (
            <TouchableOpacity
              key={animal.id}
              style={styles.animalCard}
              onPress={() => { playButtonSound(); onSelectAnimal(animal.id); }}
              activeOpacity={0.8}
            >
              <View style={styles.imagePreview}>
                <Svg width="100%" height="100%" viewBox="150 50 624 936" preserveAspectRatio="xMidYMid meet">
                  <animal.Component />
                </Svg>
              </View>
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
  header: {
    paddingTop: screenWidth >= 1024 ? 50 : 20,
    paddingHorizontal: 8,
    paddingBottom: 1,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: screenWidth >= 1024 ? 10 : 12,
    paddingVertical: screenWidth >= 1024 ? 5 : 6,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 3,
  },
  backButtonText: {
    fontSize: screenWidth >= 1024 ? 10 : 11,
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 0,
    paddingBottom: 12,
  },
  animalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    maxWidth: '100%',
  },
  animalCard: {
    width: '25%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  imagePreview: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    gap: 3,
  },
  animalIcon: {
    fontSize: 10,
  },
  animalName: {
    fontSize: 8,
    fontWeight: 'bold',
    color: 'white',
  },
});
