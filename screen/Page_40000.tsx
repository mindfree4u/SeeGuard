import React, { useState, useEffect, useContext  } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, StyleSheet, ScrollView, Alert } from 'react-native';
import Footer from './Footer';
import BleManager from 'react-native-ble-manager';
import {LoginIdContext } from '../App';

const Page_40000 = ({ navigation }) => {
  const [selectedIconIndex, setSelectedIconIndex] = useState(3);
  const {loginId, setLoginId} = useContext(LoginIdContext);

  useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
              setSelectedIconIndex(3);
            });
            return unsubscribe;
       }, [navigation]);

  //휴대폰번호 변경 처리
  const handlePhoneNumber = () => {
        Alert.alert(
            '변경하시려는 휴대폰 번호로 본인인증을 진행해야합니다.',
            '',
            [
              { text: '취소', onPress: () => {} },
              { text: '휴대폰번호로 본인인증', onPress: () => navigation.navigate('Intro_21100') },
            ]
          );
     };

  const handleLogout = () => {
          Alert.alert(
              '로그아웃 하시겠습니까?',
              '로그아웃 시 모든 푸시를 받지 못합니다.',
              [
                { text: '예', onPress: () => navigation.navigate('Login') },
                { text: '아니오', onPress: () => {} },
              ]
            );
       };

  return (
      <>
      <ScrollView>
      <View style={styles.root}>
      <Text style={styles.text1}>내정보</Text>
      <Text style={styles.text2}>회원정보</Text>
      <Text style={styles.text3}>이메일 주소</Text>
      <Text style={styles.text4}>{loginId}</Text>
      <TouchableOpacity  onPress={() => navigation.navigate('Page_41000')} style={styles.vector}>
        <Text style={styles.text5}>비밀번호 변경 ></Text>
      </TouchableOpacity>
      <Text style={[styles.text3, {top: '24.75%'}]}>휴대폰 번호</Text>
      <Text style={[styles.text4, {top: '27%'}]}>010-1234-5678</Text>
      <TouchableOpacity  onPress={handlePhoneNumber} style={[styles.vector, {top:'27%'}]}>
        <Text style={styles.text5}>휴대폰번호 변경 ></Text>
      </TouchableOpacity>
      <Text style={[styles.text4, {top: '36.88%'}]}>로그아웃</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.image1}>
        <Image source={require('../images/arrow2.png')} style={{ width: 10, height:14 }}/>
      </TouchableOpacity>
      <Text style={[styles.text4, {top: '41.88%'}]}>회원탈퇴</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Page_42000')} style={[styles.image1, {top: '42.38%'}]}>
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
    flex:1,
    background: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
},
text1: {
    position: 'absolute', top: '1.88%',
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
    position: 'absolute', left: '16.67%', top: '15.75%',
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 14,
    color: '#6F6F6F',
},
text4: {
    position: 'absolute', left: '16.67%', top: '18%',
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 21,
    color: '#6F6F6F',
},
text5: {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 16,
    color: '#6F6F6F',
},
vector: {
    position: 'absolute', left:'65.56%', top:'18.5%'
},
image1: {
    position: 'absolute', left: '50%', top: '37.38%'
},
});

export default Page_40000;