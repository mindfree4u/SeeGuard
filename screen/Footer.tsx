import React from 'react';
import { View, Image, Text, StyleSheet,TouchableOpacity,} from 'react-native';


const Footer = ({ navigation, selectedIconIndex, setSelectedIconIndex }) => {

 return (
      <>
  <View style={styles.line } />
  <View style={styles.container}>
    <TouchableOpacity onPress={() => {navigation.navigate('Page_10000'); setSelectedIconIndex(0); }}>
        <Image source={selectedIconIndex === 0 ? require('../images/Group1424_1.png') :
        require('../images/Group1424.png')} style={{ width: 90, height: 56 }} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {navigation.navigate('Page_20000'); setSelectedIconIndex(1); }}>
        <Image source={selectedIconIndex === 1 ? require('../images/Group981_1.png') :
        require('../images/Group981.png')} style={{ width: 90, height: 56 }} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {navigation.navigate('Page_30000'); setSelectedIconIndex(2); }}>
        <Image source={selectedIconIndex === 2 ? require('../images/Group1426_1.png') :
        require('../images/Group1426.png')} style={{ width: 90, height: 56 }} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {navigation.navigate('Page_40000'); setSelectedIconIndex(3); }}>
        <Image source={selectedIconIndex === 3 ? require('../images/Group1428_1.png') :
        require('../images/Group1428.png')} style={{ width: 90, height: 56 }} />
    </TouchableOpacity>
  </View>
    </>
        );
 };

const styles = StyleSheet.create({
  container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 1,
      },
  line: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ACACAC',
  },
});

export default Footer;