import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { UserContext } from './contexts/UserContext';
import Auth from './Auth';
import { ModeContext } from './contexts/ModeContext';

export default function App() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [mode, setMode] = useState('Seller');

  return (
    <UserContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
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
