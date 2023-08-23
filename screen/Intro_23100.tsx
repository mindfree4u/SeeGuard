import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Intro_23100 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { address } = route.params;

  return (
    <ScrollView>
        <View style={styles.root}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.vector}>
            <Image source={require('../images/arrow.png')} style={{width: 16.17, height: 19.8}}/>
        </TouchableOpacity>
            <Text style={styles.비밀번호}>비밀번호 찾기</Text>
            <View style={styles.img1}>
                <Image source={require('../images/check.png')}/>
            </View>
            <Text style={styles.text1}>{address} 주소로</Text>
            <Text style={[styles.text1, {top:310.27}]}>안내 메일을 보내드렸습니다.</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.Component1} >
                <Text style={styles.확인}>확인</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
root: {
    position: 'relative', width: '100%', height: 800,

    background: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
},
vector: {
    position: 'absolute', left: 20, top: 21.1,
},
img1: {
     position: 'absolute', top: 219.5,
},
text1: {
    position: 'absolute', top: 290,

    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 20,
    /* Text/b02 */
    color: '#4D4D4D',
},
비밀번호: {
    position: 'absolute', top: 19,

    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
    /* Text/b01 */
    color: '#000000',
},
Component1: {
    position: 'absolute', left: '11.11%', right: '11.11%', top: 489, height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B162B',
    borderRadius: 5,
},
확인: {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    color: '#FFFFFF',
},
});
export default Intro_23100;
