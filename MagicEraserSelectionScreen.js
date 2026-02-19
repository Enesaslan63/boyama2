import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';

export default function MagicEraserSelectionScreen({ onSelectImage, onNavigate }) {
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
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onNavigate}>
          <Text style={styles.backButtonText}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🪄 Sihirli Silgi</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>Silmek istediğin resmi seç</Text>
        
        <View style={styles.imageGrid}>
          {images.map((image) => (
            <TouchableOpacity
              key={image.id}
              style={styles.imageCard}
              onPress={() => onSelectImage(image.id)}
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
