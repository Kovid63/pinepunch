import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import Header from '../../components/Header'
import { TouchableOpacity } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { ScrollView } from 'react-native'
import { colors } from '../../colors'
import { Image } from 'react-native'
import SubmitBtn from '../../components/SubmitBtn'

const ProductDetail = ({navigation, route}) => {


  function contactSellerHandler(){
    navigation.navigate('ContactSeller');
  }

  function companyClickHandler(){
    navigation.navigate('CompanyPage')
  }

  function backPressHandler(){
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={backPressHandler} style={styles.iconContainer}>
          <Svg style={styles.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <Path
              d="M20 25a1 1 0 0 1-.71-.29l-8-8a1 1 0 0 1 0-1.42l8-8a1 1 0 1 1 1.42 1.42L13.41 16l7.3 7.29a1 1 0 0 1 0 1.42A1 1 0 0 1 20 25Z"
              data-name="Layer 2"
              fill={'#000000'}
            />
            <Path
              style={{
                fill: "none",
              }}
              d="M0 0h32v32H0z"
            />
          </Svg>
        </TouchableOpacity>
        <View>
          <Text style={styles.titleText}>{'Product Detail'}</Text>
        </View>
        <TouchableOpacity style={styles.iconContainer}>
          <Svg style={styles.icon} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
            <Path
              d="M12.235 4.039c1.626-1.028 3.786-1.312 5.652-.714 4.059 1.309 5.319 5.734 4.192 9.255-1.74 5.53-9.166 9.655-9.481 9.828a.743.743 0 0 1-.72.002c-.312-.171-7.685-4.235-9.482-9.829l-.001-.001c-1.128-3.522.128-7.948 4.183-9.255a6.729 6.729 0 0 1 5.657.714Zm-5.197.714c-3.281 1.058-4.105 4.587-3.214 7.37 1.402 4.362 6.94 7.889 8.413 8.762 1.477-.882 7.056-4.448 8.413-8.758.89-2.786.064-6.315-3.222-7.374-1.592-.511-3.45-.2-4.731.792a.75.75 0 0 1-.91.006 5.234 5.234 0 0 0-4.75-.798Zm9.43 1.986a3.525 3.525 0 0 1 2.435 3.075.75.75 0 0 1-1.496.122 2.024 2.024 0 0 0-1.4-1.77.75.75 0 0 1 .46-1.427Z"
              fill="#000000"
              fillRule="evenodd"
            />
          </Svg>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: 80, marginTop: '5%' }}>
        <View style={{ backgroundColor: '#F8F8F8', height: 300, marginTop: '10%', borderRadius: 24 }}>
          <Image />
        </View>
        <View style={{ flexDirection: 'row', marginTop: '8%', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ width: '50%', fontFamily: 'PoppinsSemiBold', fontSize: 17 }}>{'Item Name'}</Text>
          <TouchableOpacity onPress={companyClickHandler} style={{ height: 50, maxWidth: '50%', backgroundColor: '#FFFFFF', elevation: 5, justifyContent: 'center', alignItems: 'center', paddingHorizontal: '3%', borderRadius: 16, marginRight: '2%' }}>
            <Text style={{ fontFamily: 'PoppinsSemiBold', fontSize: 17, color: colors.primary[0] }}>{'xyz company'}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '60%', marginTop: '1%' }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: '#B3B1B0' }}>{'Description about the product\nDescription about the product\nDescription about the product\nDescription about the product\nDescription about the product\nDescription about the product\nDescription about the product\n'}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '10%' }}>
          <Text style={{ fontFamily: 'PoppinsSemiBold', fontSize: 18 }}>{'10Kg'}</Text>
          <Text style={{ fontFamily: 'PoppinsSemiBold', fontSize: 18 }}>{'Rs 2000/kg'}</Text>
        </View>
        <View style={styles.submitBtnContainer}>
          <SubmitBtn onPress={contactSellerHandler} fill={true} active={true} text={'Contact Seller'} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: '5%',
    backgroundColor: colors.background
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '15%',
    justifyContent: 'space-between'
  },

  titleText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 17
  },

  iconContainer: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 15,
    elevation: 1
  },

  icon: {
    height: 30,
    width: 30
  },

  submitBtnContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: '10%'
  }

})

export default ProductDetail