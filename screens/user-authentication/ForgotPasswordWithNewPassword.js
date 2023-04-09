import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import FormInput from '../../components/FormInput'
import SubmitBtn from '../../components/SubmitBtn'
import { ScrollView } from 'react-native'
import { BASE_URL, UPDATE_PASSWORD } from '@env';

const ForgotPasswordWithNewPassword = ({ navigation, route }) => {

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

  async function resetPasswordHandler() {
    try {
      const response = await fetch(BASE_URL + UPDATE_PASSWORD, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-USER-SESSION-ID": route.params.sessionId
        },
        body: JSON.stringify({
          password: newPassword,
        })
      });
      
      if (!response.ok) {
        return console.log(response.status);
      }

      const data = await response.json();
      navigation.popToTop();
      navigation.navigate('PasswordUpdated');

    } catch (error) {
      console.log(error);
    }

    
  }


  return (
    <ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.container}>
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
        <SubmitBtn onPress={resetPasswordHandler} fill={isButtonActive} active={isButtonActive} text={'Reset Password'} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: '5%'
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
    justifyContent: 'space-between',
    marginTop: '15%'
  },

  loginAccContainer: {
    alignItems: 'center',
    marginTop: '80%'
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
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: 30
  }

})

export default ForgotPasswordWithNewPassword;