import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors } from '../../colors'
import ModeBtn from '../../components/ModeBtn'
import { ModeContext } from '../../contexts/ModeContext'
import { MODE_SELLER } from '../../constants'
import { TouchableOpacity } from 'react-native'
import { BASE_URL, MERCHANT } from '@env';
import * as SecureStore from 'expo-secure-store';
import { ToastAndroid } from 'react-native'
import { Alert } from 'react-native'
import { RefreshControl } from 'react-native'
import { UserContext } from '../../contexts/UserContext';
const Profile = ({ navigation }) => {

  const { mode } = useContext(ModeContext);
  const { setUserData, initialScreen } = useContext(UserContext);

  const [merchantData, setMerchantData] = useState({ ...merchantData, seller_background_image_url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', buyer_background_image_url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' });
  const [refreshing, setRefreshing] = useState(false);
  function settingsPageHandler() {
    navigation.navigate('Settings')
  }

  async function fetchDetails() {
    const sessionId = await SecureStore.getItemAsync('SESSION_ID');
    const response = await fetch(BASE_URL + MERCHANT, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-USER-SESSION-ID": sessionId
      }
    });

    const data = await response.json();

    if (data.error) {
      if (Platform.OS === 'android') {
        //return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
      }
      else {
        //return Alert.alert(data.error.description);
      }
    }

    setMerchantData(data);
  }

  function onRefresh() {
    setRefreshing(true);
    setUserData(Math.random(0, 9));
    fetchDetails();
    setRefreshing(false);
  }

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      fetchDetails();
    })
    return () => focusListener;
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.modeBtnContainer}>
        <ModeBtn />
      </View>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
        {
          mode === MODE_SELLER ?
            <View>
              <View style={[styles.bannerContainer, {justifyContent: 'center', alignItems: 'center'}]}>
              
                <Image style={[styles.bannerImage, { backgroundColor: '#FDC89F' }]} source={{ uri: merchantData.seller_background_image_url }} />
                {/* <View style={styles.bannerCover} /> */}
                { initialScreen === 'ProfileStack' && <Text style={{position: 'absolute', textAlign: 'center', fontFamily: 'PoppinsBold', fontSize: 20, width: '95%'}}>{'Your Identity is under review. It would take 2 - 3 working days.'}</Text>}
              </View>
              <View style={styles.profileImageContainer}>
                <Image style={{ height: '100%', width: '100%', borderRadius: 60 }} source={{ uri: merchantData.seller_profile_image_url }} />
              </View>
            </View>
            :
            <View>
              <View style={[styles.bannerContainer, {justifyContent: 'center', alignItems: 'center'}]}>
                <Image style={[styles.bannerImage, { backgroundColor: colors.black[5] }]} source={{ uri: merchantData.buyer_background_image_url }} />
                { initialScreen === 'ProfileStack' && <Text style={{position: 'absolute', textAlign: 'center', fontFamily: 'PoppinsBold', fontSize: 20, width: '95%'}}>{'Your Identity is under review. It would take 2 - 3 working days.'}</Text>}
              </View>
              <View style={styles.profileImageContainer}>
                <Image style={{ height: '100%', width: '100%', borderRadius: 60}} source={{ uri: merchantData.buyer_profile_image_url }} />
              </View>
            </View>
        }
        <View style={styles.profileNameContainer}>
          <Text style={styles.profileName}>{merchantData.name}</Text>
          {mode === MODE_SELLER && <Text style={{
            fontFamily: 'PoppinsBold',
            fontSize: 18,
            textAlign: 'center'
          }}>{merchantData.seller_profile_description}</Text>}
        </View>
        {mode === MODE_SELLER && <View style={{ overflow: 'hidden' }}>
          <View
            style={{
              borderStyle: 'dotted',
              borderWidth: 2,
              borderColor: '#000',
              margin: -2,
              marginTop: 10,
            }}>
            <View style={{ width: '95%' }} />
          </View>
        </View>}
        <TouchableOpacity onPress={settingsPageHandler} activeOpacity={0.4} style={styles.settingsBtnContainer}>
          <Text style={styles.settingsBtnText}>{'Settings Page'}</Text>
        </TouchableOpacity>
        <View style={styles.profileInfoContainer}>
          <View style={{ backgroundColor: '#F8F8F8' }}>
            <Text style={styles.infoTitle}>{'Company Name'}</Text>

            <Text style={styles.infoText}>{merchantData.name}</Text>
          </View>

          <Text style={styles.infoTitle}>{'Location'}</Text>

          <Text style={styles.infoText}>{merchantData.address}</Text>
          <View style={{ backgroundColor: '#F8F8F8' }}>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Text style={styles.infoTitle}>{'Contact No:  '}</Text>
              <Text style={[styles.infoText, { marginTop: 6 }]}>{mode === MODE_SELLER ? merchantData.seller_contact : merchantData.contact}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.infoTitle}>{'Email:  '}</Text>
              <Text style={[styles.infoText, { marginTop: 6 }]}>{merchantData.email}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: '8%',
  },
  modeBtnContainer: {
    width: '73%',
    alignSelf: 'center',
    marginTop: '15%',
  },

  bannerContainer: {
    height: 175,
    width: '100%',
    alignSelf: 'center',
    marginTop: '10%'
  },

  bannerCover: {
    position: 'absolute',
    backgroundColor: colors.primary[0],
    height: '100%',
    width: '100%',
    borderRadius: 24,
    opacity: 0.65
  },

  bannerImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
    borderRadius: 24
  },

  profileImageContainer: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    marginTop: '-20%'
  },

  profileNameContainer: {
    alignSelf: 'center',
    marginTop: '5%'
  },

  profileName: {
    fontFamily: 'PoppinsBold',
    fontSize: 24
  },

  settingsBtnContainer: {
    alignSelf: 'center',
    marginTop: '5%',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 16
  },

  settingsBtnText: {
    fontFamily: 'PoppinsBold',
    fontSize: 16,
    color: '#B3B1B0'
  },

  profileInfoContainer: {
    marginTop: '5%',
    marginBottom: 100,
  },

  infoTitle: {
    fontFamily: 'Poppins',
    marginTop: '3%'
  },

  infoContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: colors.black[5],
    borderRadius: 16,
    marginTop: '2%',
    justifyContent: 'center',
    paddingHorizontal: '8%'
  },

  infoText: {
    fontFamily: 'PoppinsBold',
    fontSize: 18,
    color: '#000',
  },

});

export default Profile;