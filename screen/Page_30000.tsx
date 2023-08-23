import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, StyleSheet, ScrollView, Alert } from 'react-native';
import Footer from './Footer';
import BleManager from 'react-native-ble-manager';
import { WiFiContext, deviceDataContext } from '../App';

const Page_30000 = ({ navigation }) => {
    const [selectedIconIndex, setSelectedIconIndex] = useState(2);
    const { wifiName, setWifiName } = useContext(WiFiContext);                               //Page_12200에서 선택한 wifi이름
    const { deviceData, setDeviceData } = useContext(deviceDataContext);

     useEffect(() => {
          const unsubscribe = navigation.addListener('focus', () => {
            setSelectedIconIndex(2);
          });
          return unsubscribe;
        }, [navigation]);

     // 펌웨어업데이트 처리
     const handleUpdate = () => {

     };

     //포맷 처리
     const handleFormat = () => {
        Alert.alert(
            '영상을 정말로 삭제하시겠습니까?',
            '한번 영상을 삭제하면 되돌릴 수 없습니다.',
            [
              { text: '취소', onPress: () => {} },
              { text: '삭제', onPress: () => navigation.navigate('Page_30000') },
            ]
          );
     };

     const handleReset = () => {
             Alert.alert(
                 '정말로 기기를 초기화 하시겠습니까?',
                 '지금 초기화하면 설정하신 모든 상태가 재설정되며 다시 되돌릴 수 없습니다.',
                 [
                   { text: '취소', onPress: () => {} },
                   { text: '초기화', onPress: () => navigation.navigate('Page_30000') },
                 ]
               );
          };

     const handleDelete = () => {
             Alert.alert(
                 '정말로 기기를 삭제하시겠습니까?',
                 '기기를 삭제하면 사용하신 모든 정보가 삭제됩니다.',
                 [
                   { text: '취소', onPress: () => {} },
                   { text: '기기삭제', onPress: () => navigation.navigate('Page_30000') },
                 ]
               );
          };

  return (
      <>
      <ScrollView>
      <View style={styles.root}>
      <Text style={styles.text1}>기기설정</Text>
      <Text style={styles.text2}>기기정보</Text>
      <Text style={styles.text3}>디바이스 모델</Text>
      <Text style={[styles.text4, {top:'16%'}]}>IP Camera</Text>
      <Text style={[styles.text3, {top:'19.75%' }]}>S/N</Text>
      <Text style={[styles.text4, {top:'19.75%', right:'11.11%' }]}>{deviceData}</Text>
      <Text style={[styles.text3, {top:'23.5%' }]}>펌웨어 버전</Text>
      <Text style={[styles.text4, {top:'23.5%'}]}>현재 버전:</Text>
      <Text style={[styles.text4, {top:'27.25%'}]}>   새 버전:</Text>
      <TouchableOpacity style={styles.Component1} onPress={handleUpdate}>
        <Text style={styles.업데이트}>업데이트</Text>
      </TouchableOpacity>
      <Text style={[styles.text2, {top:'43.38%'}]}>저장공간</Text>
      <TouchableOpacity style={[styles.Component1, {top:'52.62%'}]} onPress={handleFormat}>
        <Text style={styles.업데이트}>포맷</Text>
      </TouchableOpacity>
      <Text style={[styles.text2, {top:'63.75%'}]}>설정</Text>
      <Text style={[styles.text3, {top:'68.88%'}]}>WiFi 이름</Text>
      <Text style={[styles.text4, {top:'68.88%'}]}>{wifiName}</Text>
      <TouchableOpacity style={styles.Component2} onPress={() => navigation.navigate('Page_12200')}>
        <Text style={styles.업데이트}>Wi-Fi 변경</Text>
      </TouchableOpacity>
      <Text style={[styles.text3, {top:'79.5%'}]}>기기 초기화</Text>
      <TouchableOpacity onPress={handleReset} style={styles.image1}>
        <Image source={require('../images/arrow2.png')} style={{ width: 10, height:14 }}/>
      </TouchableOpacity>

      <Text style={[styles.text3, {top:'84.25%'}]}>기기 삭제</Text>
      <TouchableOpacity onPress={handleDelete} style={[styles.image1, {top:'85.25%'}]}>
        <Image source={require('../images/arrow2.png')} style={{ width: 10, height:14 }}/>
      </TouchableOpacity>
      </View>
      </ScrollView>

      <Footer navigation={navigation} selectedIconIndex={selectedIconIndex} setSelectedIconIndex={setSelectedIconIndex} />
      </>
  );
};

const styles = StyleSheet.create({
root: {
     position: 'relative', width: '100%', height:800, marginTop: 0,
    background: '#FFFFFF',
    justifyContent: 'center'
},
text1: {
    position: 'absolute', left: '39.72%', top: '1.88%',
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 29,
    color: '#000000',
},
text2: {
    position: 'absolute', left: '11.11%', top: '10.88%',
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 23,
    color: '#4D4D4D',
},
text3: {
    position: 'absolute', left: '16.67%', top: '16%',
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 20,
    color: '#6F6F6F',
},
text4: {
    position: 'absolute', right:'11.12%',
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 20.27,
    color: '#6F6F6F',
},
image1: {
    position: 'absolute', left: '50%', top: '80.5%',
},
Component1: {
    position: 'absolute', left: '11.11%', right: '11.11%', top: '32.25%', height: 36,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ACACAC',
},
업데이트: {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    color: '#6F6F6F',
},
Component2: {
    position: 'absolute', left: '55.55%', top: '71.7%', width: '33.05%', height: 36,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ACACAC',
},
});

export default Page_30000;