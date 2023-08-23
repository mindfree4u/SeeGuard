import React, { useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { deviceDataContext } from '../App';

const Page_12100 = ({ navigation }) => {
  const { deviceData, setDeviceData } = useContext(deviceDataContext);

  return (
    <ScrollView>
            <View style={styles.root}>
            {deviceData ? (
            <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.vector}>
                <Image source={require('../images/arrow.png')} style={{width: 16.17, height: 19.8}}/>
            </TouchableOpacity>
            <Text style={styles.기기등록}>기기등록</Text>
            <Text style={styles.text1}>확인되었습니다.</Text>
            <ImageBackground source={require('../images/Rectangle268.png')} style={styles.Rectangle268}/>
            <Text style={[styles.text2, { top: '28.5%' }]}>IP Camera</Text>
            <Text style={styles.text2}>{deviceData}</Text>
            <Text style={styles.text3}>
            캠에서 LED가 <Text style={{color:'green'}}>녹색</Text>으로 깜빡거리면{'\n'} 아래의 다음버튼을 눌러주세요.
            </Text>
            <Text style={styles.text4}>*만약 녹색으로 계속 깜빡이지 않는다면{'\n'} 기기를 리셋하고 다시 시도해주세요.</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Page_12200')} style={styles.Component1} >
                <Text style={styles.다음}>다음</Text>
            </TouchableOpacity>
            </>
            ) : (
            <>
            <TouchableOpacity onPress={() => navigation.navigate('Page_10000')} style={styles.vector}>
                <Image source={require('../images/arrow.png')} style={{width: 16.17, height: 19.8}}/>
            </TouchableOpacity>
            <Text style={styles.기기등록}>기기등록</Text>
            <Text style={[styles.text3, { top: '32.75%'}]}>확인된 기기가 없습니다.</Text>
            <Text style={[styles.text3, { top: '35.284%'}]}>다시 입력해주세요.</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Page_10000')} style={[styles.Component1, {top:384}]} >
                <Text style={styles.다음}>QR코드로 스캔</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Page_12000')} style={[styles.Component1, {top:458}]} >
                <Text style={styles.다음}>수동으로 등록</Text>
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
    position: 'absolute', top: 19,

    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',

    color: '#000000',
},
text1: {
    position: 'absolute', top: 105,

    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 23,
    /* Text/b02 */
    color: '#4D4D4D',
},
Rectangle268: {
    position: 'absolute', top: 176, width: 280, height:144,
},
text2: {
    position: 'absolute', left: '51.94%', top: 258,

    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 20,
    /* Text/b02 */
    color: '#4D4D4D',
},
text3: {
    position: 'absolute', top: 350,

    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 20.27,

    color: '#4D4D4D',
},
text4: {
    position: 'absolute', top: 416,

    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 14,
    /* Text/b02 */
    color: '#FA584E',
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
    lineHeight: 17.38,
    textAlign: 'center',
    color: '#000000',
},
});

export default Page_12100;

