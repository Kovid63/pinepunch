import { View, Text, BackHandler } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../colors';
import FormInput from '../../components/FormInput';
import SubmitBtn from '../../components/SubmitBtn';
import { TextInput } from 'react-native';
import { Pressable } from 'react-native';
import { Keyboard } from 'react-native';

const ForgotPasswordEmail = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const inputRef = useRef();

  const isButtonActive = isEmailSent ? otpValue.length === 4 : !(emailError) && !(email.length == 0);

  function getEmail(email) {
    setEmail(email);
  }

  function getEmailError(error) {
    setEmailError(error);
  }

  function loginPageHandler() {
    navigation.navigate('LoginScreen');
  }


  function nextHandler() {
    isButtonActive ? setIsEmailSent(true) : null;
  }

  function verifyHandler() {
    // for testing
    navigation.navigate('ForgotPasswordWithNewPassword');
    // for production
    {/* todo */ }
  }

  function inputPressHandler(){
    inputRef.current.isFocused()? inputRef.current.blur() : inputRef.current.focus();
  }

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.welcomeText}>{'Forgot\nPassword'}</Text>
      </View>
      {!isEmailSent && (<><View style={styles.form}>
        <FormInput placeholder={'Email'} getValue={getEmail} getError={getEmailError} />
      </View>
      </>)}
      {
        isEmailSent && (
          <>
            <View style={styles.otpInputContainer}>
              {
                [1,2,3,4].map((_, index) => (
                  <Text onPress={inputPressHandler} key={index} style={styles.otpInput}>{otpValue[index]}</Text>
                ))
              }
            </View>
            <View>
              <Text style={styles.message}>{'Please enter 4 digit code you received on your email.'}</Text>
            </View>
          </>
        )
      }
      <TextInput maxLength={4} keyboardType={'number-pad'} value={otpValue.toString()} onChangeText={(value) => setOtpValue(value)} ref={inputRef} style={{opacity: 0}}/>
      <View style={styles.loginAccContainer}>
        <Text style={styles.accRequestText}>{"Have an account?"}{' '}<Text onPress={loginPageHandler} style={styles.loginAccText}>{'Login'}</Text></Text>
      </View>
      <View style={styles.submitBtnContainer}>
        <SubmitBtn onPress={isEmailSent ? verifyHandler : nextHandler} active={isButtonActive} text={isEmailSent ? 'Verify' : 'Next'} />
      </View>
    </Pressable>
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
    marginTop: '75%'
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
  },

  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '15%',
    height: 30
  },

  otpInput: {
    borderBottomWidth: 4,
    width: '20%',
    textAlign: 'center',
    borderColor: '#D9D9D9',
    fontFamily: 'PoppinsSemiBold',
    fontSize: 16
  },

  message: {
    fontFamily: 'Poppins',
    width: '90%',
    fontSize: 16,
    marginLeft: '5%',
    color: '#B3B1B0'
  }

})

export default ForgotPasswordEmail;