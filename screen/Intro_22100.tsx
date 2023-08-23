import React, { useState } from 'react';
import { View, Text, TextInput, Image, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const Intro_22100 = ({ navigation }) => {
  const [state, setState] = useState('false');

  return (
    <ScrollView>
        <View style={styles.root}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.vector}>
            <Image source={require('../images/arrow.png')} style={{width: 16.17, height: 19.8}}/>
        </TouchableOpacity>
        <Text style={styles.아이디찾기}>아이디 찾기</Text>
        <Text style={styles.text1}>가입하신 이메일주소는{'\n'}  아래와 같습니다.</Text>
        <Text style={ styles.text2} >daun****@naver.com</Text>
        <TouchableOpacity  onPress={ () => navigation.navigate('Login')}
                                   style={styles.Component1} >
            <Text  style={styles.text3}>로그인하기</Text>
        </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
root: {
    position: 'relative', width: '100%', height: 800,
    flex: 1,
    background: '#FFFFFF',
    alignItems: 'center',
},
vector: {
    position: 'absolute', left: 20, top: 21.1,
},
아이디찾기: {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 23,

    marginTop: 19,
    color: '#000000',
},
text1: {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',

    marginTop: 151,
    color: '#000000',
},
Component1: {
    position: 'absolute', left: '11.11%', right: '11.11%', top: 489,
    height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B162B',
    borderRadius: 5,
},
text2: {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',

    marginTop: 57,
    color: '#000000',
},
text3: {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',

    color: '#FFFFFF',
},
});
export default Intro_22100;
