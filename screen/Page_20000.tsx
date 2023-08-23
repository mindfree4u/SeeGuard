import React, { useState, useEffect, Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, FlatList } from 'react-native';
import Footer from './Footer';
import Video from 'react-native-video';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as moment from 'moment';
import RNFS from 'react-native-fs';

//video 저장
const downloadVideo = async (url) => {
  const fileName = url.split('/').pop();
  const localFile = `${RNFS.PicturesDirectoryPath}/${fileName}`;

  try {
    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    await RNFS.downloadFile(options).promise;
    console.log(`Video downloaded to ${localFile}`);
  } catch (error) {
    console.error(error);
  }
};

//리스트에 모드표시 아이콘
const modeIcons = {
    multi: require('../images/Group1447.png'),
    door: require('../images/Group1451.png'),
};

const Page_20000 = ({ navigation }) => {
    //테스트용 임시 데이터
    const [videos, setVideos] = useState([
      { id: '1', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        mode: 'multi', timestamp: 1691809834000, playtime: '596', saved: false },
      { id: '2', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        mode: 'door', timestamp: 16918098530000, playtime: '653', saved: false },
      { id: '3', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        mode: 'door', timestamp: 1691982622000, playtime: '15', saved: false },
      { id: '4', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
              mode: 'door', timestamp: 1691982622000, playtime: '15', saved: false },
      { id: '5', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
              mode: 'door', timestamp: 1691982622000, playtime: '15', saved: false },
    ]);

    const [selectedIconIndex, setSelectedIconIndex] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const month = selectedDate.getMonth() + 1;                              {/*이번 달*/}
    const today = selectedDate.getDate();                                   {/*오늘 날짜*/}
    const [data, setData] = useState(videos);                               {/*서버에서 가져온 녹화영상 저장용*/}
    const [select, setSelect] = useState('entire');                         {/*녹화이력 선택상태 저장, 초기상태 전체이력 */}

    useEffect(() => {
          const unsubscribe = navigation.addListener('focus', () => {
            setSelectedIconIndex(1);
          });
          return unsubscribe;
        }, [navigation]);

    useEffect(() => {
      handleSelect('entire');
    }, []);

    useEffect(() => {
       handleSelect(select);
    }, [selectedDate, videos]);

    //날짜 클릭시 호출됨
    const handleDateClick = () => {
        setModalVisible(true);
      };
    //달력창에서 날짜 선택시 호출됨
    const handleDateChange = (event, date) => {
        setSelectedDate(date);
        setModalVisible(false);
      };

    //날짜 옆 화살표 클릭시 호출됨
    const handleArrowClick = (change) => {
      setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + change)));
    };

    //목록에서 저장 아이콘 클릭시 호출됨
    const handleSave = (id) => {
          const newVideos = videos.map(video => {
            if (video.id === id) {
              downloadVideo(video.url);
              return { ...video, saved: true };
            }
            return video;
          });
          setVideos(newVideos);
          setData(newVideos);
       };

     //목록에서 삭제 아이콘 클릭시 호출됨
    const handleDelete = (id) => {
          const newVideos = videos.filter(video => video.id !== id);
          setVideos(newVideos);
          setData(newVideos);
       };

    const handleSelect = (sel) => {
          setSelect(sel);
            if (sel === 'entire') {
                setData(videos.filter((item) => {
                  const itemDate = new Date(item.timestamp);
                  return (
                    itemDate.getMonth() + 1 === month &&     // 현재 선택된 달과 일치하는지 확인
                    itemDate.getDate() === today             // 현재 선택된 날짜와 일치하는지 확인
                  );
            }));
            } else if (sel === 'multi') {
              setData(videos.filter((item) => {
                    const itemDate = new Date(item.timestamp);
                    return (
                      itemDate.getMonth() + 1 === month &&      // 선택된 달과 일치하는지 확인
                      itemDate.getDate() === today              // 선택된 날짜와 일치하는지 확인
                    );
                  }).filter((item) => item.mode === 'multi'));  // 두번째 필터링 조건 'multi'
            } else if (sel === 'door') {
              setData(videos.filter((item) => {
                    const itemDate = new Date(item.timestamp);
                    return (
                      itemDate.getMonth() + 1 === month &&      // 선택된 달과 일치하는지 확인
                      itemDate.getDate() === today              // 선택된 날짜와 일치하는지 확인
                    );
                  }).filter((item) => item.mode === 'door'));
            } else if (sel === 'record') {
              setData(videos.filter((item) => {
                    const itemDate = new Date(item.timestamp);
                    return (
                      itemDate.getMonth() + 1 === month &&      // 선택된 달과 일치하는지 확인
                      itemDate.getDate() === today              // 선택된 날짜와 일치하는지 확인
                    );
                  }).filter((item) => item.mode === 'record'));
            }
             };
    // 수신한 영상의 timestamp 변환
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const periodOfDay = hour < 12 ? '오전' : '오후';
        const time = `${year}.${month}.${day} ${periodOfDay}${hour % 12}시`;
        return time;
      };

    //목록에 이미지 클릭시 페이지 이동
    const handleVideoPress = (videoUrl) => {
        navigation.navigate('Page_21000', { url: videoUrl });
     };

