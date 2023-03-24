import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import FormInput from '../../components/FormInput'
import SubmitBtn from '../../components/SubmitBtn'

const ForgotPasswordWithNewPassword = ({ navigation }) => {

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const isButtonActive = !(newPasswordError || confirmPasswordError) && !(newPassword.length == 0 || confirmPassword.length == 0) && (newPassword.match(confirmPassword));

  function getNewPassword(password) {
    setNewPassword(password);
  }

  function getConfirmPassword(password) {
    setConfirmPassword(password);
  }

  function getNewPasswordError(error) {
    setNewPasswordError(error);
  }

  function getConfirmPasswordError(error) {
    setConfirmPasswordError(error);
  }

  function loginPageHandler() {
    navigation.navigate('LoginScreen');
  }

  function resetPasswordHandler() {
    navigation.popToTop();
    navigation.navigate('PasswordUpdated');
  }


  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.welcomeText}>{'Forgot\nPassword'}</Text>
      </View>
      <View style={styles.form}>
        <FormInput secure={true} placeholder={'New Password'} getValue={getNewPassword} getError={getNewPasswordError} />
        <FormInput secure={true} placeholder={'Confirm Password'} getValue={getConfirmPassword} getError={getConfirmPasswordError} />
      </View>
      <View style={styles.loginAccContainer}>
        <Text style={styles.accRequestText}>{"Have an account?"}{' '}<Text onPress={loginPageHandler} style={styles.loginAccText}>{'Login'}</Text></Text>
      </View>
      <View style={styles.submitBtnContainer}>
        <SubmitBtn onPress={resetPasswordHandler} active={isButtonActive} text={'Reset Password'} />
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

export default ForgotPasswordWithNewPassword;