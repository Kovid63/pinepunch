import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import FormInput from '../../components/FormInput'
import SubmitBtn from '../../components/SubmitBtn'

const ForgotPasswordEmail = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const isButtonActive = !(emailError) && !(email.length == 0);

  function getEmail(email) {
    setEmail(email);
  }

  function getEmailError(error) {
    setEmailError(error);
  }

  function loginAccount() {
    navigation.navigate('LoginScreen');
  }

  function nextHandler() {
    isButtonActive? navigation.navigate('ForgotPasswordWithNewPassword') : null;
  }


  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.welcomeText}>{'Forgot\nPassword'}</Text>
      </View>
      <View style={styles.form}>
        <FormInput placeholder={'Email'} getValue={getEmail} getError={getEmailError} />
      </View>
      <View style={styles.loginAccContainer}>
        <Text style={styles.accRequestText}>{"Have an account?"}{' '}<Text onPress={loginAccount} style={styles.loginAccText}>{'Login'}</Text></Text>
      </View>
      <View style={styles.submitBtnContainer}>
        <SubmitBtn onPress={nextHandler} active={isButtonActive} text={'Next'} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: '5%',
    justifyContent: 'space-evenly'
  },

  welcome: {
    marginTop: '15%'
  },

  welcomeText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 42,
    color: colors.black[0]
  },

  form: {
    justifyContent: 'space-between'
  },

  loginAccContainer: {
    alignItems: 'center',
    marginTop: '85%'
  },

  accRequestText: {
    fontFamily: 'Poppins',
    fontSize: 13
  },

  loginAccText: {
    fontFamily: 'PoppinsSemiBold',
    color: colors.primary[0]
  },

  submitBtnContainer: {
    alignItems: 'center'
  }

})

export default ForgotPasswordEmail;