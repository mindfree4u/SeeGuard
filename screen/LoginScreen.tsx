import React, { useState, useEffect,  useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ScrollView, LogBox } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginIdContext } from '../App';
LogBox.ignoreLogs(['new NativeEventEmitter']);       // Ignore log notification by message
LogBox.ignoreAllLogs();                             //Ignore all log notifications

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberEmail, setRememberEmail] = useState(false);
  const {loginId, setLoginId} = useContext(LoginIdContext);

  // 로그인 버튼 클릭시 호출됨
  const handleLogin = () => {
         if (email.length === 0) {
         Alert.alert('로그인 실패', '이메일 주소를 입력해 주세요.', [{ text: '확인' }]);
          }
         else if (password.length === 0 ){
         Alert.alert('로그인 실패', '비밀번호를 입력해 주세요.', [{ text: '확인' }]);
          }
         else if (email.length === 0 && password.length === 0 ){
         Alert.alert('로그인 실패', '이메일 주소와 비밀번호를 입력해 주세요.', [{ text: '확인' }]);
          }
         else if (!email || !email.includes('@') || !email.includes('.')) {
         Alert.alert( '','이메일 형식이 올바르지 않습니다.', [{ text: '확인' }]);
          }
         else  if ( !password || password.length < 8 || !/[a-zA-Z]/.test(password) ||
                        !/\d/.test(password)) {
         Alert.alert( '','비밀번호는 영문과 숫자를 포함해 8자리이상 입력해 주세요.', [{ text: '확인' }]);
                            return;
          }

         else {
         setLoginId(email);
         setPassword('');
         navigation.navigate('Page_10000');
         console.log('User logged in successfully');
         }
  };

  //이메일 저장용 체크박스 터치시 호출됨
  const handleRememberEmail = () => {
      setRememberEmail(!rememberEmail);
   };


  // 화면 실행 시 저장된 이메일 불러오기
  useEffect(() => {
    const getEmail = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('savedEmail');
        if (savedEmail !== null) {
          setEmail(savedEmail);
          setRememberEmail(true);                                         // 이메일 저장 상태를 true로 설정
        }
      } catch (error) {
        console.log(error);
      }
    };

    getEmail();
  }, []);

  // 이메일 저장 상태 변경 시 이메일 저장/삭제
  useEffect(() => {
    const saveEmail = async () => {
      try {
        if (rememberEmail) {
         await AsyncStorage.setItem('savedEmail', email);
       //  await AsyncStorage.setItem('savedEmail', LoginId);
        } else {
          await AsyncStorage.removeItem('savedEmail');
        }
      } catch (error) {
        console.log(error);
      }
    };
    saveEmail();
  }, [rememberEmail, email]);

  //이메일 입력시 호출됨
  const handleEmail = (text) => {
  setEmail(text);
  };

  //비밀번호 입력시 호출됨
  const handlePassword = (text) => {
    setPassword(text);
    };

    //아이디찾기 클릭시 호출됨
    const handleIdFind = () => {
        setEmail('');
        setPassword('');
        navigation.navigate('Intro_22000');
      };

    //비밀번호찾기 클릭시 호출됨
      const handlePasswordFind = () => {
          setEmail('');
          setPassword('');
          navigation.navigate('Intro_23000');
        };

    //회원가입 클릭시 호출됨
     const handleSignUp = () => {
         setEmail('');
         setPassword('');
         navigation.navigate('Intro_21000');
            };


  return (
  <View style={{flex: 1, }} >
  <ScrollView>
    <View style={styles.root}>
        <Text style={styles.login}>Log in</Text>
        <Text style={styles.email}>이메일</Text>
        <TextInput style={styles.textinput} value={email} onChangeText={handleEmail} maxLength={100}/>
        <View style={styles.line} />
        <Text style={styles.password}>비밀번호</Text>
        <TextInput style={[styles.textinput, {top:355 }]} value={password} onChangeText={handlePassword} secureTextEntry={true} maxLength={100}/>
        <View style={[styles.line,{ top: 389}]} />
        <CheckBox style={styles.checkbox}
                        tintColors={{ true: '#4D4D4D' }}
                        value={rememberEmail}
                        onValueChange={handleRememberEmail}
                     />
        <Text style={styles.이메일저장}>이메일 저장</Text>
        <TouchableOpacity style={styles.Component1} onPress={handleLogin}>
            <Text style={styles.로그인}>로그인 </Text>
        </TouchableOpacity>

        <TouchableOpacity style={ styles.recovery1 } onPress={handleIdFind }>
            <Text style={ styles.아이디찾기 }>아이디 찾기</Text>
        </TouchableOpacity>
        <Text  style={styles.recovery2}>| </Text>
        <TouchableOpacity style={styles.recovery3 } onPress={handlePasswordFind}>
                    <Text style={ styles.비밀번호찾기 }>비밀번호 찾기</Text>
                </TouchableOpacity>
        <Text  style={styles.text1}>아직 회원이 아니신가요?</Text>
        <TouchableOpacity style={styles.Component2} onPress={handleSignUp}>
            <Text style={styles.회원가입}>회원 가입</Text>
        </TouchableOpacity>

    </View>
  </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
root: {
    flex: 1, position: 'relative', width: '100%', height:800,   //800
    background: '#FFFFFF',
    justifyContent: 'center'
  },
login: {
    position: 'absolute', left: 19, top: 111,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 35,
    color: '#000000',
 },
email: {
    position: 'absolute', left: 40, top: 202,
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 20,
    color: '#4D4D4D',
},
textinput: {
    position: 'absolute', left: 40, top: 242, width: '76%',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
    color: '#4D4D4D',
},
line:{
    position: 'absolute',left: '11.11%', right: '11.11%', top: 276,
    borderBottomWidth:1,
    borderBottomColor: '#ACACAC',
},
password:{
    position: 'absolute', left: 40, top: 315,
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 20,
    color: '#4D4D4D',
},
checkbox:{
    position: 'absolute', left: 42, top: 393,
    color: '#4D4D4D',
},
이메일저장:{
    position: 'absolute', left: 70, top: 400,
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 14,
    color: '#4D4D4D',
},
Component1: {
    position: 'absolute', left: '11.11%', right: '11.11%', top: 444,
    height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 5,

},
로그인: {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    color: '#FFFFFF',
},
recovery1: {
    position: 'absolute', left: '28.33%', top: 499,
    color: '#4D4D4D',
},
아이디찾기: {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    color: '#4D4D4D',
},

recovery2: {
    position: 'absolute', left: '50%', top: 499,
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    color: '#4D4D4D',
},
recovery3: {
    position: 'absolute',
    left: '55.56%', right: '25.28%',
    top: 499,
},
비밀번호찾기: {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    color: '#4D4D4D',
},
text1:{
    position: 'absolute', left: 40, top: 689,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 15,
    color: '#4D4D4D',
},
Component2: {
    position: 'absolute', left: '11.11%', right: '11.11%', top: 717,  height: 45.13,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1D1D1',
    borderRadius: 5,
},
회원가입: {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 17.38,
    textAlign: 'center',
    color: '#000000',
},
});

export default LoginScreen;