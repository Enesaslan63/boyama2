import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Svg from 'react-native-svg';
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
import { PenguenSiyahCizgiler } from './hayvan/penguen';

export default function AnimalSelectionScreen({ onSelectAnimal, onNavigate }) {
  const animals = [
    { id: 'aslan', name: 'Aslan', icon: '🦁', color: '#FFB74D', Component: AslanSiyahCizgiler },
    { id: 'kedi', name: 'Kedi', icon: '🐱', color: '#FF8A65', Component: KediSiyahCizgiler },
    { id: 'kopek', name: 'Köpek', icon: '🐕', color: '#8D6E63', Component: KopekSiyahCizgiler },
    { id: 'kus', name: 'Kuş', icon: '🐦', color: '#42A5F5', Component: KusSiyahCizgiler },
    { id: 'kurt', name: 'Kurt', icon: '🐺', color: '#78909C', Component: KurtSiyahCizgiler },
    { id: 'maymun', name: 'Maymun', icon: '🐵', color: '#A1887F', Component: MaymunSiyahCizgiler },
    { id: 'fil', name: 'Fil', icon: '🐘', color: '#90A4AE', Component: FilSiyahCizgiler },
    { id: 'inek', name: 'İnek', icon: '🐄', color: '#BCAAA4', Component: InekSiyahCizgiler },
    { id: 'kartal', name: 'Kartal', icon: '🦅', color: '#795548', Component: KartalSiyahCizgiler },
    { id: 'balik', name: 'Balık', icon: '🐟', color: '#4FC3F7', Component: BalikSiyahCizgiler },
    { id: 'ayi', name: 'Ayı', icon: '🐻', color: '#8D6E63', Component: AyiSiyahCizgiler },
    { id: 'balina', name: 'Balina', icon: '🐋', color: '#29B6F6', Component: BalinaSiyahCizgiler },
    { id: 'tavsan', name: 'Tavşan', icon: '🐰', color: '#BCAAA4', Component: TavsanSiyahCizgiler },
    { id: 'bibalik', name: 'Köpekbalığı', icon: '🦈', color: '#546E7A', Component: BibalikSiyahCizgiler },
    { id: 'yildiz', name: 'Yıldız', icon: '⭐', color: '#FFD54F', Component: YildizSiyahCizgiler },
    { id: 'timsah', name: 'Timsah', icon: '🐊', color: '#689F38', Component: TimsahSiyahCizgiler },
    { id: 'zürafa', name: 'Zürafa', icon: '🦒', color: '#FFA726', Component: ZürafaSiyahCizgiler },
    { id: 'penguen', name: 'Penguen', icon: '🐧', color: '#546E7A', Component: PenguenSiyahCizgiler },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onNavigate}>
          <Text style={styles.backButtonText}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Hayvan Seç</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>Boyamak istediğin hayvanı seç</Text>
        
        <View style={styles.animalGrid}>
          {animals.map((animal) => (
            <TouchableOpacity
              key={animal.id}
              style={styles.animalCard}
              onPress={() => onSelectAnimal(animal.id)}
              activeOpacity={0.8}
            >
              <View style={styles.imagePreview}>
                <Svg width="100%" height="100%" viewBox="0 0 1024 1536" preserveAspectRatio="xMidYMid meet">
                  <animal.Component />
                </Svg>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.animalIcon}>{animal.icon}</Text>
                <Text style={styles.animalName}>{animal.name}</Text>
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
    paddingTop: 8,
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
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
  subtitle: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 12,
  },
  animalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 5,
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
