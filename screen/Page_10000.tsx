import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, StyleSheet, ScrollView, Alert } from 'react-native';
import Footer from './Footer';
import { BleManager } from 'react-native-ble-plx';
import { BluetoothContext, deviceDataContext, CradleContext } from '../App';
import Video from 'react-native-video';
import { WebView } from 'react-native-webview';
import moment from 'moment';                                                              //실시간 시간표시용

const Page_10000 = ({ navigation }) => {
    const [state, setState] = useState('MultiCam');
    const { bluetoothStatus, setBluetoothStatus } = useContext(BluetoothContext);
    const { cradleStatus, setCradleStatus } = useContext(CradleContext);
    const { deviceData, setDeviceData } = useContext(deviceDataContext);
    const [selectedIconIndex, setSelectedIconIndex] = useState(0);
    const [toggle, setToggle] = useState(false);                           //멀티캠 듣기 on,off
    const [toggle2, setToggle2] = useState(false);                         //멀티캠 상시녹화 on,off
    const [toggle4, setToggle4] = useState(false);                         //도어캠 듣기 on,off
    const [toggle5, setToggle5] = useState(false);                         //도어캠 상시녹화 on,off
    const [selectedResolution, setSelectedResolution] = useState(1);       //멀티캠 해상도
    const [selectedResolution2, setSelectedResolution2] = useState(1);     //도어캠 해상도
    const [selectedFrame, setSelectedFrame] = useState(1);                 //멀티캠 프레임
    const [selectedFrame2, setSelectedFrame2] = useState(1);               //도어캠 프레임
    const onImg = require('../images/ToggleOn.png');
    const offImg = require('../images/ToggleOff.png');
    const [currentDateTime, setCurrentDateTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));



    useEffect(() => {
        const manager = new BleManager();

        // Get the current state of the Bluetooth adapter
        manager.state().then(state => {
            setBluetoothStatus(state === 'PoweredOn');
          });

        // Listen for changes in the state of the Bluetooth adapter
        manager.onStateChange(state => {
            setBluetoothStatus(state === 'PoweredOn');
          });
        return () => {
          manager.destroy();
        };
      }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          setSelectedIconIndex(0);
        });

        return unsubscribe;
      }, [navigation]);

    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentDateTime(moment().format('YYYY-MM-DD HH:mm:ss'));
        }, 1000);

        return () => clearInterval(timer);
      }, []);

    const handleImagePress = () => {
       Alert.alert(
                  '원하시는 등록방식을 선택해주세요.',
                  '',
                  [
                    { text: 'QR코드로 스캔', onPress: () => navigation.navigate('Page_11000') },
                    { text: '수동으로 등록', onPress: () => navigation.navigate('Page_12000') },
                  ]
                );
      };

    //클릭시 멀티캠 듣기 버튼 on, off
    const renderImage = () => {
          var imgSource = toggle ? onImg : offImg;
          return <Image source={imgSource} style={{width: 54, height:26}}/>;
        };

    //클릭시 멀티캠 상시녹화 버튼 on, off
    const renderImage2 = () => {
            var imgSource = toggle2 ? onImg : offImg;
            return <Image source={imgSource} style={{width: 54, height:26}}/>;
          };

    //클릭시 도어캠 듣기 버튼 on, off
    const renderImage4 = () => {
                var imgSource = toggle4 ? onImg : offImg;
                return <Image source={imgSource} style={{width: 54, height:26}}/>;
           };

    //클릭시 도어캠 상시녹화 버튼 on, off
    const renderImage5 = () => {
                var imgSource = toggle5 ? onImg : offImg;
                return <Image source={imgSource} style={{width: 54, height:26}}/>;
            };

    //멀티캠 해상도 선택버튼 구분
    const handleResolution = (buttonNumber) => {
        setSelectedResolution(buttonNumber);
      }

    //도어캠 해상도 선택버튼 구분
    const handleResolution2 = (buttonNumber) => {
            setSelectedResolution2(buttonNumber);
      }

    //멀티캠 프레임 선택버튼 구분
    const handleFrame = (buttonNumber) => {
            setSelectedFrame(buttonNumber);
      }
    //도어캠 프레임 선택버튼 구분
    const handleFrame2 = (buttonNumber) => {
            setSelectedFrame2(buttonNumber);
      }

    const handleSnapShot = () => {
    //SnapShot 구현 추가
    };

  return (
      <>
      <ScrollView>
      <View style={styles.root}>
      {deviceData === '' &&  (
            <>
            <Image source={require('../images/Logo1.png')} style={styles.image1}/>
            <Text style={styles.text1}>등록된 기기가 없습니다.</Text>
            <TouchableOpacity onPress={handleImagePress} style={styles.image2}>
                <Image source={require('../images/Device+.png')} style={{ width: 144, height:144 }}/>
            </TouchableOpacity>
            </>
          )}

      {deviceData !== '' && (
        <>
        {state === 'MultiCam' ? (
        <>
        <ImageBackground source={require('../images/Rectangle271.png')} style={styles.Rectangle271}/>
        <ImageBackground source={require('../images/Logo2.png')} style={styles.Logo}/>
        <TouchableOpacity style={{ position: 'absolute', left: '5.56%', top: '9%' }} onPress={ () => setState('MultiCam') }>
            <Text style={state==='MultiCam' ?styles.text2 : [styles.text3, {fontWeight: 400,}] }>멀티캠모드</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={{position: 'absolute', left: '33.61%', top: '9%' }} onPress={ () => setState('DoorCam') }>
            <Text style={state==='DoorCam' ?[styles.text2, {fontWeight: 700,}] : styles.text3}>도어캠모드</Text>
        </TouchableOpacity>
        <ImageBackground source={require('../images/Group1400.png')} style={styles.Group1400}/>
        <Text style={styles.text4}>배터리</Text>
        <>
        {bluetoothStatus  ? (
        <>
        <ImageBackground source={require('../images/Group1412.png')} style={styles.Group1437}/>
        <TouchableOpacity  onPress={ () => navigation.navigate('Page_13000')} style={styles.Component1} >
            <Image source={require('../images/Group1441.png')} style={ styles.Group1441 }/>
        </TouchableOpacity>
        <Image source={require('../images/Rectangle2999.png')} style={[styles.Rectangle2999, {top:'35.75%'}]}/>
        <TouchableOpacity onPress={() => setToggle(!toggle)} style={styles.Group1412}>
            {renderImage()}
        </TouchableOpacity>
        <Image source={require('../images/Rectangle3003.png')} style={[styles.Rectangle3003, {left:'36.66%'}] }/>
        <TouchableOpacity onPress={() => setToggle2(!toggle2)} style={[styles.Group1412, {left:'45.83%'}]}>
            {renderImage2()}
        </TouchableOpacity>
        <Image source={require('../images/Rectangle3001.png')} style={[styles.Rectangle3003, {left:'67.77%'}]}/>
        <Image source={require('../images/Rectangle2989.png')} style={[styles.Rectangle2989, {top:'48%'}]}/>
        <Text style={[styles.text4, {left: '8.88%', top:'49.5%' }]}>해상도</Text>
        <TouchableOpacity onPress={() => handleResolution(1)} style={styles.Group1434}>
            <Image source={ selectedResolution === 1 ? require('../images/Group1434.png')
                                                     : require('../images/Group1434_.png')
                           } style={{ width: 54, height: 26 }}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleResolution(2)} style={[styles.Group1434,{left:'56.11%'}]}>
                    <Image source={ selectedResolution === 2 ? require('../images/Group1435.png')
                                                             : require('../images/Group1435_.png')
                                   } style={{ width: 54, height: 26 }}/>
        </TouchableOpacity>
        {/*해상도 1080*/}
        <TouchableOpacity onPress={() => handleResolution(3)} style={[styles.Group1434,{left:'73.88%'}]}>
            <Image source={ selectedResolution === 3 ? require('../images/Group1436.png')
                                                       : require('../images/Group1436_.png')
                                   } style={{ width: 54, height: 26 }}/>
        </TouchableOpacity>
        <Image source={require('../images/Rectangle2989.png')} style={[styles.Rectangle2989, {top:'60.25%'}]}/>
        <Text style={[styles.text4, {left: '8.88%', top:'61.75%' }]}>프레임</Text>
        {/*멀티갬 프레임 60 버튼*/}
        <TouchableOpacity onPress={() => handleFrame(1)} style={[styles.Group1434,{left:'56.11%', top:'65%'}]}>
            <Image source={ selectedFrame === 1 ? require('../images/Rectangle2997.png')
                                                : require('../images/Rectangle2997_.png')
                                   } style={{ width: 54, height: 26 }}/>
        </TouchableOpacity>
        {/*멀티갬 프레임 30 버튼*/}
        <TouchableOpacity onPress={() => handleFrame(2)} style={[styles.Group1434,{left:'73.88%', top:'65%'}]}>
            <Image source={ selectedFrame === 2 ? require('../images/Rectangle2996.png')
                                                : require('../images/Rectangle2996_.png')
                                   } style={{ width: 54, height: 26 }}/>
        </TouchableOpacity>
        <Image source={require('../images/Rectangle2989.png')} style={[styles.Rectangle2989, {top:'72.5%'}]}/>
        <Text style={[styles.text4, {left: '8.88%', top:'74%' }]}>밝기</Text>
        </>
        ) : (
        <>
        <ImageBackground source={require('../images/Group1437.png')} style={styles.Group1437}/>
        <Image source={require('../images/Rectangle2987.png')} style={styles.Rectangle2987}/>
        <Text style={styles.text5}>-%</Text>
        <View style={{flex: 1, ...StyleSheet.absoluteFillObject, pointerEvents: 'none', opacity: 0.5}} >
        <Image source={require('../images/Group1441.png')} style={ [styles.Component1, {width: 84, height: 40}] }/>
        <Image source={require('../images/Rectangle2999.png')} style={[styles.Rectangle2999, {top:'35.75%'}]}/>
        <Image source={require('../images/ToggleOff.png')} style={[styles.Group1412, {width: 54, height:26}]}/>
        <Image source={require('../images/Rectangle3003.png')} style={[styles.Rectangle3003, {left:'36.66%'}] }/>
        <Image source={require('../images/ToggleOff.png')} style={[styles.Group1412, {left:'45.83%', width: 54, height:26}]}/>
        <Image source={require('../images/Rectangle3001.png')} style={[styles.Rectangle3003, {left:'67.77%'}]}/>
        <Image source={require('../images/Rectangle2989.png')} style={[styles.Rectangle2989, {top:'48%'}]}/>
        <Text style={[styles.text4, {left: '8.88%', top:'49.5%' }]}>해상도</Text>
        <Image source={ require('../images/Group1434_.png')} style={[styles.Group1434, { width: 54, height: 26 }]}/>
        <Image source={ require('../images/Group1435_.png')} style={[styles.Group1434, { left:'56.11%', width: 54, height: 26 }]}/>
        {/*해상도 1080*/}
        <Image source={require('../images/Group1436_.png') } style={[styles.Group1434, { left:'73.88%', width: 54, height: 26 }]}/>
        <Image source={require('../images/Rectangle2989.png')} style={[styles.Rectangle2989, {top:'60.25%'}]}/>
        <Text style={[styles.text4, {left: '8.88%', top:'61.75%' }]}>프레임</Text>
        {/*멀티갬 프레임 60 버튼*/}
        <Image source={ require('../images/Rectangle2997_.png')}
                        style={[styles.Group1434,{ left:'56.11%', top:'65%', width: 54, height: 26 }]}/>
        {/*멀티갬 프레임 30 버튼*/}
        <Image source={ require('../images/Rectangle2996_.png')}
                        style={[styles.Group1434,{ left:'73.88%', top:'65%', width: 54, height: 26 }]}/>
        <Image source={require('../images/Rectangle2989.png')} style={[styles.Rectangle2989, {top:'72.5%'}]}/>
        <Text style={[styles.text4, {left: '8.88%', top:'74%' }]}>밝기</Text>
        </View>
        <ImageBackground source={require('../images/Group1430.png')} style={styles.image3}/>
        </>
        )}
        </>
        </>
        )
         : (                                                 //DoorCam 모드 화면시작
        <>
        <ImageBackground source={require('../images/Rectangle271.png')} style={styles.Rectangle271}/>
        <ImageBackground source={require('../images/Logo2.png')} style={styles.Logo}/>
        <TouchableOpacity style={{ position: 'absolute', left: '5.56%', top: '9%',}} onPress={ () => setState('MultiCam') }>
            <Text style={state==='MultiCam' ?styles.text2 : [styles.text3, {fontWeight: 400,}] }>멀티캠모드</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={{position: 'absolute', left: '33.61%', top: '9%',}} onPress={ () => setState('DoorCam') }>
            <Text style={state==='DoorCam' ?[styles.text2, {fontWeight: 700,}] : styles.text3}>도어캠모드</Text>
        </TouchableOpacity>
        <Image source={require('../images/Rectangle3009.png')} style={styles.Rectangle3009}/>

        {cradleStatus  ? (                                  //도어캠모드의 크래들 삽입된 상태의 화면시작
                 <>
        {/*도어캠 임시 test영상 */}
        <View style={styles.videoContainer}>
            <Video
               source={{ uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}}
               onBuffer={this.onBuffer}
               onError={this.videoError}
               style={{width: 420, height:180}} />
        </View>
        <Text style={[styles.text4, {left: '5.55%', top: '39.375%'}]}>{moment(currentDateTime).format('YYYY.MM.DD.')}
                                    {moment(currentDateTime).format('HH:mm:ss')}</Text>

        <TouchableOpacity  style={{position: 'absolute', left: '49.72%', top: '37.625%',}} onPress={handleSnapShot} >
            <Image source={require('../images/Rectangle3011.png')} style={styles.Rectangle3011}/>
        </TouchableOpacity>
        <TouchableOpacity  style={{position: 'absolute', left: '73.88%', top: '37.625%',}}
                            onPress={() => navigation.navigate('Page_13000')} >
            <Image source={require('../images/Rectangle3010.png')} style={{width: 75, height: 25}}/>
        </TouchableOpacity>
        <Image source={require('../images/Rectangle2999.png')} style={styles.Rectangle2999}/>
        <TouchableOpacity onPress={() => setToggle4(!toggle4)} style={[styles.Group1412, {top:'49.875%'}]}>
            {renderImage4()}
        </TouchableOpacity>
        <Image source={require('../images/Rectangle3003.png')} style={[styles.Rectangle3003, {left:'36.66%', top:'45.25%'}] }/>
        <TouchableOpacity onPress={() => setToggle5(!toggle5)} style={[styles.Group1412, {left:'45.83%', top:'49.875%'}]}>
            {renderImage5()}
        </TouchableOpacity>
        <Image source={require('../images/Rectangle3001.png')} style={[styles.Rectangle3003, {left:'67.77%', top:'45.25%'}]}/>
        <Image source={require('../images/Rectangle2989.png')} style={styles.Rectangle2989}/>
        <Text style={[styles.text4, {left: '8.88%', top:'59%' }]}>해상도</Text>
        {/*도어캠 해상도 480 버튼*/}
        <TouchableOpacity onPress={() => handleResolution2(1)} style={[styles.Group1434, {top:'62.25%'}]}>
            <Image source={ selectedResolution2 === 1 ? require('../images/Group1434.png')
                                                     : require('../images/Group1434_.png')
                                    } style={{ width: 55, height: 26 }}/>
        </TouchableOpacity>
        {/*도어캠 해상도 720 버튼*/}
        <TouchableOpacity onPress={() => handleResolution2(2)} style={[styles.Group1434,{left:'56.11%', top:'62.25%'}]}>
            <Image source={ selectedResolution2 === 2 ? require('../images/Group1435.png')
                                                     : require('../images/Group1435_.png')
                                     } style={{ width: 55, height: 26 }}/>
        </TouchableOpacity>
        {/*도어캠 해상도 1080 버튼*/}
        <TouchableOpacity onPress={() => handleResolution2(3)} style={[styles.Group1434,{left:'73.88%', top:'62.25%'}]}>
        <Image source={ selectedResolution2 === 3 ? require('../images/Group1436.png')
                                                  : require('../images/Group1436_.png')
                                     } style={{ width: 55, height: 26 }}/>
        </TouchableOpacity>
        <Image source={require('../images/Rectangle2989.png')} style={[styles.Rectangle2989, {top:'69.75%'}]}/>
        <Text style={[styles.text4, {left: '8.88%', top:'71.25%' }]}>프레임</Text>
        {/*멀티갬 프레임 60 버튼*/}
        <TouchableOpacity onPress={() => handleFrame2(1)} style={[styles.Group1434,{left:'56.11%', top:'74.5%'}]}>
            <Image source={ selectedFrame2 === 1 ? require('../images/Rectangle2997.png')
                                                 : require('../images/Rectangle2997_.png')
                                     } style={{ width: 54, height: 26 }}/>
        </TouchableOpacity>
        {/*멀티갬 프레임 30 버튼*/}
        <TouchableOpacity onPress={() => handleFrame2(2)} style={[styles.Group1434,{left:'73.88%', top:'74.5%'}]}>
            <Image source={ selectedFrame2 === 2 ? require('../images/Rectangle2996.png')
                                                 : require('../images/Rectangle2996_.png')
                                     } style={{ width: 54, height: 26 }}/>
        </TouchableOpacity>
        <Image source={require('../images/Rectangle2989.png')} style={[styles.Rectangle2989, {top:'82%'}]}/>
        <Text style={[styles.text4, {left: '8.88%', top:'83.5%' }]}>밝기</Text>
           </>
        ) : (                                                   //도어캠모드에서 cradle 미삽입 화면 시작
          <>
        <View style={{ position:'absolute', top:106, width: '100%', height: 180, backgroundColor: '#000000' }} />
        <Image source={require('../images/Rectangle3011.png')}
                   style={[styles.Rectangle3011, {position: 'absolute', left: '49.72%', top: '37.625%',}]}/>
        <Image source={require('../images/Rectangle3010.png')}
               style={{position: 'absolute', left: '73.88%', top: '37.625%', width: 75, height: 25}}/>
        <View style={{flex: 1, ...StyleSheet.absoluteFillObject, pointerEvents: 'none', opacity: 0.5}} >
        <Image source={require('../images/Rectangle2999.png')} style={styles.Rectangle2999}/>
        <Image source={require('../images/ToggleOff.png')} style={[styles.Group1412, {top:'49.875%', width: 54, height:26}]}/>
        <Image source={require('../images/Rectangle3003.png')} style={[styles.Rectangle3003, {left:'36.66%', top:'45.25%'}] }/>
        <Image source={require('../images/ToggleOff.png')} style={[styles.Group1412, {left:'45.83%', top:'49.875%', width: 54, height:26}]}/>
        <Image source={require('../images/Rectangle3001.png')} style={[styles.Rectangle3003, {left:'67.77%', top:'45.25%'}]}/>
        <Image source={require('../images/Rectangle2989.png')} style={styles.Rectangle2989}/>
        <Text style={[styles.text4, {left: '8.88%', top:'59%' }]}>해상도</Text>
        <Image source={ require('../images/Group1434_.png')} style={[styles.Group1434, { top:'62.25%', width: 54, height: 26 }]}/>
        <Image source={ require('../images/Group1435_.png')} style={[styles.Group1434, {left:'56.11%', top:'62.25%', width: 54, height: 26 }]}/>
        {/*해상도 1080*/}
        <Image source={require('../images/Group1436_.png') } style={[styles.Group1434, { left:'73.88%', top:'62.25%', width: 54, height: 26 }]}/>
        <Image source={require('../images/Rectangle2989.png')} style={[styles.Rectangle2989, {top:'69.75%'}]}/>
        <Text style={[styles.text4, {left: '8.88%', top:'71.25%' }]}>프레임</Text>
        {/*멀티갬 프레임 60 버튼*/}
        <Image source={ require('../images/Rectangle2997_.png')}
                        style={[styles.Group1434,{ left:'56.11%', top:'74.5%', width: 54, height: 26 }]}/>
        {/*멀티갬 프레임 30 버튼*/}
        <Image source={ require('../images/Rectangle2996_.png')}
                        style={[styles.Group1434,{ left:'73.88%', top:'74.5%', width: 54, height: 26 }]}/>
        <Image source={require('../images/Rectangle2989.png')} style={[styles.Rectangle2989, {top:'82%'}]}/>
        <Text style={[styles.text4, {left: '8.88%', top:'83.5%' }]}>밝기</Text>
        </View>
        <ImageBackground source={require('../images/Group1416.png')} style={styles.Group1416}/>
          </>
          )}

         </>
         )}
         </>
         )}
      </View>
      </ScrollView>

      <Footer navigation={navigation} selectedIconIndex={selectedIconIndex} setSelectedIconIndex={setSelectedIconIndex} />
      </>
  );
};

