import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const Page_41000 = ({ navigation}) => {
  const [password, setPassword] = useState('');                                                  //기존비밀번호
  const [password2, setPassword2] = useState('');                                             //새비밀번호
  const [password3, setPassword3] = useState('');                                             //새비밀번호 확인
  const [passwordValid, setpasswordValid] = useState(false);                           //현재 비밀번호 비교 상태
  const [newpasswordValid, setNewpasswordValid] = useState(false);             //새 비밀번호 비교 상태
  const [text, setText] = useState('');

  //현재 비밀번호 입력시 호출됨
  const handlePassword = (text) => {
          setPassword(text);
          if (password.length >7)   //현재 비밀번호 확인 임시 조건
          {
           setpasswordValid(true);
          }
        };

  //새비밀번호 입력시 호출됨
  const handlePasswordChange = (text) => {
        setPassword2(text);
        validatePassword(text, password3);
      };
  //새비밀번호 확인 입력시 호출됨
  const handleConfirmPasswordChange = (text) => {
        setPassword3(text);
        validatePassword(password2, text);
        if ( !newpasswordValid ) {
                setText('*비밀번호가 일치하지 않습니다.');
        }
      };

  const validatePassword = (password2, password3) => {
        // 비밀번호 유효성 검사
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const isValid = passwordRegex.test(password2);
        // 비밀번호 확인 일치 여부 검사
        const isMatch = password2 === password3;
        setNewpasswordValid(isValid && isMatch);
      };

 //변경버튼 클릭시 호출됨
  const handleChange = (text) => {
         if (!password) {
            Alert.alert('', '현재 비밀번호를 입력하세요.', [{ text: '확인' }]);
         }
         else if ( !newpasswordValid) {
                     Alert.alert('', '변경할 비밀번호를 입력하세요.', [{ text: '확인' }]);
         }
         else {
         navigation.navigate('Page_40000');
         }
       };

  return (
    <ScrollView>
            <View style={styles.root}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.vector}>
                <Image source={require('../images/arrow.png')} style={{width: 16.17, height: 19.8}}/>
            </TouchableOpacity>
            <Text style={styles.비밀번호}>비밀번호 변경</Text>
            <Text style={styles.text1}>비밀번호를 바꾸시려면{'\n'}현재 비밀번호를 먼저 입력해주세요.</Text>
            <Text style={ styles.text2 }>현재 비밀번호</Text>
            <TextInput  value={password} style={ styles.textinput } maxLength={80}
                                    onChangeText={handlePassword} placeholder="영문, 숫자 포함 8자이상"
                                    placeholderTextColor="#D9D9D9" />
            {passwordValid ? ( <Text style={[styles.text3, { top:230 } ]}>*현재 비밀번호가 확인되었습니다.</Text> )
                                                        :  null }
            <View style={styles.line} />
            <Text style={ [styles.text2, {top:'38.375%'}] }>새 비밀번호</Text>
            <TextInput  value={password2} style={ [styles.textinput,{top:'39.625%'}] } maxLength={80}
                                    onChangeText={handlePasswordChange} placeholder="영문, 숫자 포함 8자이상"
                                    placeholderTextColor="#D9D9D9" secureTextEntry={true}/>
            <View style={[styles.line,{top:'44.625%'}]} />
            <Text style={ [styles.text2, {top:'48.375%'}] }>새 비밀번호 확인</Text>
            <TextInput  value={password3} style={ [styles.textinput,{top:'49.625%'}] } maxLength={80}
                                     onChangeText={handleConfirmPasswordChange} placeholder="영문, 숫자 포함 8자이상"
                                     placeholderTextColor="#D9D9D9" secureTextEntry={true}/>
            <View style={[styles.line,{top:'54.625%'}]} />

            {newpasswordValid ? ( <Text style={styles.text3}>*비밀번호 확인되었습니다.</Text> )
                                            : ( <Text style={[styles.text3, {color: '#FA584E'} ]}>{text}</Text> ) }
            <TouchableOpacity style={styles.Component1} onPress={handleChange}>
                <Text style={styles.변경}>변경</Text>
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
비밀번호: {
    position: 'absolute', top: '2.38%',
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
    color: '#000000',
},
text1: {
    position: 'absolute', left: '11.11%', top: '13.12%',
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 23,
    color: '#4D4D4D',
},
text2: {
    position: 'absolute', left: '11.11%', top: '21.75%',
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 14.48,
    color: '#4D4D4D',
},
textinput: {
    position: 'absolute', left: '11.11%', top: '23%', width: '75%',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
},
line:{
    position: 'absolute', left: '11.11%', right: '11.11%', top:'28%',
    borderBottomWidth:1,
    borderBottomColor: '#ACACAC',
},
Component1: {
    position: 'absolute', left: '11.11%', right: '11.11%', top: 700,
    height: 45.13,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1D1D1',
    borderRadius: 5,
},
text3: {
    position: 'absolute', left: '11.11%', top: 445,
    fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: 10,
    lineHeight: 12.1,
    textAlign: 'center',
    color: '#008B27',
},
변경: {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    color: '#000000',
},
});

export default Page_41000;

