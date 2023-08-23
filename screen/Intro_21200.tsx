import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Intro_21200 = ({ navigation }) => {

  return (
    <ScrollView>
        <View style={styles.root}>
            <TouchableOpacity onPress={() => navigation.navigate('Intro_21000')} style={styles.vector}>
                <Image source={require('../images/arrow.png')} style={{width: 16.17, height: 19.8}}/>
            </TouchableOpacity>
            <Text style={styles.가입완료}>가입완료</Text>
            <View style={styles.img1}>
                <Image source={require('../images/check.png')}/>
            </View>
            <Text style={styles.text1}>로그인 후 편리하게</Text>
            <Text style={[styles.text1, {top:310.27}]}>서비스를 이용하실 수 있습니다.</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.Component1} >
                <Text style={styles.로그인}>로그인 하기</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
root: {
    position: 'relative',width: '100%', height: 800,

    background: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
},
vector: {
    position: 'absolute', left: 20, top: 21.1, color: '#FFFFFF',
},
img1: {
     position: 'absolute', top: 219.5,
},
text1: {
    position: 'absolute',top: 290,

    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 20,
    /* Text/b02 */
    color: '#4D4D4D',
},
가입완료: {
    position: 'absolute', top: 19,

    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',

    color: '#000000',
},
Component1: {
    position: 'absolute',left: '11.11%', right: '11.11%', top: 489, height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B162B',
    borderRadius: 5,
},
로그인: {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 12,
    lineHeight: 17.38,
    textAlign: 'center',
    color: '#FFFFFF',
},

});

export default Intro_21200;
