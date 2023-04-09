import { View, Text, BackHandler } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../colors';
import FormInput from '../../components/FormInput';
import SubmitBtn from '../../components/SubmitBtn';
import { TextInput } from 'react-native';
import { Pressable } from 'react-native';
import { Keyboard } from 'react-native';
import { ScrollView } from 'react-native';
import { BASE_URL, SEND_FORGOT_PASSWORD_OTP, VERIFY_FORGOT_PASSWORD_OTP } from '@env';

const ForgotPasswordEmail = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [otpId, setOtpId] = useState('');

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


  async function nextHandler() {
    try {
      const response = await fetch(BASE_URL + SEND_FORGOT_PASSWORD_OTP, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email
        })
      });
      
      if (!response.ok) {
        return console.log(response.status);
      }

      const data = await response.json();
      setIsEmailSent(true);
      setOtpId(data.otp_id);

    } catch (error) {
      console.log(error);
    }
  }

  async function verifyHandler() {
    try {
      const response = await fetch(BASE_URL + VERIFY_FORGOT_PASSWORD_OTP, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp_id: otpId,
          otp: otpValue
        })
      });
      
      if (!response.ok) {
        return console.log(response.status);
      }

      const data = await response.json();
      navigation.navigate('ForgotPasswordWithNewPassword', {
        sessionId: data.session_id
      })

    } catch (error) {
      console.log(error);
    }
  }

  function inputPressHandler() {
    inputRef.current.isFocused() ? inputRef.current.blur() : inputRef.current.focus();
  }

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
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
                  [1, 2, 3, 4].map((_, index) => (
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
        <TextInput maxLength={4} keyboardType={'number-pad'} value={otpValue.toString()} onChangeText={(value) => setOtpValue(value)} ref={inputRef} style={{ opacity: 0 }} />
        <View style={styles.loginAccContainer}>
          <Text style={styles.accRequestText}>{"Have an account?"}{' '}<Text onPress={loginPageHandler} style={styles.loginAccText}>{'Login'}</Text></Text>
        </View>
        <View style={styles.submitBtnContainer}>
          <SubmitBtn onPress={isEmailSent ? verifyHandler : nextHandler} fill={isButtonActive} active={isButtonActive} text={isEmailSent ? 'Verify' : 'Next'} />
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    marginTop: '30%'
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
  },

  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '20%',
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
    color: '#B3B1B0',
    marginTop: '10%'
  }

})

export default ForgotPasswordEmail;