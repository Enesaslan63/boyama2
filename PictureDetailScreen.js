import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import Svg, { Path, G, ClipPath, Defs } from 'react-native-svg';
import { Audio } from 'expo-av';
import { AslanSiyahCizgiler } from './hayvan/aslan';
import { KediSiyahCizgiler } from './hayvan/kedi';
import { KopekSiyahCizgiler } from './hayvan/kopek';
import { KusSiyahCizgiler } from './hayvan/kus';
import { KurtSiyahCizgiler } from './hayvan/kurt';
import { MaymunSiyahCizgiler } from './hayvan/maymun';
import { FilSiyahCizgiler } from './hayvan/fil';
import { InekSiyahCizgiler } from './hayvan/inek';
import { KartalSiyahCizgiler } from './hayvan/kartal';
import { BalikSiyahCizgiler } from './hayvan/balik';
import { AyiSiyahCizgiler } from './hayvan/ayi';
import { BalinaSiyahCizgiler } from './hayvan/balina';
import { TavsanSiyahCizgiler } from './hayvan/tavsan';
import { BibalikSiyahCizgiler } from './hayvan/bibalik';
import { YildizSiyahCizgiler } from './hayvan/yildiz';
import { TimsahSiyahCizgiler } from './hayvan/timsah';
import { ZürafaSiyahCizgiler } from './hayvan/zürafa';

const SVG_VIEW_WIDTH = 1024;
const SVG_VIEW_HEIGHT = 1536;

const animalComponents = {
  aslan: AslanSiyahCizgiler,
  kedi: KediSiyahCizgiler,
  kopek: KopekSiyahCizgiler,
  kus: KusSiyahCizgiler,
  kurt: KurtSiyahCizgiler,
  maymun: MaymunSiyahCizgiler,
  fil: FilSiyahCizgiler,
  inek: InekSiyahCizgiler,
  kartal: KartalSiyahCizgiler,
  balik: BalikSiyahCizgiler,
  ayi: AyiSiyahCizgiler,
  balina: BalinaSiyahCizgiler,
  tavsan: TavsanSiyahCizgiler,
  bibalik: BibalikSiyahCizgiler,
  yildiz: YildizSiyahCizgiler,
  timsah: TimsahSiyahCizgiler,
  zürafa: ZürafaSiyahCizgiler,
};

export default function PictureDetailScreen({ picture, onNavigate, isSoundEnabled }) {
  const AnimalComponent = animalComponents[picture.animal];
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

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => { playButtonSound(); onNavigate(); }}>
        <Text style={styles.backButtonText}>← Geri</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>🖼️ {picture.animal}</Text>
        <Text style={styles.date}>{picture.date}</Text>

        <View style={styles.canvasArea}>
          <Svg 
            height="100%" 
            width="100%" 
            viewBox={`0 0 ${SVG_VIEW_WIDTH} ${SVG_VIEW_HEIGHT}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Boyama path'leri */}
            <G>
              {picture.paths.map((item, index) => (
                <Path 
                  key={index} 
                  d={item.d} 
                  stroke={item.color} 
                  strokeWidth={item.strokeWidth}
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              ))}
            </G>
            
            {/* Hayvan çizgileri */}
            {AnimalComponent && <AnimalComponent />}
          </Svg>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 3,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  date: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 15,
  },
  canvasArea: {
    flex: 1,
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginTop: 0,
    marginBottom: 15,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
