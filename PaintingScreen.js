import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, SafeAreaView, Animated, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import Svg, { Path, G, ClipPath, Defs } from 'react-native-svg';
import { ElmaSiyahCizgiler } from './meyve/Elma';

const SVG_VIEW_WIDTH = 1024;
const SVG_VIEW_HEIGHT = 1536;

export default function PaintingScreen({ onNavigate }) {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [color, setColor] = useState('#FF0000');
  const [strokeWidth, setStrokeWidth] = useState(50);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasLayout, setCanvasLayout] = useState({ width: 0, height: 0 });
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelAnimation] = useState(new Animated.Value(0));
  const [isEraser, setIsEraser] = useState(false);

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
    outputRange: [300, 0],
  });

  const undoLastPath = () => {
    if (paths.length > 0) {
      setPaths(paths.slice(0, -1));
    }
  };

  const clearAll = () => {
    setPaths([]);
  };

  const toggleEraser = () => {
    setIsEraser(!isEraser);
  };

  const ELMA_GOVDE_YOLU = "M339.5 356.6c-26.8 1.9-50.4 7.3-72.5 16.6-13.5 5.7-19 8.6-19 10.1 0 .6 2.3 3.2 5.1 5.6 6.5 5.5 11.1 12.9 22.8 35.6 15.8 30.6 30.9 51.3 48.6 66.4l8.7 7.4-13.8 4.8c-17 5.8-40.6 17.6-53.4 26.7-17.2 12.1-35.6 31.4-48.1 50.2-30.5 46.1-41.6 108.3-32.3 181.5 3.3 26.2 10.5 56 20.7 86 14.4 42.5 47 105.4 74.5 144 29.5 41.4 57.2 69.6 88.2 90 24.6 16.1 40.1 22 63.9 24.5 17.7 1.7 30.3-.1 67.6-10 25-6.6 32-6.2 62.7 3.5 20 6.3 28.8 7.8 45.3 7.9 16.8 0 25.6-1.5 41.7-6.9 17.8-6.1 32.9-14.8 51.8-30 14-11.2 19.7-16.6 33.6-31.5 26.6-28.5 42.8-52.8 66-99 33.9-67.6 53.8-135.7 58.5-199.9 1.6-21.5.6-53.9-2.1-71.6-9.7-63.6-39.5-113.7-86-144.7-11.9-7.9-36.2-20.1-49.1-24.6-9.2-3.3-29.1-7.3-45.3-9.3-22.2-2.7-56.1.2-86.7 7.5-5.8 1.4-14.5 3-19.3 3.6-8.4 1.2-26.9 1.1-28-.1-.9-.9 4-16.9 8.9-28.4 8.2-19.7 20.4-39.8 35.5-58.9 6.7-8.4 7-9.1 7-14 0-4.2-.6-6.2-3.1-9.9-3.3-5.1-12.1-12.2-19.4-15.7-14-6.8-30.4-6.5-36.7.7-2.3 2.6-10.8 20.8-14.6 31.3-8.5 23.5-15.2 58.6-15.2 79.6v8.5l-3.2-.3-3.3-.3-.7-8c-1-10.3-4.7-24.9-9.3-36.7-17.6-44.5-53.4-75.9-99.4-87.3-14.2-3.5-37.5-5.7-50.6-4.9z";

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
    setIsDrawing(true);
    setCurrentPath([svgCoords]);
  };

  const handleTouchMove = (event) => {
    if (!isDrawing) return;
    const { locationX, locationY } = event.nativeEvent;
    const svgCoords = convertToSVGCoords(locationX, locationY);
    
    // Performans için: Sadece belirli bir mesafeden sonra nokta ekle
    if (currentPath.length > 0) {
      const lastPoint = currentPath[currentPath.length - 1];
      const distance = Math.sqrt(
        Math.pow(svgCoords.x - lastPoint.x, 2) + 
        Math.pow(svgCoords.y - lastPoint.y, 2)
      );
      
      // Minimum 5 birim mesafe varsa ekle
      if (distance < 5) return;
    }
    
    setCurrentPath(prev => [...prev, svgCoords]);
  };

  const handleTouchEnd = () => {
    if (currentPath.length > 1) {
      // Bezier curve kullanarak daha pürüzsüz çizgiler
      const pathString = smoothPath(currentPath);
      setPaths(prev => [...prev, { d: pathString, color: isEraser ? '#FFFFFF' : color, strokeWidth }]);
    }
    setIsDrawing(false);
    setCurrentPath([]);
  };

  // Pürüzsüz path oluştur
  const smoothPath = (points) => {
    if (points.length < 2) return '';
    
    let path = `M${points[0].x},${points[0].y}`;
    
    for (let i = 1; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      path += ` Q${points[i].x},${points[i].y} ${xc},${yc}`;
    }
    
    // Son nokta
    if (points.length > 1) {
      const last = points[points.length - 1];
      path += ` L${last.x},${last.y}`;
    }
    
    return path;
  };

  const currentPathString = currentPath.length > 0 
    ? smoothPath(currentPath)
    : '';

  return (
    <SafeAreaView style={styles.container}>
      {/* Geri Butonu */}
      <TouchableOpacity style={styles.backButton} onPress={onNavigate}>
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
          <Defs>
            <ClipPath id="boyamaMaskesi">
              <Path d={ELMA_GOVDE_YOLU} />
            </ClipPath>
          </Defs>

          <G clipPath="url(#boyamaMaskesi)">
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
          </G>
          
          <ElmaSiyahCizgiler />
        </Svg>
      </View>

      {/* Açma/Kapama Butonu */}
      <TouchableOpacity 
        style={[styles.toggleButton, isPanelOpen && styles.toggleButtonOpen]} 
        onPress={togglePanel}
      >
        <Text style={styles.toggleIcon}>{isPanelOpen ? '→' : '←'}</Text>
      </TouchableOpacity>

      {/* Sağdan Açılır Panel */}
      <Animated.View 
        style={[
          styles.sidePanel, 
          { transform: [{ translateX: panelTranslateX }] }
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Seçili Renk Göstergesi */}
          <View style={styles.selectedColorDisplay}>
            <View style={[
              styles.selectedColorCircle, 
              { backgroundColor: isEraser ? '#FFFFFF' : color },
              isEraser && styles.whiteColor
            ]} />
            <Text style={styles.sectionTitle}>{isEraser ? 'Silgi Modu' : 'Seçili Renk'}</Text>
          </View>

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
          <View style={styles.colorGrid}>
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
                  setColor(c);
                  setIsEraser(false);
                }} 
              />
            ))}
          </View>

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

          {/* Yeniden Yap */}
          <TouchableOpacity 
            style={[styles.toolButton, styles.toolButtonDisabled]} 
            disabled={true}
          >
            <Text style={styles.toolIcon}>↷</Text>
            <Text style={styles.toolText}>Yeniden Yap</Text>
          </TouchableOpacity>

          {/* Temizle */}
          <TouchableOpacity 
            style={[styles.toolButton, styles.clearButton]} 
            onPress={clearAll}
          >
            <Text style={styles.toolIcon}>🗑️</Text>
            <Text style={styles.toolText}>Tümünü Temizle</Text>
          </TouchableOpacity>

          {/* Paylaş */}
          <TouchableOpacity 
            style={[styles.toolButton, styles.shareButton]} 
            onPress={() => alert('Resim paylaşılıyor...')}
          >
            <Text style={styles.toolIcon}>📤</Text>
            <Text style={styles.toolText}>Paylaş</Text>
          </TouchableOpacity>

          {/* Kaydet */}
          <TouchableOpacity 
            style={[styles.toolButton, styles.saveButton]} 
            onPress={() => alert('Resim kaydedildi!')}
          >
            <Text style={styles.toolIcon}>💾</Text>
            <Text style={styles.toolText}>Kaydet</Text>
          </TouchableOpacity>

          {/* Yazdır */}
          <TouchableOpacity 
            style={[styles.toolButton, styles.printButton]} 
            onPress={() => alert('Yazdırma hazırlanıyor...')}
          >
            <Text style={styles.toolIcon}>🖨️</Text>
            <Text style={styles.toolText}>Yazdır</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f0f0f0' 
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
  canvasArea: { 
    flex: 1,
    backgroundColor: 'white', 
    margin: 15,
    marginTop: 100,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  toggleButton: {
    position: 'absolute',
    right: 0,
    top: '50%',
    backgroundColor: '#4CAF50',
    width: 40,
    height: 80,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 5,
  },
  toggleButtonOpen: {
    right: 300,
  },
  toggleIcon: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  sidePanel: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    paddingTop: 100,
    paddingHorizontal: 20,
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
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  colorBtn: { 
    width: 45, 
    height: 45, 
    borderRadius: 22.5, 
    borderWidth: 2,
    borderColor: '#ddd',
    elevation: 2,
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
});
