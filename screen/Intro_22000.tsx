import React, { useState } from 'react';
import { View, Text, TextInput, Image, Button, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const Intro_22000 = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [num, setNum] = useState('');
  const [state, setState] = useState('');
  const [buttonText, setButtonText] = useState("인증번호 받기");
  const [text, setText] = useState('');

 //휴대폰 번호 숫자만 입력되게 제한
     const handlePhonenum = () => {
      if (/^\d+$/.test(phone)) {
          return;
          }
      else {
            Alert.alert('', '숫자를 입력하세요.', [{ text: '확인' }]);
          }
     };

  //인증번호 받기 클릭시
  const RequestClick = () => {
    if(phone.length === 11) {
    setState('Request');
    setButtonText("재전송");
    }
    else {
    }
  };
  //인증번호 확인 클릭시
  const CheckClick = () => {
    if (/^\d+$/.test(num)) {
    if(num.length === 4) {
    setState('Check');
    }
    }
    else if(!num) {
    setText('*인증번호가 올바르지 않습니다.');
    }
   else {
   Alert.alert('', '숫자를 입력하세요.', [{ text: '확인' }]);
   }
  };

  //아이디찾기 버튼 클릭시
  const FindClick = () => {
      if(state === 'Check') {
       navigation.navigate('Intro_22100');
      }
      else {
      Alert.alert( '','인증을 진행해 주세요.', [{ text: '확인' }]);
      }
    };

  return (
    <ScrollView>
        <View style={styles.root}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.vector}>
                <Image source={require('../images/arrow.png')} style={{width: 16.17, height: 19.8}}/>
            </TouchableOpacity>
            <Text style={styles.아이디찾기}>아이디 찾기</Text>
            <Text style={styles.아이디} >아이디를 잊으셨나요?</Text>
            <Text style={styles.text1}>아이디를 찾기 위해서는{'\n'}휴대폰번호 인증이 필요합니다.</Text>
            <Text style={[styles.text2,{left:40, top: 200} ]}>휴대폰번호</Text>
            <TextInput  value={phone} style={[styles.textinput, {top: 215 }]} maxLength={11} onBlur={handlePhonenum}
                                  onChangeText={setPhone} placeholder="숫자만 입력"
                                  placeholderTextColor="#D9D9D9" />
            <View style={[styles.line, {top: 250 }]} />
            <TouchableOpacity style={styles.Rectangle5} onPress={RequestClick}>
                <Text style={styles.text3}>{buttonText}</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={FindClick} style={styles.Component1} >
                <Text  style={[styles.text3, {color: (state==='Check') ? '#000000' : 'initial'}]}>
                  아이디찾기</Text>
             </TouchableOpacity>

        {state === 'Request' && (
        <>
        <Text style={[styles.text2,{left:40, top: 270} ]}>인증번호</Text>
        <TextInput   style={[styles.textinput, {top: 285 }]} maxLength={4} value={num}
                                      onChangeText={setNum} placeholder="4자리"
                                       placeholderTextColor="#D9D9D9" />
        <View style={[styles.line, {top: 320 }]} />
        <TouchableOpacity style={[styles.Rectangle5, {top: 280, bottom:480}]} onPress={CheckClick}>
            <Text style={styles.text3}>확인</Text>
        </TouchableOpacity>
        <Text style={[styles.text4, {color: '#FA584E'}]}>{text}</Text>

        </>
        )}

       {state=== 'Check' && (
       <>
        <TouchableOpacity style={styles.Rectangle5} onPress={RequestClick}>
                            <Text style={styles.text3}>재전송</Text>
        </TouchableOpacity>

        <Text style={[styles.text2,{left:40, top: 270} ]}>인증번호</Text>
        <Text   style={[styles.textinput, {top: 296}]} > {num}</Text>

        <View style={[styles.line, {top: 320 }]} />
        <TouchableOpacity style={[styles.Rectangle5, {top: 280, bottom:480}]} onPress={CheckClick}>
            <Text style={styles.text3}>확인</Text>
        </TouchableOpacity>
        <Text style={styles.text4}>*확인되었습니다.</Text>
       </>
       )}
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
아이디: {
    position: 'absolute', left: 40, top: 105,

    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',

    color: '#000000',
},
text1: {
    position: 'absolute', left: 40, top: 136,
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 14,
    color: '#6F6F6F',
},
text2: {
    position: 'absolute', left: 70, top: 480,
    fontFamily: 'Noto Sans KR', fontStyle: 'normal', fontWeight: 700, fontSize: 12,
    lineHeight: 17,
    color: '#4D4D4D',
},
textinput: {
    position: 'absolute', width: '40%',
    left: 40,
    top: 266,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 21,
    color:'#000000'
},
line:{
    position: 'absolute', left:40, width:181, top: 264,
    borderBottomWidth:1,
    borderBottomColor: '#ACACAC',
},
Rectangle5:{
    position: 'absolute', left: 231, width: 89, top: 210, bottom: 550,
    borderWidth: 1,
    borderColor: '#ACACAC',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
},
Component1: {
    position: 'absolute', left: '11.11%', right: '11.11%', top: 700, height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1D1D1',
    borderRadius: 5,
},
text3: {
    fontFamily: 'Noto Sans KR', fontStyle: 'normal', fontWeight: 400, fontSize: 12, lineHeight: 17.38,
    textAlign: 'center',
    color: '#000000',
},
text4: {
    position: 'absolute', left: 40, top: 328,
    fontFamily: 'Noto Sans KR', fontStyle: 'normal', fontWeight: 400, fontSize: 10, lineHeight: 12,
    textAlign: 'center',
    color: '#008B27',
},
});

export default Intro_22000;
