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
import EditProfileIcon from '../../components/EditProfileIcon'
import { Path, Svg } from 'react-native-svg'
import * as ImagePicker from 'expo-image-picker';
import { getImageUrl } from '../../utils/getImageUrl'

const Profile = ({ navigation }) => {

  const { mode } = useContext(ModeContext);
  const { setUserData, initialScreen } = useContext(UserContext);

  const [merchantData, setMerchantData] = useState({});
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

  async function imagePickHandler(type, mode) {
    const mediaPermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    const sessionId = await SecureStore.getItemAsync('SESSION_ID');
    if (!mediaPermission.granted) {
        if (!mediaPermission.canAskAgain) {
            return Alert.alert('Permission Required', 'Please grant access for media to add photos.', [
                {
                    text: 'cancel',
                    style: 'cancel'
                },
                {
                    text: 'Open Settings',
                    onPress: () => {
                        if (Platform.OS === 'ios') {
                            Linking.openURL('app-settings:');
                        } else {
                            Linking.openSettings();
                        }
                    }
                }
            ])
        }
        await ImagePicker.requestMediaLibraryPermissionsAsync();
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: type === 'Banner' ? [16, 9] : [16, 16],
        quality: 1,
    });

    if (!result.canceled) {
        setRefreshing(true);
        if (mode === MODE_SELLER) {

            if (type === 'Banner') {
                const bgUrl = await getImageUrl(result.assets[0].uri, 'merchant_seller_background', sessionId, () => {});
                setMerchantData({ ...merchantData, seller_background_image_url: bgUrl });
                setRefreshing(false);
            } else {
                const profUrl = await getImageUrl(result.assets[0].uri, 'merchant_seller_logo', sessionId, () => {});
                setMerchantData({ ...merchantData, seller_profile_image_url: profUrl });
                setRefreshing(false);
            }

        } else {
            if (type === 'Banner') {
                const bgUrl = await getImageUrl(result.assets[0].uri, 'merchant_buyer_background', sessionId, () => {});
                setMerchantData({ ...merchantData, buyer_background_image_url: bgUrl });
                setRefreshing(false);
            } else {
                const profUrl = await getImageUrl(result.assets[0].uri, 'merchant_buyer_logo', sessionId, () => {});
                setMerchantData({ ...merchantData, buyer_profile_image_url: profUrl });
                setRefreshing(false);
            }
        }

    }
    return;
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
              <View style={[styles.bannerContainer, { justifyContent: 'center', alignItems: 'center' }]}>

                <Image style={[styles.bannerImage, { backgroundColor: '#FDC89F' }]} source={{ uri: merchantData.seller_background_image_url }} />
                {/* <View style={styles.bannerCover} /> */}
                {initialScreen === 'ProfileStack' && <Text style={{ position: 'absolute', textAlign: 'center', fontFamily: 'PoppinsBold', fontSize: 20, width: '95%' }}>{'Your Identity is under review. It would take 2 - 3 working days.'}</Text>}
                <View style={{ position: 'absolute', right: 40, top: 5 }}>
                  <EditProfileIcon onPress={() => imagePickHandler('Banner', MODE_SELLER)} />
                </View>
              </View>
              <View style={[styles.profileImageContainer, { backgroundColor: colors.primary[0], borderRadius: 60 }]}>
                {merchantData.seller_profile_image_url ? <Image style={{ height: '100%', width: '100%', borderRadius: 60, backgroundColor: colors.primary[0] }} source={{ uri: merchantData.seller_profile_image_url }} /> : <Text style={{ fontFamily: 'PoppinsBold', color: "#FFFFFF", marginTop: 45, alignSelf: 'center' }}>{'Add Logo'}</Text>}
                <View style={{ position: 'absolute', right: 0 }}>
                  <EditProfileIcon onPress={() => imagePickHandler('Profile', MODE_SELLER)} />
                </View>
              </View>
            </View>
            :
            <View>
              <View style={[styles.bannerContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <Image style={[styles.bannerImage, { backgroundColor: colors.black[5] }]} source={{ uri: merchantData.buyer_background_image_url }} />
                {initialScreen === 'ProfileStack' && <Text style={{ position: 'absolute', textAlign: 'center', fontFamily: 'PoppinsBold', fontSize: 20, width: '95%' }}>{'Your Identity is under review. It would take 2 - 3 working days.'}</Text>}
                <View style={{ position: 'absolute',  right: 40, top: 5 }}>
                  <EditProfileIcon onPress={() => imagePickHandler('Banner', MODE_BUYER)} />
                </View>
              </View>
              <View style={[styles.profileImageContainer, { backgroundColor: 'silver', borderRadius: 60 }]}>
                {merchantData.buyer_profile_image_url ? <Image style={{ height: '100%', width: '100%', borderRadius: 60 }} source={{ uri: merchantData.buyer_profile_image_url }} /> : <Text style={{ fontFamily: 'PoppinsBold', color: "#FFFFFF", marginTop: 45, alignSelf: 'center' }}>{'Add Logo'}</Text>}
                <View style={{ position: 'absolute', right: 0 }}>
                  <EditProfileIcon onPress={() => imagePickHandler('Profile', MODE_BUYER)} />
                </View>
              </View>
            </View>
        }
        <View style={styles.profileNameContainer}>
          <Text style={styles.profileName}>{merchantData.name}</Text>
          {mode === MODE_SELLER && <Text style={{
            fontFamily: 'PoppinsBold',
            fontSize: 18,
            textAlign: 'center'
          }}>{merchantData.seller_profile_description? merchantData.seller_profile_description: 'About Company'}</Text>}
        </View>
        {/* {mode === MODE_SELLER && <View style={{ overflow: 'hidden' }}>
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
        </View>} */}
        <TouchableOpacity onPress={settingsPageHandler} activeOpacity={0.4} style={styles.settingsBtnContainer}>
          <Text style={styles.settingsBtnText}>{'Settings Page'}</Text>
        </TouchableOpacity>
        <View style={styles.profileInfoContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={[styles.infoTitle, {marginTop: 10}]}>{'Company Name'}</Text>
            <TouchableOpacity>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={19}
                fill="none"
              >
                <Path
                  fill="#FD9340"
                  d="M15.225 6.254 6.44 17.617a2.104 2.104 0 0 1-1.634.817l-3.502.043a.4.4 0 0 1-.393-.312l-.796-3.45c-.138-.635 0-1.29.404-1.796l6.229-8.062a.313.313 0 0 1 .424-.054L9.792 6.89c.17.14.403.215.648.182a.945.945 0 0 0 .817-1.042 1.05 1.05 0 0 0-.33-.635L8.382 3.352a.378.378 0 0 1-.064-.526l.987-1.28c.913-1.172 2.504-1.28 3.788-.258l1.475 1.172c.605.473 1.008 1.096 1.146 1.752.16.721-.01 1.43-.488 2.042Z"
                />
              </Svg>
            </TouchableOpacity>
          </View>
          <Text style={[styles.infoText, {backgroundColor: '#fff', width: '75%'}]}>{merchantData.name}</Text>
          <Text style={[styles.infoTitle, {marginTop: 10}]}>{'Location'}</Text>

          <Text style={[styles.infoText, {backgroundColor: '#fff', width: '75%'}]}>{merchantData.address}</Text>
          <View style={{ backgroundColor: '#F8F8F8' }}>
            <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
              <Text style={styles.infoTitle}>{'Contact No:  '}</Text>
              <Text style={[styles.infoText, {backgroundColor: '#fff', width: '75%'}]}>{mode === MODE_SELLER ? merchantData.seller_contact : merchantData.contact}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <Text style={styles.infoTitle}>{'Email:  '}</Text>
              <Text style={[styles.infoText, {backgroundColor: '#fff', width: '75%'}]}>{merchantData.email}</Text>
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
    paddingHorizontal: '0%',
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
    marginTop: '10%',
    paddingHorizontal: '8%'
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
    fontSize: 24,
    textAlign: 'center'
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
    backgroundColor: '#F8F8F8',
    paddingHorizontal: '8%',
    paddingBottom: 10,
    justifyContent: 'center'
  },

  infoTitle: {
    fontFamily: 'Poppins',
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
    fontSize: 14,
    color: '#000',
  },

});

export default Profile;