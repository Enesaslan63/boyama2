import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native';
import Svg, { Path, Defs, Mask, Rect, Image as SvgImage, ClipPath } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// GENİŞLİK: Dar dikey form (sağa sola yayılmaz)
const IMAGE_WIDTH = width * 0.65; 
// YÜKSEKLİK: Dikey uzunluk korunur
const IMAGE_HEIGHT = height * 0.65; 
// KÖŞE RADIUS: Genişliğin %10'u kadar (Hafif yumuşatılmış köşeler)
const CORNER_RADIUS = IMAGE_WIDTH * 0.10; 

export default function MagicEraserScreen({ onNavigate, imageId = 1 }) {
  const [eraserPaths, setEraserPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize] = useState(50);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleTouchStart = (event) => {
    if (isButtonPressed) return;
    const { locationX, locationY } = event.nativeEvent;
    
    // Başlangıç noktası resim içinde mi kontrol et
    if (locationX < 0 || locationX > IMAGE_WIDTH || locationY < 0 || locationY > IMAGE_HEIGHT) {
      return;
    }
    
    setIsDrawing(true);
    setCurrentPath([{ x: locationX, y: locationY }]);
  };

  const handleTouchMove = (event) => {
    if (!isDrawing || isButtonPressed) return;
    const { locationX, locationY } = event.nativeEvent;
    
    // Resim alanının 10px dışına çıkıldığında çizimi durdur
    const margin = 10;
    if (locationX < -margin || locationX > IMAGE_WIDTH + margin || 
        locationY < -margin || locationY > IMAGE_HEIGHT + margin) {
      handleTouchEnd();
      return;
    }
    
    // Koordinatları resim sınırları içinde tut
    const clampedX = Math.max(0, Math.min(IMAGE_WIDTH, locationX));
    const clampedY = Math.max(0, Math.min(IMAGE_HEIGHT, locationY));
    
    setCurrentPath(prev => [...prev, { x: clampedX, y: clampedY }]);
  };

  const handleTouchEnd = () => {
    if (isDrawing && currentPath.length > 0 && !isButtonPressed) {
      setEraserPaths(prev => [...prev, currentPath]);
    }
    setIsDrawing(false);
    setCurrentPath([]);
  };

  const createPathString = (points) => {
    if (points.length === 0) return '';
    let path = `M${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L${points[i].x},${points[i].y}`;
    }
    return path;
  };

  const clearAll = () => {
    setEraserPaths([]);
    setCurrentPath([]);
    setIsButtonPressed(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onNavigate}>
        <Text style={styles.backButtonText}>← Geri</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>🪄 Sihirli Silgi</Text>
        <Text style={styles.subtitle}>%10 kavisli alanı temizle!</Text>

        <View style={styles.imageWrapper}>
          <View 
            style={styles.imageContainer}
            onStartShouldSetResponder={() => true}
            onResponderGrant={handleTouchStart}
            onResponderMove={handleTouchMove}
            onResponderRelease={handleTouchEnd}
            onResponderTerminate={handleTouchEnd}
          >
            {/* Alt Katman: Temiz Resim (View seviyesinde %10 radius) */}
            <View style={styles.roundedClipper}>
              <Image 
                source={
                  imageId === 1 ? require('./sihirliSilgi/1.resim/2.webp') :
                  imageId === 3 ? require('./sihirliSilgi/1.resim/4.webp') :
                  imageId === 5 ? require('./sihirliSilgi/1.resim/6.jpeg') :
                  imageId === 7 ? require('./sihirliSilgi/1.resim/8.jpeg') :
                  require('./sihirliSilgi/1.resim/6.jpeg')
                }
                style={[
                  styles.fullImage,
                  imageId === 3 && { marginLeft: -5 }
                ]}
                resizeMode="cover"
              />
            </View>
            
            {/* Üst Katman: Maskeli Resim (SVG seviyesinde %10 radius) */}
            <Svg width={IMAGE_WIDTH} height={IMAGE_HEIGHT} style={styles.svgContainer}>
              <Defs>
                <ClipPath id="roundedClip">
                  <Rect 
                    x="0" y="0" 
                    width={IMAGE_WIDTH} height={IMAGE_HEIGHT} 
                    rx={CORNER_RADIUS} ry={CORNER_RADIUS} 
                  />
                </ClipPath>
                
                <Mask id="eraserMask">
                  <Rect 
                    x="0" y="0" 
                    width={IMAGE_WIDTH} height={IMAGE_HEIGHT} 
                    fill="white" 
                    rx={CORNER_RADIUS} ry={CORNER_RADIUS} 
                  />
                  {[...eraserPaths, currentPath].map((path, index) => (
                    <Path
                      key={`path-${index}`}
                      d={createPathString(path)}
                      stroke="black"
                      strokeWidth={brushSize}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ))}
                </Mask>
              </Defs>
              
              <SvgImage
                x="0"
                y="0"
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
                href={
                  imageId === 1 ? require('./sihirliSilgi/1.resim/1.webp') :
                  imageId === 3 ? require('./sihirliSilgi/1.resim/3.webp') :
                  imageId === 5 ? require('./sihirliSilgi/1.resim/5.jpeg') :
                  imageId === 7 ? require('./sihirliSilgi/1.resim/7.jpeg') :
                  require('./sihirliSilgi/1.resim/6.jpeg')
                }
                preserveAspectRatio="xMidYMid slice"
                mask="url(#eraserMask)"
                clipPath="url(#roundedClip)"
              />
            </Svg>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.clearButton} 
          onPress={clearAll}
          onPressIn={() => {
            setIsButtonPressed(true);
            setIsDrawing(false);
            setCurrentPath([]);
          }}
          onPressOut={() => {
            setTimeout(() => setIsButtonPressed(false), 100);
          }}
        >
          <Text style={styles.clearButtonText}>🔄 Yeniden Başlat</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  backButtonText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 12,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 25,
  },
  imageWrapper: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  imageContainer: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
  roundedClipper: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: CORNER_RADIUS,
    overflow: 'hidden',
    position: 'absolute',
  },
  fullImage: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  clearButton: {
    marginTop: 40,
    backgroundColor: '#6C63FF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  clearButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
});