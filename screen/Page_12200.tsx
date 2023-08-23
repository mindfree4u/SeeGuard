import React, { useEffect, useState, useContext } from 'react';
import { View, Text, PermissionsAndroid, Image, TouchableOpacity, Alert, TextInput, StyleSheet, ScrollView } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions';
import { WiFiContext } from '../App';

const Page_12200 = ({ navigation}) => {
  const [state, setState] = useState('');
  const [code, setCode] = useState('');                                               //wifi 비밀번호
  const [wifiList, setWifiList] = useState([]);                                        //가져온 wifi 목록 저장용
  const { wifiName, setWifiName } = useContext(WiFiContext);       //연결된 wifi 이름

  //화면 시작시 위치 기능 설정 요구 시작
  useEffect(() => {
                    const requestLocationPermission = async () => {
                      try {
                        const granted = await PermissionsAndroid.request(
                          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                          {
                            title: 'Location Permission',
                            message: 'This app needs access to your location.',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                          }
                        );
                        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                          console.log('Location permission granted');

                          Geolocation.getCurrentPosition(
                            (position) => {
                              console.log('Current Location:', position.coords);
                            },
                            (error) => {
                              console.log('Error while getting location:', error);
                            },
                            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                          );
                        } else {
                          console.log('Location permission denied');
                        }
                      } catch (error) {
                        console.log('Error while requesting location permission:', error);
                      }
                    };

                    requestLocationPermission();
                  }, []);
              //화면 시작시 위치 기능 설정 요구 끝
  const getWifiList = async () => {
      try {
        setWifiList([]);
        const wifiArray = await WifiManager.loadWifiList();
        setWifiList(wifiArray); // Wi-Fi 목록을 업데이트합니다.
      } catch (error) {
        console.log(error);
      }
    };

  const handleLink = () => {
        //if DAP-XXXXXXXXX 연결 체크 추가
        setState('linkCheck');
      };

  const handleSel = (selectedWifi) => {
      setWifiName(selectedWifi.SSID);
      setState('select');
        };

  const handleCon = async () => {
  if( code === '' ){
       Alert.alert('', '비밀번호를 입력하세요.', [{ text: '확인' }]);
  }
  else{
    try {
      const data = await WifiManager.connectToProtectedSSID(
                   wifiName,
                   code,
                   false, false
                 );
      console.log('Connected successfully!', {data});
      setState('connect');
    } catch (error) {
      console.log('Error while connecting to Wi-Fi:', error);
      // Handle the error accordingly
    }
    }
  };

  const handleComplete = () => {
    navigation.navigate('Page_10000');
      };

  return (
    <ScrollView>
            <View style={styles.root}>
            <Text style={styles.기기등록}>기기등록</Text>
            { state ==='' && (
            <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.vector}>
                <Image source={require('../images/arrow.png')} style={{width: 16.17, height: 19.8}}/>
            </TouchableOpacity>
            <Text style={[styles.text2, {top:'48.5%'}]}>
            스마트폰 WI-FI 설정에서 DAP-XXXXXXXXX'{'\n   '}에 연결하고 현재 페이지로 돌아와 주세요.{'\n    '}
            WI-FI 비밀번호는 기기본체에 적혀있는{'\n                      '}안전코드입니다.
            </Text>
            <TouchableOpacity style={styles.Component1} onPress={handleLink}>
                <Text style={styles.다음}>다음 </Text>
            </TouchableOpacity>
            </>
            )}
            { state ==='linkCheck' && (
            <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.vector}>
                <Image source={require('../images/arrow.png')} style={{width: 16.17, height: 19.8}}/>
            </TouchableOpacity>
            <Text style={[styles.text1, {left:'11.11%', top:'13.125%'}]}>캠을 연결할  wifi를 선택해주세요.</Text>
            <Text style={styles.text3}>*5G는 지원하지 않습니다.2G-WiFi를 선택해주세요.</Text>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.textContainer}>
              {wifiList.map((wifi, index) => (
                <TouchableOpacity key={index} onPress={() => handleSel(wifi)}>
                    <Text style={styles.text4}>
                        <Image source={require('../images/wifi.png')} style={{ width: 22, height: 15.55 }} />
                        {'   '}{wifi.SSID}
                    </Text>
                </TouchableOpacity>
                ))}
            </ScrollView>
            <TouchableOpacity  style={{ position: 'absolute', top: '80%'}} onPress={ getWifiList }>
                <Text style={styles.text5}>탭하여 다시검색</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            </>
            )}
            { state ==='select' && (
            <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.vector}>
                <Image source={require('../images/arrow.png')} style={{width: 16.17, height: 19.8}}/>
            </TouchableOpacity>
            <Text style={[styles.text3,{top: '13.25%', color:'#4D4D4D' }]}>WiFi 이름</Text>
            <TextInput  value={wifiName} style={[styles.text6, { top: '15%' }]}
                        onChangeText={setWifiName} placeholder="" maxLength={100}
                        placeholderTextColor="#D9D9D9" />
            <View style={styles.line2} />
            <Text style={[styles.text3,{top: '25.75%', color:'#4D4D4D' }]}>비밀번호</Text>
            <TextInput  value={code} style={[styles.text6, { top: '27%' }]}
                        onChangeText={setCode} placeholder="" maxLength={100}
                        placeholderTextColor="#D9D9D9" secureTextEntry={true}/>
            <View style={[styles.line2, {top:'32%'}]} />
            <TouchableOpacity style={styles.Component1} onPress={handleCon}>
                <Text style={styles.다음}>다음 </Text>
            </TouchableOpacity>

            </>
            )}
            { state ==='connect' && (
            <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.vector}>
                <Image source={require('../images/arrow.png')} style={{width: 16.17, height: 19.8}}/>
            </TouchableOpacity>
            <View style={styles.img2}>
                <Image source={require('../images/check.png')}/>
            </View>
            <Text style={[styles.text2,{ top:'28%'}]}>캠이 등록되었습니다.</Text>
            <Text style={[styles.text2,{top:'40%'}]}>캠을 정상적으로 이용하시려면{'\n'}</Text>
            <Text style={[styles.text2,{top:'42.54%'}]}>블루투스가 연결되어 있어야 합니다.{'\n'}</Text>
            <Text style={[styles.text2,{top:'45.08%'}]}>블루투스 설정화면에서{'\n'}</Text>
            <Text style={[styles.text2,{top:'47.62%'}]}>‘Seeguard’로 연결해주세요.{'\n'}</Text>

            <TouchableOpacity style={styles.Component1} onPress={ () => handleComplete() }>
                <Text style={styles.다음}>확인 </Text>
            </TouchableOpacity>
            </>
            )}
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
    position: 'absolute', top: '48.5%',
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 23.17,
    color: '#4D4D4D',
},
Component1: {
    position: 'absolute', left: '11.11%', right: '11.11%', bottom: '11.11%', height: 44,
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
    color: '#000000',
},
text2: {
    position: 'absolute',
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 20.27,
    color: '#4D4D4D',
},
text3: {
    position: 'absolute', left: '11.11%', top: '16.88%',
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 14,
    color: '#FA584E',
},
line2:{
    position: 'absolute', left: '11.11%', right: '11.39%', top:'20%',
    borderBottomWidth:1,
    borderBottomColor: '#ACACAC',
},
img1: {
     position: 'absolute', width: 22, height: 15.55,
},
textContainer: {
    position: 'absolute', left: 52, top: '23.62%', height: 350,
},
text4: {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 17,
    color: '#4D4D4D',
    margin: 13,
},
text5: {
     textAlign: 'center',
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 18,
    color: '#6F6F6F',
},
line:{
    position: 'absolute', top:'83%', width:100,
    borderBottomWidth:1,
    borderBottomColor: '#ACACAC',
},
text6: {
    position: 'absolute', left:'11.11%', width:'76%',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
},
img2: {
    position: 'absolute', top: '19.19%',
},
});

export default Page_12200;



