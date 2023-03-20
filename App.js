import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { UserAuthStack } from './navigation/UserAuthStack';
import { UserContext } from './contexts/UserContext';
import Auth from './Auth';

export default function App() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{isUserLoggedIn, setIsUserLoggedIn}}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Auth />
      </View>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
