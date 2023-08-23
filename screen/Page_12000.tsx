import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {deviceDataContext } from '../App';

const Intro_12000 = ({ navigation}) => {
  const [serial, setSerial] = useState('');
  const [code, setCode] = useState('');
  const { deviceData, setDeviceData } = useContext(deviceDataContext);

  const handleDeviceData = () => {
  if (serial === '' ) {
     Alert.alert('', '시리얼번호를 입력하세요.', [{ text: '확인' }]);
  }
  else if (code === ''){
     Alert.alert('', '안전코드를 입력하세요.', [{ text: '확인' }]);
  }
  else {
      setDeviceData(serial);
      navigation.navigate('Page_12100');
  }
  };

  return (
    <ScrollView>
            <View style={styles.root}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.vector}>
                <Image source={require('../images/arrow.png')} style={{width: 16.17, height: 19.8}}/>
            </TouchableOpacity>
            <Text style={styles.기기등록}>기기등록</Text>
            <Text style={styles.text1}>디바이스의 시리얼번호와{'\n'}안전코드를 입력하세요.</Text>
            <Image source={require('../images/Rectangle_268.png')} style={styles.img1}/>
            <Text style={styles.text2 }>시리얼번호</Text>
            <TextInput  value={serial} style={[styles.textinput, {top: 376 }]}
                        onChangeText={setSerial} placeholder="시리얼번호를 입력하세요." maxLength={100}
                        placeholderTextColor="#D9D9D9" />
            <View style={styles.line} />
            <Text style={[styles.text2,{top: 435} ]}>안전 코드</Text>
            <TextInput  value={code} style={[styles.textinput, {top: 456 }]}
                        onChangeText={setCode} placeholder="안전코드를 입력하세요." maxLength={100}
                        placeholderTextColor="#D9D9D9" />
            <View style={[styles.line, {top:490}]} />
            <TouchableOpacity  onPress={ handleDeviceData } style={styles.Component1} >
                <Text  style={[styles.다음, {color: (serial === '' || code === '') ? 'initial' :'#000000' }]}>
                      다음</Text>
            </TouchableOpacity>
            </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
root: {
    position: 'relative', width: '100%', height: 800,
    justifyContent: 'center',
    alignItems: 'center'
},
vector: {
    position: 'absolute', left: 20, top: 21.1,
},
기기등록: {
    position: 'absolute', left: '41.94%', top: '2.38%',
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
    color: '#000000',
},
text1: {
    position: 'absolute', left: 40, top: 105,
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 23.17,
    color: '#4D4D4D',
},
text2: {
    position: 'absolute', left: '11.11%', top: 355,
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 14,
    color: '#4D4D4D',
},
img1: {
     position: 'absolute', width: '77.77%', top: 164,
     height: 167,
},
textinput: {
    position: 'absolute', left: '11.11%', top: 266, width : '79%',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 21,
},
line:{
    position: 'absolute', left: '11.11%', right: '11.39%', top: 410,
    borderBottomWidth:1,
    borderBottomColor: '#ACACAC',
},
Component1: {
    position: 'absolute', left: '11.11%', right: '11.11%', top: 700,
    height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1D1D1',
    borderRadius: 5,
},
다음: {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    color: '#D9D9D9',
},
});

export default Intro_12000;

