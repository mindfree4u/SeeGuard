/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect, useState,  createContext } from 'react';
import SplashScreen from 'react-native-splash-screen';
import type {PropsWithChildren} from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screen/LoginScreen';
import Intro_21000 from './screen/Intro_21000';
import Intro_21100 from './screen/Intro_21100';
import Intro_21110 from './screen/Intro_21110';
import Intro_21200 from './screen/Intro_21200';
import Intro_22000 from './screen/Intro_22000';
import Intro_22100 from './screen/Intro_22100';
import Intro_23000 from './screen/Intro_23000';
import Intro_23100 from './screen/Intro_23100';
import Page_10000 from './screen/Page_10000';
import Page_11000 from './screen/Page_11000';
import Page_12000 from './screen/Page_12000';
import Page_12100 from './screen/Page_12100';
import Page_12200 from './screen/Page_12200';
import Page_13000 from './screen/Page_13000';
import Page_20000 from './screen/Page_20000';
import Page_21000 from './screen/Page_21000';
import Page_30000 from './screen/Page_30000';
import Page_40000 from './screen/Page_40000';
import Page_41000 from './screen/Page_41000';
import Page_42000 from './screen/Page_42000';

export const LoginIdContext = createContext();
export const AuthenticationContext = createContext();
export const BluetoothContext = createContext();
export const deviceDataContext = createContext();
export const CradleContext = createContext();
export const WiFiContext = createContext();

const Stack = createStackNavigator();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [loginId, setLoginId] = useState('');
  const [bluetoothStatus, setBluetoothStatus] = useState('');
  const [deviceData, setDeviceData] = useState('');
  const [cradleStatus, setCradleStatus] = useState(true);            //도어캠 모드의 cradle 삽입상태
  const [wifiName, setWifiName] = useState('');
  const [Authentication, setAuthentication] = useState(false);                   //휴대폰으로 본인인증 상태

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

useEffect(() => {
    // 일정 시간이 지나면 splash 화면을 숨깁니다.
   // const hideSplash = setTimeout(() => {
   setTimeout(() => {
      SplashScreen.hide();
    }, 2000); // 2초 후에 숨김

    return () => clearTimeout(hideSplash);
  }, []);

  return (
    <LoginIdContext.Provider value={{ loginId, setLoginId }}>
    <AuthenticationContext.Provider value={{ Authentication, setAuthentication }}>
   <BluetoothContext.Provider value={{ bluetoothStatus, setBluetoothStatus }}>
   <deviceDataContext.Provider value={{ deviceData, setDeviceData }}>
   <CradleContext.Provider value={{ cradleStatus, setCradleStatus }}>
   <WiFiContext.Provider value={{ wifiName, setWifiName }}>
    <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Intro_21000" component={Intro_21000} options={{ headerShown: false }}/>
            <Stack.Screen name="Intro_21100" component={Intro_21100} options={{ headerShown: false }}/>
            <Stack.Screen name="Intro_21110" component={Intro_21110} options={{ headerShown: false }}/>
            <Stack.Screen name="Intro_21200" component={Intro_21200} options={{ headerShown: false }}/>
            <Stack.Screen name="Intro_22000" component={ Intro_22000} options={{ headerShown: false }}/>
            <Stack.Screen name="Intro_22100" component={Intro_22100} options={{ headerShown: false }}/>
            <Stack.Screen name="Intro_23000" component={Intro_23000} options={{ headerShown: false }}/>
            <Stack.Screen name="Intro_23100" component={Intro_23100} options={{ headerShown: false }}/>
            <Stack.Screen name="Page_10000" component={Page_10000} options={{ headerShown: false }}/>
            <Stack.Screen name="Page_11000" component={Page_11000} options={{ headerShown: false }}/>
            <Stack.Screen name="Page_12000" component={Page_12000} options={{ headerShown: false }}/>
            <Stack.Screen name="Page_12100" component={Page_12100} options={{ headerShown: false }}/>
            <Stack.Screen name="Page_12200" component={Page_12200} options={{ headerShown: false }}/>
            <Stack.Screen name="Page_13000" component={Page_13000} options={{ headerShown: false }}/>
            <Stack.Screen name="Page_20000" component={Page_20000} options={{ headerShown: false }}/>
            <Stack.Screen name="Page_21000" component={Page_21000} options={{ headerShown: false }}/>
            <Stack.Screen name="Page_30000" component={Page_30000} options={{ headerShown: false }}/>
            <Stack.Screen name="Page_40000" component={Page_40000} options={{ headerShown: false }}/>
            <Stack.Screen name="Page_41000" component={Page_41000} options={{ headerShown: false }}/>
            <Stack.Screen name="Page_42000" component={Page_42000} options={{ headerShown: false }}/>
         </Stack.Navigator>
    </NavigationContainer>
   </WiFiContext.Provider>
   </CradleContext.Provider>
   </deviceDataContext.Provider>
   </BluetoothContext.Provider>
   </AuthenticationContext.Provider>
   </LoginIdContext.Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
});

export default App;