return (
      <>
      <ScrollView>
      <View style={styles.root}>
      <Text style={styles.text1}>녹화이력</Text>
      <TouchableOpacity onPress={() => handleArrowClick(-1)}  style={styles.image1}>
        <Image source={require('../images/KeyboardArrowRight.png')} style={{ width: 24, height:24}}/>
      </TouchableOpacity>
            <TouchableOpacity onPress={handleDateClick} style={styles.Component1}>
                <Text style={styles.text2}>{month}월 {today}일</Text>
            </TouchableOpacity>
            <Modal visible={modalVisible} animationType="slide">
              <DateTimePicker
                value={selectedDate}
                onChange={handleDateChange}
              />
            </Modal>
      <TouchableOpacity onPress={() => handleArrowClick(1)}  style={[styles.image1, {left:'35%'}]}>
        <Image source={require('../images/KeyboardArrowLeft.png')} style={{ width: 24, height:24}}/>
      </TouchableOpacity>
      {/*전체버튼*/}
      <TouchableOpacity onPress={ () => handleSelect('entire') } style={styles.button1}>
        <Image source={ select === 'entire' ? require('../images/Group1442_.png')
                                            : require('../images/Group1442.png') } style={{width: 54, height: 22}}/>
      </TouchableOpacity>

      <TouchableOpacity onPress={ () => handleSelect('multi') } style={[styles.button1,{left:'23.33%'}]}>
         <Image source={ select === 'multi' ? require('../images/Group1443_.png')
                                            : require('../images/Group1443.png') } style={{width: 54, height: 22}}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => handleSelect('door') } style={[styles.button1,{left:'41.11%'}]}>
         <Image source={ select === 'door' ? require('../images/Group1444_.png')
                                           : require('../images/Group1444.png') } style={{width: 54, height: 22}}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => handleSelect('record') } style={[styles.button1,{left:'58.88%'}]}>
         <Image source={ select === 'record' ? require('../images/Group1445_.png')
                                             : require('../images/Group1445.png') } style={{width: 54, height: 22}}/>
      </TouchableOpacity>
      <View style={{ position: 'absolute', top: '21.625%',  marginLeft: 'auto', left:0, right: 0}}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}                                                   //목록 상태변화 즉시 적용
          renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleVideoPress(item.url)}>
                <View style={{flexDirection: 'row'}}>
                  <Video
                    source={{ uri: item.url }}
                    ref={(ref) => { this.player = ref; }}
                    onBuffer={this.onBuffer}
                    onError={this.videoError}
                    style={styles.backgroundVideo}
                    paused={true}
                  />
                  <Image source={require('../images/Rectangle3013.png')} style={styles.Rectangle3013} />
                  <Image source={modeIcons[item.mode]} style={styles.modeIcon} />
                  <Text style={styles.timestamp}>{'\n'}{'\n'}{formatTimestamp(item.timestamp)}</Text>
                  <Text style={styles.text3}>{'\n'}{'\n'}{'\n'}재생시간  {item.playtime}</Text>
                    <TouchableOpacity onPress={() => handleSave(item.id)}  style={{ position: 'absolute', left: '68.88%' }} >
                      <Image
                        source={item.saved ? require('../images/Group1453.png') : require('../images/Ellipse1190.png')}
                        style={item.saved ? { width: 34, height: 30, marginTop: 10 } : { width: 40, height: 40 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ position: 'absolute', left: '83.33%' }}>
                      <Image source={require('../images/Ellipse1191.png')} style={{ width: 40, height: 40 }} />
                    </TouchableOpacity>
                </View>
              </TouchableOpacity>

          )}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>

      </View>
      </ScrollView>

      <Footer navigation={navigation} selectedIconIndex={selectedIconIndex} setSelectedIconIndex={setSelectedIconIndex} />
      </>
  );
};

const styles = StyleSheet.create({
root: {
    position: 'relative', width: '100%', height:800, marginTop: 0,
    flex: 1,
    background: '#FFFFFF',
    justifyContent: 'center'
},
text1: {
    position: 'absolute', left: '39.72%', top: '1.88%',
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 29,
    /* Text/b02 */
    color: '#000000',
},
image1: {
    position: 'absolute', left: '5.56%', top: '9.75%', width: 24, height:24,
},
Component1: {
    position: 'absolute', left: '16.11%', top: '9.75%',
},
text2: {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 20.27,

    color: '#000000',
},
button1: {
    position: 'absolute', left: '5.56%', top: '14.12%', width: 54, height: 20,
    borderWidth: 1,
    borderColor: '#ACACAC',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
},
backgroundVideo: {
    width: 120, height: 80, marginBottom: 30, marginRight: -100
},
timestamp: {
    marginLeft: -37,
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 9,
    lineHeight: 13.03,

    color: '#6F6F6F',
},
text3: {
    marginLeft: -85,
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 14.48,

    color: '#6F6F6F',
},
Rectangle3013: {
     width: 120, height: 60,
},
modeIcon: {
    width: 40, height: 18, marginLeft: 5,
},
image2: {
    width: 34, height:30, marginLeft: 23, marginTop: 10,
},

});

export default Page_20000;