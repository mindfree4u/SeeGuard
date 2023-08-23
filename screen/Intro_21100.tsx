import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button,  TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Intro_21100 = ({ navigation, index }) => {
    const [state, setState] = useState('');
    const handlePress = (index) => {
        setState('index');
        navigation.navigate('Intro_21110');
    };
  return (
    <ScrollView>
        <View style={styles.root}>
            <Text style={styles.휴대폰인증}>휴대폰 인증</Text>
            <Text style={styles.text1}>사용중인 휴대폰의{'\n'}통신사를 선택해주세요.</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.Close}>
                <Image source={require('../images/Close.png')} style={{width: 14, height: 14}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Rectangle5} onPress={() => handlePress('SKT')}>
                <Text >SKT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Rectangle5, { left: 185, top: 211 }]} onPress={() => handlePress('KT')}>
                <Text >KT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Rectangle5, { left: 40, top: 395 }]} onPress={() => handlePress('LGU+')}>
                <Text >LGU+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Rectangle7} onPress={() => handlePress('알뜰폰SKT')}>
                <Text >알뜰폰 SKT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Rectangle7, { left: 185, top: 453 }]} onPress={() => handlePress('알뜰폰KT')}>
                <Text >알뜰폰 KT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Rectangle7, { left: 185, top: 511 }]} onPress={() => handlePress('알뜰폰LGU+')}>
                <Text >알뜰폰 LGU+</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
root: {
    position: 'relative', flex: 1, width: '100%', height: 800,
    background: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
휴대폰인증: {
    position: 'absolute', left: '39.166%', top: 19,
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
    color: '#000000',
},
text1: {
    position: 'absolute', left: 40, top: 105,
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 23.17,
    color: '#4D4D4D',
},
Close: {
   // position: 'absolute', marginRight: -20, right:23, top: 24, color: '#FFFFFF',
   position: 'absolute', right:'5%', top: 24, color: '#FFFFFF',
},
Rectangle5: {
    position: 'absolute', left: 40, top: 211, width: 135, height: 160,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1, borderColor: '#ACACAC', borderStyle: 'solid',
    borderRadius: 5,
},
Rectangle7: {
    position: 'absolute', left: 185, top: 395, width: 135, height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1, borderColor: '#ACACAC', borderStyle: 'solid',
    borderRadius: 5,
},
});
export default Intro_21100;

