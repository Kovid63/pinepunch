import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { UserContext } from './contexts/UserContext';
import Auth from './Auth';
import { ModeContext } from './contexts/ModeContext';
import { MODE_BUYER, MODE_SELLER } from './constants';


export default function App() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState({email: '', merchant_name: '', merchant_status: '', merchant_id: null});
  const [mode, setMode] = useState(MODE_SELLER);

  return (
    <UserContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn, userData, setUserData }}>
      <ModeContext.Provider value={{ mode, setMode }}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Auth />
        </View>
      </ModeContext.Provider>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
