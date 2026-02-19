import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
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

export default function MyPicturesScreen({ onNavigate, pictures = [], onSelectPicture, isSoundEnabled }) {
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
      <ImageBackground 
        source={require('./assets/backgraound.png')} 
        style={styles.backgroundImage}
        resizeMode={screenWidth >= 1024 ? "cover" : "stretch"}
      >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => { playButtonSound(); onNavigate(); }}>
          <Text style={styles.backButtonText}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🖼️ Resimlerim ({pictures.length})</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {pictures.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🎨</Text>
            <Text style={styles.emptyTitle}>Henüz resim yok</Text>
            <Text style={styles.emptyText}>Boyama yaptıktan sonra kaydettiğin resimler burada görünecek</Text>
          </View>
        ) : (
          <View style={styles.picturesGrid}>
            {pictures.map((picture) => {
              const AnimalComponent = animalComponents[picture.animal];
              return (
                <TouchableOpacity 
                  key={picture.id} 
                  style={styles.pictureCard}
                  onPress={() => { playButtonSound(); onSelectPicture(picture); }}
                  activeOpacity={0.7}
                >
                  <View style={styles.picturePreview}>
                    <Svg width="100%" height="100%" viewBox="0 0 1024 1536" preserveAspectRatio="xMidYMid meet">
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
                  <View style={styles.pictureInfo}>
                    <Text style={styles.pictureAnimal}>{picture.animal}</Text>
                    <Text style={styles.pictureDate}>{picture.date}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
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
    paddingTop: 50,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  backButtonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 20,
  },
  picturesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
  },
  pictureCard: {
    width: '22%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  picturePreview: {
    width: '100%',
    aspectRatio: 2/3,
    backgroundColor: '#fff',
  },
  pictureInfo: {
    padding: 5,
    alignItems: 'center',
  },
  pictureAnimal: {
    fontSize: 9,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
    textTransform: 'capitalize',
  },
  pictureDate: {
    fontSize: 7,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
