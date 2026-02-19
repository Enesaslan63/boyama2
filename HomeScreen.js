import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';

export default function HomeScreen({ onNavigateToFreeDraw, onNavigateToAnimalPainting, onNavigateToMagicEraser }) {
  const categories = [
    { id: 1, title: 'Serbest Çizim', color: ['#FF9A9E', '#FAD0C4'], icon: '✏️', badge: 'Popüler', route: 'freeDraw' },
    { id: 3, title: 'Hayvan Boyama', color: ['#FF6B9D', '#C06C84'], icon: '🦁', badge: 'Yeni', route: 'animalPainting' },
    { id: 4, title: 'Eğlenceli Şekiller', color: ['#FFA751', '#FFE259'], icon: '✨' },
    { id: 5, title: 'Resimlerim', color: ['#4FACFE', '#00F2FE'], icon: '🖼️' },
    { id: 6, title: 'Sihirli Silgi', color: ['#A18CD1', '#FBC2EB'], icon: '🪄', badge: 'Yeni', route: 'magicEraser' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
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
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo ve Başlık */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🎨</Text>
          </View>
          <Text style={styles.title}>ART MASTER</Text>
          <Text style={styles.subtitle}>CREATIVE STUDIO</Text>
        </View>

        {/* Kategoriler Grid */}
        <View style={styles.gridContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.cardWrapper, { backgroundColor: category.color[0] }]}
              onPress={() => {
                if (category.route === 'freeDraw') onNavigateToFreeDraw();
                else if (category.route === 'animalPainting') onNavigateToAnimalPainting();
                else if (category.route === 'magicEraser') onNavigateToMagicEraser();
              }}
              activeOpacity={0.8}
            >
              <View style={styles.card}>
                {category.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{category.badge}</Text>
                  </View>
                )}
                <Text style={styles.cardIcon}>{category.icon}</Text>
                <Text style={styles.cardTitle}>{category.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>✨ Yaratıcılığın Keşfet ✨</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
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
    marginTop: 8,
    marginBottom: 8,
  },
  logoContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoIcon: {
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 7,
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 1.5,
    marginTop: 2,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 8,
    gap: 5,
  },
  cardWrapper: {
    width: '15%',
    aspectRatio: 0.7,
    marginBottom: 2,
    borderRadius: 20,
    overflow: 'hidden',
  },
  card: {
    flex: 1,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 1,
    right: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 2,
    paddingVertical: 0.5,
    borderRadius: 3,
  },
  badgeText: {
    fontSize: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  cardIcon: {
    fontSize: 16,
    marginBottom: 1,
  },
  cardTitle: {
    fontSize: 6,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  footer: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 9,
    marginTop: 10,
    marginBottom: 10,
  },
});
