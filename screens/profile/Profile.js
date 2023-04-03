import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { colors } from '../../colors'
import ModeBtn from '../../components/ModeBtn'
import { ModeContext } from '../../contexts/ModeContext'
import { MODE_SELLER } from '../../constants'

const Profile = () => {

  const { mode } = useContext(ModeContext);

  return (
    <View style={styles.container}>
      <View style={styles.modeBtnContainer}>
        <ModeBtn />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      {
        mode === MODE_SELLER ?
          <View>
            <View style={styles.bannerContainer}>
              <Image style={styles.bannerImage} source={{ uri: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }} />
              <View style={styles.bannerCover} />
            </View>
            <View style={styles.profileImageContainer}>
              <Image style={{ height: '100%', width: '100%', borderRadius: 60, backgroundColor: colors.primary[0] }} />
            </View>
          </View>
          :
          <View>
            <View style={styles.bannerContainer}>
              <Image style={styles.bannerImage} source={{ uri: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }} />
            </View>
            <View style={styles.profileImageContainer}>
              <Image style={{ height: '100%', width: '100%', borderRadius: 60, backgroundColor: 'silver' }} />
            </View>
          </View>
      }
      <View style={styles.profileNameContainer}>
        <Text style={styles.profileName}>{'PinePunch'}</Text>
      </View>
      <View style={styles.settingsBtnContainer}>
        <Text style={styles.settingsBtnText}>{'Settings Page'}</Text>
      </View>
      <View style={styles.profileInfoContainer}>
        <Text style={styles.infoTitle}>{'Company Name'}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{'PinePunch'}</Text>
        </View>
        <Text style={styles.infoTitle}>{'Location'}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{'Electronic City, Bangalore'}</Text>
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
    transform: [
      {
        rotateY: '180deg'
      }
    ],
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
    marginBottom: 100
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
  infoText:{
    fontFamily: 'PoppinsBold',
    fontSize: 20,
    color: colors.black[4]
  }

});

export default Profile;