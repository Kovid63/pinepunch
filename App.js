import { BASE_URL, GET_DETAILS } from '@env';
import * as Font from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, ToastAndroid, View } from 'react-native';
import Auth from './Auth';
import { MODE_SELLER } from './constants';
import { ModeContext } from './contexts/ModeContext';
import { MsgContext } from './contexts/MsgContext';
import { UserContext } from './contexts/UserContext';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: '', merchant_name: '', merchant_status: '', merchant_id: null });
  const [isNewMsgOn, setIsNewMsgOn] = useState(false);
  const [isItemSoldMsgOn, setIsItemSoldMsgOn] = useState(false);
  const [mode, setMode] = useState(MODE_SELLER);
  const [appIsReady, setAppIsReady] = useState(false);
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [initialScreen, setInitialScreen] = useState('');

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    Font.loadAsync({
      Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
      PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
      PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    })
      .then(() => {
        setIsFontLoaded(true)
      });
  }, []);

  async function init() {
    const sessionId = await SecureStore.getItemAsync('SESSION_ID');

    if (sessionId) {
      try {
        const response = await fetch(BASE_URL + GET_DETAILS, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "X-USER-SESSION-ID": sessionId
          }
        });

        const data = await response.json();

        if (data.error) {
          setAppIsReady(true);
          if (Platform.OS === 'android') {
            return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
          }
          else {
            return Alert.alert(data.error.description);
          }
        }

        if(data.merchant_status === 'afa_pending'){
          setInitialScreen('VerifyEmail')
          setAppIsReady(true);
          return;
        }

        if(data.merchant_status === 'in_review'){
          setInitialScreen('ProfileStack');
          setIsUserLoggedIn(true);
          setAppIsReady(true);
          return;
        }
        
        setInitialScreen('HomeStack');
        setIsUserLoggedIn(true);
        setAppIsReady(true);
        
        //const local = JSON.parse(await AsyncStorage.getItem('USER_INFO'));

      } catch (error) {
        console.log(error);
      }
    } else {
      setAppIsReady(true);
    }
  }


  useEffect(() => {
    if (isFontLoaded) {
      (async function () {
        init();
      })();
    }
  }, [isFontLoaded]);


  if (!appIsReady) {
    return null;
  }

  return (
    <UserContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn, userData, setUserData }}>
      <ModeContext.Provider value={{ mode, setMode }}>
        <MsgContext.Provider value={{ isNewMsgOn, setIsNewMsgOn, isItemSoldMsgOn, setIsItemSoldMsgOn }}>
          <View onLayout={onLayoutRootView} style={styles.container}>
            <StatusBar style="auto" />
            <Auth initialScreen={initialScreen} appIsReady={appIsReady} setAppIsReady={setAppIsReady} />
          </View>
        </MsgContext.Provider>
      </ModeContext.Provider>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  }

});
