import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

export default function HomeScreen({ onNavigateToPainting, onNavigateToFreeDraw }) {
  const categories = [
    { id: 1, title: 'Serbest Çizim', color: ['#FF9A9E', '#FAD0C4'], icon: '✏️', badge: 'Popüler', route: 'freeDraw' },
    { id: 2, title: 'Resim Boyama', color: ['#A8E063', '#56AB2F'], icon: '🎨', route: 'painting' },
    { id: 3, title: 'Hayvan Boyama', color: ['#FF6B9D', '#C06C84'], icon: '🐾', badge: 'Yeni' },
    { id: 4, title: 'Eğlenceli Şekiller', color: ['#FFA751', '#FFE259'], icon: '✨' },
    { id: 5, title: 'Resimlerim', color: ['#4FACFE', '#00F2FE'], icon: '🖼️' },
    { id: 6, title: 'Sihirli Silgi', color: ['#A18CD1', '#FBC2EB'], icon: '🪄', badge: 'Yeni' },
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
              if (category.route === 'painting') onNavigateToPainting();
              else if (category.route === 'freeDraw') onNavigateToFreeDraw();
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
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
    marginTop: 20,
    marginBottom: 30,
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoIcon: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 3,
    marginTop: 5,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 15,
  },
  cardWrapper: {
    width: '45%',
    aspectRatio: 1,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  cardIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  footer: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginTop: 'auto',
    marginBottom: 20,
  },
});
