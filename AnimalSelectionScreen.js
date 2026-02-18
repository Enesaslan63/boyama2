import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

export default function AnimalSelectionScreen({ onSelectAnimal, onNavigate }) {
  const animals = [
    { id: 'aslan', name: 'Aslan', icon: '🦁', color: '#FFB74D' },
    { id: 'kedi', name: 'Kedi', icon: '🐱', color: '#FF8A65' },
    { id: 'kopek', name: 'Köpek', icon: '🐕', color: '#8D6E63' },
    { id: 'kus', name: 'Kuş', icon: '🐦', color: '#42A5F5' },
    { id: 'kurt', name: 'Kurt', icon: '🐺', color: '#78909C' },
    { id: 'maymun', name: 'Maymun', icon: '🐵', color: '#A1887F' },
    { id: 'fil', name: 'Fil', icon: '🐘', color: '#90A4AE' },
    { id: 'inek', name: 'İnek', icon: '🐄', color: '#BCAAA4' },
    { id: 'kartal', name: 'Kartal', icon: '🦅', color: '#795548' },
    { id: 'balik', name: 'Balık', icon: '🐟', color: '#4FC3F7' },
    { id: 'ayi', name: 'Ayı', icon: '🐻', color: '#8D6E63' },
    { id: 'balina', name: 'Balina', icon: '🐋', color: '#29B6F6' },
    { id: 'tavsan', name: 'Tavşan', icon: '🐰', color: '#BCAAA4' },
    { id: 'bibalik', name: 'Köpekbalığı', icon: '🦈', color: '#546E7A' },
    { id: 'yildiz', name: 'Yıldız', icon: '⭐', color: '#FFD54F' },
    { id: 'timsah', name: 'Timsah', icon: '🐊', color: '#689F38' },
    { id: 'zürafa', name: 'Zürafa', icon: '🦒', color: '#FFA726' },
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
              style={[styles.animalCard, { backgroundColor: animal.color }]}
              onPress={() => onSelectAnimal(animal.id)}
              activeOpacity={0.8}
            >
              <View style={styles.cardContent}>
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
    width: '15%',
    aspectRatio: 0.75,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  animalIcon: {
    fontSize: 16,
    marginBottom: 1,
  },
  animalName: {
    fontSize: 6,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
});