const styles = StyleSheet.create({
root: {
    position: 'relative', width: '100%', height:800,
    flex:1,
    background: '#F9FBFD',
    justifyContent: 'center',
    alignItems: 'center'
},
image1: {
    position: 'absolute', left: '5.56%', top: 23.82, width: 91.08, height:14.26,
},
text1: {
    position: 'absolute', top: '28.12%',

    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 20.27,

    color: '#6F6F6F',
},
image2: {
    position: 'absolute', top: '35.5%',
},
Logo: {
    position: 'absolute', left:20, top: 23.82, width:93, height:15,
},
Rectangle271: {
    position: 'absolute', top: '0%', width: '100%', height: 106,
},
text2: {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 23,
    color: '#FFFFFF',
},
videoContainer: {
    position: 'absolute', top: '13.25%',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'

},
Rectangle3009: {
    position: 'absolute', left: '5.55%', top: '37%', width: 34, height: 17,
},
Rectangle3011: {
     width: 75, height: 25
},
Rectangle3007: {
    position: 'absolute', left: 0, right:0, top: 106, width: '100%', height: 180,
},
Group1400: {
    position: 'absolute', left: 20, top: 146, width: 90, height: 90,
},
Group1437: {
    position: 'absolute', left: 97, top: 139, width: 23, height: 23,
},
Component1: {
    position: 'absolute', left: '38.33%', top: '24.75%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
},
Group1441: {
    width: 84, height: 40,
},
Rectangle2999: {
    position: 'absolute', left: '5.55%', top: '45.25%', width: 96, height: 74,
},
Rectangle2987: {
    position: 'absolute', left: '50%', top: '20.375%', width: 84, height: 8,
},
text5: {
    position: 'absolute', left: '79.44%', top: '19.625%',

    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 20.27,
    color: '#0B162B',
},
Group1412: {
    position: 'absolute', left: '14.448%', top: '40.375%',
},
Rectangle3003: {
    position: 'absolute', top: '35.75%', width: 96, height: 74,
},
Rectangle2989: {
    position: 'absolute', left: '5.55%', top: '57.5%', width: '85%', height: '9.25%'
},
Group1434: {
    position: 'absolute', left: '38.33%', top: '52.75%',
},
text3: {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 23,
    color: '#6F6F6F',
},
text4: {
    position: 'absolute', left: 138, top: 160,
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 14,
    color: '#4D4D4D',
},
image3: {
    position: 'absolute', left: '50%', top: '40%', width: 246, height:108, marginLeft: -123,
},
Group1416: {
    position: 'absolute', top: '22.875%', width: 281, height:27,
},
});

export default Page_10000;