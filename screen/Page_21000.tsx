import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, useWindowDimensions} from 'react-native';
import Footer from './Footer';
import Video from 'react-native-video';
import BleManager from 'react-native-ble-manager';

const Page_21000 = ({ navigation, route }) => {
    const { url } = route.params;
    const [selectedIconIndex, setSelectedIconIndex] = useState(1);
    const windowWidth = useWindowDimensions().width;                     //현재기기 화면폭 저장
    const windowHeight = useWindowDimensions().height;                   //현재기기 화면길이 저장

    // windowWidth, windowHeight 변수선언에 필요한 width, height로 인해 StyleSheet 소스를 컴포넌트 Page_21000 내부로 이동
    const styles = StyleSheet.create({
    root: {
    position: 'relative', width: '100%', height: 900,

    flex:1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    },
    vector: {
    position: 'absolute', left: 20, top: 21.1, color: '#FFFFFF',
    },
    backgroundVideo: {
    position: 'absolute', top: '11.625%',
    width: windowWidth, height: windowHeight * 0.5,
    },
    });

    useEffect(() => {
          const unsubscribe = navigation.addListener('focus', () => {
            setSelectedIconIndex(1);
          });
          return unsubscribe;
        }, [navigation]);

return (
    <>
    <ScrollView>
      <View style={styles.root}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.vector,{zIndex: 1}]}>
            <Image source={require('../images/arrow1.png')} style={{width: 16.17, height: 19.8}}/>
        </TouchableOpacity>
        <Video source={{ uri: url }} onBuffer={this.onBuffer}
                onError={this.videoError}
                style={styles.backgroundVideo} />
      </View>
    </ScrollView>

    <Footer navigation={navigation} selectedIconIndex={selectedIconIndex} setSelectedIconIndex={setSelectedIconIndex} />
    </>
  );
};

export default Page_21000;