import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Page_13000 = ({ navigation}) => {

  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);

  const onImg = require('../images/ToggleOn.png');
  const offImg = require('../images/ToggleOff.png');

  //클릭시 버튼 on, off
  const renderImage = () => {
      var imgSource = toggle ? onImg : offImg;
      return <Image source={imgSource} style={{width: 54, height:26}}/>;
    };

  //클릭시 버튼 on, off
  const renderImage2 = () => {
        var imgSource = toggle2 ? onImg : offImg;
        return <Image source={imgSource} style={{width: 54, height:26}}/>;
      };

  //클릭시 버튼 on, off
    const renderImage3 = () => {
          var imgSource = toggle3 ? onImg : offImg;
          return <Image source={imgSource} style={{width: 54, height:26}}/>;
        };

  //클릭시 버튼 on, off
    const renderImage4 = () => {
          var imgSource = toggle4 ? onImg : offImg;
          return <Image source={imgSource} style={{width: 54, height:26}}/>;
        };

  return (
    <ScrollView>
            <View style={styles.root}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.vector}>
                <Image source={require('../images/arrow.png')} style={{width: 16.17, height: 19.8}}/>
            </TouchableOpacity>
            <Text style={styles.회원탈퇴}>이벤트설정</Text>
            <Text style={styles.text1}>소리 감지</Text>
            <TouchableOpacity onPress={() => setToggle(!toggle)} style={styles.Group1412}>
                {renderImage()}
            </TouchableOpacity>
            <Text style={styles.text2}>민감도</Text>
            <Text style={styles.text3}>*민감도가 높을 수록 더 작은소리를 감지합니다.</Text>
            <Text style={[styles.text1, {top:'31.25%'}]}>움직임 감지</Text>
            <TouchableOpacity onPress={() => setToggle2(!toggle2)} style={[styles.Group1412,{top:'31.25%'}]}>
                {renderImage2()}
            </TouchableOpacity>
            <Text style={[styles.text2, {top:'37.625%'}]}>민감도</Text>
            <Text style={[styles.text3, {top:'41.375%'}]}>*민감도가 높을 수록 더 작은움직임을 감지합니다.</Text>
            <Text style={[styles.text1, {top:'49.375%'}]}>이벤트 발생 시</Text>
            <Text style={[styles.text2, {top:'55.75%'}]}>푸시알림</Text>
            <TouchableOpacity onPress={() => setToggle3(!toggle3)} style={[styles.Group1412,{top:'55.375%'}]}>
                {renderImage3()}
            </TouchableOpacity>
            <Text style={[styles.text2, {top:'62%'}]}>자동녹화</Text>
            <TouchableOpacity onPress={() => setToggle4(!toggle4)} style={[styles.Group1412,{top:'61.625%'}]}>
                {renderImage4()}
            </TouchableOpacity>
            </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
root: {
    position: 'relative', width: '100%', height: 800,
    justifyContent: 'center'
},
image1: {
    position: 'absolute', left: '5.56%', top: '9.75%', width: 24, height:24,
},
vector: {
    position: 'absolute', left: 20, top: 21.1,
},
회원탈퇴: {
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
    position: 'absolute', left: '11.11%', top: '13.125%',

    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 23.17,
    textAlign: 'center',

    color: '#4D4D4D',
},
Group1412: {
    position: 'absolute', left: '73.88%', top: '13.125%',
},
text2: {
    position: 'absolute', left: '16.66%', top: '19.5%',

    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 20.27,
    textAlign: 'center',

    color: '#6F6F6F',
},
text3: {
    position: 'absolute', left: '16.66%', top: '23.25%',

    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 14.48,
    textAlign: 'center',

    color: '#FA584E',
},
});

export default Page_13000;

