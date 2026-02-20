import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, SafeAreaView, Animated, ScrollView, Dimensions, ImageBackground } from 'react-native';
import Slider from '@react-native-community/slider';
import Svg, { Path } from 'react-native-svg';
import { Audio } from 'expo-av';

const { width: screenWidth } = Dimensions.get('window');

const SVG_VIEW_WIDTH = 1024;
const SVG_VIEW_HEIGHT = 1536;

export default function FreeDrawScreen({ onNavigate, isSoundEnabled }) {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [color, setColor] = useState('#FF0000');
  const [strokeWidth, setStrokeWidth] = useState(50);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasLayout, setCanvasLayout] = useState({ width: 0, height: 0 });
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelAnimation] = useState(new Animated.Value(0));
  const [isEraser, setIsEraser] = useState(false);
  const [buttonSound, setButtonSound] = useState(null);
  const [paintSound, setPaintSound] = useState(null);

  // Debug: Ekran boyutunu konsola yazdır
  useEffect(() => {
    console.log('Ekran genişliği:', screenWidth);
    console.log('Büyük tablet mi?', screenWidth >= 1024);
  }, []);

  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('./assets/ses/button.mp3')
        );
        setButtonSound(sound);

        const { sound: paintSnd } = await Audio.Sound.createAsync(
          require('./assets/ses/boyama.mp3')
        );
        setPaintSound(paintSnd);
      } catch (error) {
        console.log('Ses yükleme hatası:', error);
      }
    };
    
    loadSound();
    
    return () => {
      if (buttonSound) {
        buttonSound.unloadAsync();
      }
      if (paintSound) {
        paintSound.unloadAsync();
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

  const playPaintSound = async () => {
    if (!isSoundEnabled) return;
    try {
      if (paintSound) {
        await paintSound.setIsLoopingAsync(true);
        await paintSound.playAsync();
      }
    } catch (error) {
      console.log('Ses çalma hatası:', error);
    }
  };

  const stopPaintSound = async () => {
    try {
      if (paintSound) {
        await paintSound.stopAsync();
      }
    } catch (error) {
      console.log('Ses durdurma hatası:', error);
    }
  };

  const colors = [
    '#FF0000', '#FF1744', '#F50057', '#D500F9', 
    '#651FFF', '#3D5AFE', '#2979FF', '#00B0FF',
    '#00E5FF', '#1DE9B6', '#00E676', '#76FF03',
    '#C6FF00', '#FFEA00', '#FFC400', '#FF9100',
    '#FF6D00', '#FF3D00', '#DD2C00', '#BF360C',
    '#795548', '#6D4C41', '#5D4037', '#4E342E',
    '#9E9E9E', '#757575', '#616161', '#424242',
    '#212121', '#000000', '#FFFFFF', '#ECEFF1'
  ];

  const togglePanel = () => {
    playButtonSound();
    const toValue = isPanelOpen ? 0 : 1;
    Animated.spring(panelAnimation, {
      toValue,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
    setIsPanelOpen(!isPanelOpen);
  };

  const panelTranslateX = panelAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [170, 0],
  });

  const undoLastPath = () => {
    playButtonSound();
    if (paths.length > 0) {
      setPaths(paths.slice(0, -1));
    }
  };

  const clearAll = () => {
    playButtonSound();
    setPaths([]);
  };

  const toggleEraser = () => {
    playButtonSound();
    setIsEraser(!isEraser);
  };

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    if (width > 0 && height > 0) {
      setCanvasLayout({ width, height });
    }
  };

  const convertToSVGCoords = (x, y) => {
    if (canvasLayout.width === 0 || canvasLayout.height === 0) return { x, y };
    
    const scaleX = canvasLayout.width / SVG_VIEW_WIDTH;
    const scaleY = canvasLayout.height / SVG_VIEW_HEIGHT;
    const scale = Math.min(scaleX, scaleY);
    
    const scaledWidth = SVG_VIEW_WIDTH * scale;
    const scaledHeight = SVG_VIEW_HEIGHT * scale;
    const offsetX = (canvasLayout.width - scaledWidth) / 2;
    const offsetY = (canvasLayout.height - scaledHeight) / 2;
    
    const svgX = (x - offsetX) / scale;
    const svgY = (y - offsetY) / scale;
    
    return { x: svgX, y: svgY };
  };

  const handleTouchStart = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const svgCoords = convertToSVGCoords(locationX, locationY);
    playPaintSound();
    setIsDrawing(true);
    setCurrentPath([svgCoords]);
  };

  const handleTouchMove = (event) => {
    if (!isDrawing) return;
    const { locationX, locationY } = event.nativeEvent;
    const svgCoords = convertToSVGCoords(locationX, locationY);
    
    // Performans için: Sadece belirli bir mesafeden sonra nokta ekle
    // Tablet için daha büyük mesafe (daha az nokta = daha hızlı)
    const minDistance = screenWidth >= 1024 ? 4 : 2;
    
    if (currentPath.length > 0) {
      const lastPoint = currentPath[currentPath.length - 1];
      const distance = Math.sqrt(
        Math.pow(svgCoords.x - lastPoint.x, 2) + 
        Math.pow(svgCoords.y - lastPoint.y, 2)
      );
      
      if (distance < minDistance) return;
    }
    
    setCurrentPath(prev => [...prev, svgCoords]);
  };

  const handleTouchEnd = () => {
    stopPaintSound();
    if (currentPath.length > 1) {
      // Direkt çizgi kullan (Bezier yerine - daha hızlı)
      const pathString = smoothPath(currentPath);
      setPaths(prev => [...prev, { d: pathString, color: isEraser ? '#FFFFFF' : color, strokeWidth }]);
    }
    setIsDrawing(false);
    setCurrentPath([]);
  };

  // Pürüzsüz path oluştur - Performans için optimize edildi
  const smoothPath = (points) => {
    if (points.length < 2) return '';
    
    // Direkt çizgi çizimi (Bezier yerine) - çok daha hızlı
    const pathParts = [`M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`];
    
    for (let i = 1; i < points.length; i++) {
      pathParts.push(`L${points[i].x.toFixed(1)},${points[i].y.toFixed(1)}`);
    }
    
    return pathParts.join(' ');
  };

  const currentPathString = currentPath.length > 0 
    ? smoothPath(currentPath)
    : '';

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={require('./assets/backgraound.png')} 
        style={styles.backgroundImage}
        resizeMode={screenWidth >= 1024 ? "cover" : "stretch"}
      >
      {/* Geri Butonu */}
      <TouchableOpacity style={styles.backButton} onPress={() => { playButtonSound(); onNavigate(); }}>
        <Text style={styles.backButtonText}>← Geri</Text>
      </TouchableOpacity>

      {/* Canvas - Tam Ekran */}
      <View 
        style={styles.canvasArea}
        onLayout={onLayout}
        onStartShouldSetResponder={() => true}
        onResponderGrant={handleTouchStart}
        onResponderMove={handleTouchMove}
        onResponderRelease={handleTouchEnd}
      >
        <Svg 
          height="100%" 
          width="100%" 
          viewBox={`0 0 ${SVG_VIEW_WIDTH} ${SVG_VIEW_HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Kaydedilmiş çizimler */}
          {paths.map((item, index) => (
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
          
          {/* Şu anki çizim */}
          {currentPathString && (
            <Path 
              d={currentPathString} 
              stroke={isEraser ? '#FFFFFF' : color} 
              strokeWidth={strokeWidth} 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          )}
        </Svg>
      </View>

      {/* Sağ Panel - Animasyonlu */}
      <Animated.View 
        style={[
          styles.sidePanel, 
          { transform: [{ translateX: panelTranslateX }] }
        ]}
      >
        {/* Panel Açma/Kapama Butonu */}
        <TouchableOpacity 
          style={styles.toggleButton}
          onPress={togglePanel}
        >
          <Text style={styles.toggleIcon}>{isPanelOpen ? '→' : '←'}</Text>
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Fırça Kalınlığı */}
          <Text style={styles.sectionTitle}>Fırça Kalınlığı</Text>
          <View style={styles.brushSizeContainer}>
            <View style={styles.brushSizeHeader}>
              <Text style={styles.brushLabel}>
                {strokeWidth <= 30 ? 'İnce' : strokeWidth <= 50 ? 'Orta' : strokeWidth <= 70 ? 'Kalın' : 'Çok Kalın'}
              </Text>
              <Text style={styles.brushSizeValue}>{Math.round(strokeWidth)}px</Text>
            </View>
            
            <View style={styles.brushPreviewContainer}>
              <View style={[
                styles.brushPreviewLarge, 
                { 
                  width: strokeWidth, 
                  height: strokeWidth,
                  backgroundColor: isEraser ? '#999' : color 
                }
              ]} />
            </View>

            <Slider
              style={styles.slider}
              minimumValue={20}
              maximumValue={120}
              value={strokeWidth}
              onValueChange={setStrokeWidth}
              minimumTrackTintColor="#2196F3"
              maximumTrackTintColor="#ddd"
              thumbTintColor="#2196F3"
              step={5}
            />
          </View>

          {/* Renk Paleti */}
          <Text style={styles.sectionTitle}>Renkler</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.colorScrollView}
          >
            {colors.map((c) => (
              <TouchableOpacity 
                key={c} 
                style={[
                  styles.colorBtn, 
                  { backgroundColor: c },
                  color === c && !isEraser && styles.selectedColor,
                  c === '#FFFFFF' && styles.whiteColor
                ]} 
                onPress={() => {
                  playButtonSound();
                  setColor(c);
                  setIsEraser(false);
                }} 
              />
            ))}
          </ScrollView>

          {/* Araçlar */}
          <Text style={styles.sectionTitle}>Araçlar</Text>
          
          {/* Silgi */}
          <TouchableOpacity 
            style={[styles.toolButton, styles.eraserButton, isEraser && styles.eraserActive]} 
            onPress={toggleEraser}
          >
            <Text style={styles.toolIcon}>🧹</Text>
            <Text style={styles.toolText}>{isEraser ? 'Silgi Aktif' : 'Silgi'}</Text>
          </TouchableOpacity>

          {/* Geri Al */}
          <TouchableOpacity 
            style={[styles.toolButton, paths.length === 0 && styles.toolButtonDisabled]} 
            onPress={undoLastPath}
            disabled={paths.length === 0}
          >
            <Text style={styles.toolIcon}>↶</Text>
            <Text style={styles.toolText}>Geri Al ({paths.length})</Text>
          </TouchableOpacity>

          {/* Temizle */}
          <TouchableOpacity 
            style={[styles.toolButton, styles.clearButton]} 
            onPress={clearAll}
          >
            <Text style={styles.toolIcon}>🗑️</Text>
            <Text style={styles.toolText}>Tümünü Temizle</Text>
          </TouchableOpacity>

          {/* Kaydet */}
          <TouchableOpacity 
            style={[styles.toolButton, styles.saveButton]} 
            onPress={() => { playButtonSound(); alert('Resim kaydedildi!'); }}
          >
            <Text style={styles.toolIcon}>💾</Text>
            <Text style={styles.toolText}>Kaydet</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f0f0f0' 
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: screenWidth >= 1024 ? 50 : 10,
    left: screenWidth >= 1024 ? 20 : 10,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: screenWidth >= 1024 ? 20 : 12,
    paddingVertical: screenWidth >= 1024 ? 10 : 6,
    borderRadius: screenWidth >= 1024 ? 20 : 15,
    elevation: 3,
  },
  backButtonText: {
    fontSize: screenWidth >= 1024 ? 16 : 12,
    fontWeight: 'bold',
    color: '#333',
  },
  canvasArea: { 
    flex: 1, 
    backgroundColor: 'white', 
    marginLeft: screenWidth >= 1024 ? 140 : 150,
    marginRight: screenWidth >= 1024 ? 140 : 150,
    marginTop: screenWidth >= 1024 ? 50 : 10,
    marginBottom: screenWidth >= 1024 ? 50 : 40,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  toggleButton: {
    position: 'absolute',
    left: -40,
    top: '50%',
    backgroundColor: 'white',
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 11,
  },
  toggleIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  sidePanel: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 170,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    paddingTop: screenWidth >= 1024 ? 20 : 2,
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  selectedColorDisplay: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
  },
  selectedColorCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#333',
    marginBottom: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  brushSizeContainer: {
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 15,
  },
  brushSizeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  brushSizeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  brushPreviewContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  brushPreviewLarge: {
    borderRadius: 100,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  brushLabel: {
    fontSize: 11,
    color: '#666',
    fontWeight: 'bold',
  },
  colorScrollView: {
    marginBottom: 20,
  },
  colorBtn: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    borderWidth: 2,
    borderColor: '#ddd',
    elevation: 2,
    marginRight: 8,
  },
  whiteColor: {
    borderColor: '#999',
    borderWidth: 2,
  },
  selectedColor: {
    borderColor: '#333',
    borderWidth: 4,
    transform: [{ scale: 1.1 }]
  },
  toolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 3,
  },
  toolButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.5,
  },
  clearButton: {
    backgroundColor: '#FF4444',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  shareButton: {
    backgroundColor: '#FF9800',
  },
  printButton: {
    backgroundColor: '#9C27B0',
  },
  eraserButton: {
    backgroundColor: '#607D8B',
  },
  eraserActive: {
    backgroundColor: '#FF5722',
  },
  toolIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  toolText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
