import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image, Dimensions, ImageBackground } from 'react-native';
import Svg, { Path, Defs, Mask, Rect, Image as SvgImage, ClipPath } from 'react-native-svg';
import { Audio } from 'expo-av';

const { width, height } = Dimensions.get('window');
const screenWidth = width;

// Serbest boyamadaki canvas ile aynı boyutlar - daha büyük
const IMAGE_WIDTH = screenWidth >= 1024 ? width * 0.7 : width - 300; 
const IMAGE_HEIGHT = screenWidth >= 1024 ? height * 0.75 : height * 0.85; 
const CORNER_RADIUS = IMAGE_WIDTH * 0.10; 

export default function MagicEraserScreen({ onNavigate, imageId = 1, isSoundEnabled }) {
  const [eraserPaths, setEraserPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize] = useState(50);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [buttonSound, setButtonSound] = useState(null);
  const [eraserSound, setEraserSound] = useState(null);

  useEffect(() => {
    // Ses dosyalarını yükle
    const loadSounds = async () => {
      try {
        const { sound: btnSound } = await Audio.Sound.createAsync(
          require('./assets/ses/button.mp3')
        );
        setButtonSound(btnSound);

        const { sound: erSound } = await Audio.Sound.createAsync(
          require('./assets/ses/sihirlisilgi.mp3')
        );
        setEraserSound(erSound);
      } catch (error) {
        console.log('Ses yükleme hatası:', error);
      }
    };
    
    loadSounds();
    
    // Cleanup
    return () => {
      if (buttonSound) {
        buttonSound.unloadAsync();
      }
      if (eraserSound) {
        eraserSound.unloadAsync();
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

  const playEraserSound = async () => {
    if (!isSoundEnabled) return;
    try {
      if (eraserSound) {
        await eraserSound.setIsLoopingAsync(true);
        await eraserSound.playAsync();
      }
    } catch (error) {
      console.log('Ses çalma hatası:', error);
    }
  };

  const stopEraserSound = async () => {
    try {
      if (eraserSound) {
        await eraserSound.stopAsync();
      }
    } catch (error) {
      console.log('Ses durdurma hatası:', error);
    }
  };

  const handleTouchStart = (event) => {
    if (isButtonPressed) return;
    const { locationX, locationY } = event.nativeEvent;
    
    // Başlangıç noktası resim içinde mi kontrol et
    if (locationX < 0 || locationX > IMAGE_WIDTH || locationY < 0 || locationY > IMAGE_HEIGHT) {
      return;
    }
    
    playEraserSound();
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
    stopEraserSound();
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
    playButtonSound();
    setEraserPaths([]);
    setCurrentPath([]);
    setIsButtonPressed(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={require('./assets/backgraound.png')} 
        style={styles.backgroundImage}
        resizeMode={screenWidth >= 1024 ? "cover" : "stretch"}
      >
      <TouchableOpacity style={styles.backButton} onPress={() => { playButtonSound(); onNavigate(); }}>
        <Text style={styles.backButtonText}>← Geri</Text>
      </TouchableOpacity>

      <View style={styles.content}>
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
                  imageId === 9 ? require('./sihirliSilgi/1.resim/10.jpeg') :
                  imageId === 10 ? require('./sihirliSilgi/1.resim/10.jpeg') :
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
                  imageId === 9 ? require('./sihirliSilgi/1.resim/9.jpg') :
                  imageId === 10 ? require('./sihirliSilgi/1.resim/10.jpeg') :
                  require('./sihirliSilgi/1.resim/6.jpeg')
                }
                preserveAspectRatio="xMidYMid slice"
                mask="url(#eraserMask)"
                clipPath="url(#roundedClip)"
              />
            </Svg>
          </View>
        </View>
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: screenWidth >= 1024 ? 50 : 5,
    left: screenWidth >= 1024 ? 20 : 10,
    zIndex: 10,
    backgroundColor: '#fff',
    paddingHorizontal: screenWidth >= 1024 ? 12 : 12,
    paddingVertical: screenWidth >= 1024 ? 6 : 6,
    borderRadius: 10,
  },
  backButtonText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: screenWidth >= 1024 ? 12 : 11,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: screenWidth >= 1024 ? 0 : 150,
    paddingTop: screenWidth >= 1024 ? 0 : 10,
    paddingBottom: screenWidth >= 1024 ? 0 : 40,
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
    marginTop: screenWidth >= 1024 ? 40 : 20,
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