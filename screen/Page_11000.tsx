import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { CameraScreen } from 'react-native-camera-kit';

const Page_11000 = ({ navigation }) => {
  const [scanned, setScanned] = useState(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!scanned) {
        navigation.navigate('Page_12100', { deviceData: '' });
      }
    }, 5000);
    setTimerId(timer);
    return () => clearTimeout(timer);
  }, [scanned]);


  const handleQRCodeScan = (event) => {
    setScanned(true);
    clearTimeout(timerId);
    navigation.navigate('Page_12100', { deviceData: event.nativeEvent.codeStringValue });
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.vector,{zIndex: 1}]}>
          <Image source={require('../images/arrow1.png')} style={{width: 16.17, height: 19.8}}/>
        </TouchableOpacity>
        <Text style={[styles.text1, {zIndex: 1}]}>기기 본체에 있는 QR코드를 스캔하십시오.</Text>
        <CameraScreen
          key={Date.now()}
          scanBarcode={true}
          onReadCode={handleQRCodeScan}
          showFrame={true}
          laserColor='red'
          frameColor='white'
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
root: {
    position: 'relative', width: '100%', height: 900,

    backgroundColor: '#000000',
    justifyContent: 'center',
},
vector: {
    position: 'absolute', left: 20, top: 21.1, color: '#FFFFFF',
},
text1: {
    position: 'absolute', left:'16.66%', top: '25%',

    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 20,

    color: '#D9D9D9',
},

});
export default Page_11000;