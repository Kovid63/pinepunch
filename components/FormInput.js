import { View, StyleSheet, Image, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../colors'

const FormInput = ({ placeholder, getValue, secure, getError }) => {

  const [focus, setFocus] = useState(false)
  const [error, setError] = useState(false)
  const [value, setValue] = useState('')

  function handleChange(value) {
    setValue(value)
    getValue(value)
    if (value.length === 0) {
      return setError(true);
    }
    setError(false);
  }

  function handleFocus() {
    setFocus(true)
  }


  function handleBlur() {
    setFocus(false);
    if (value.length === 0) {
      return setError(true);
    }
    setError(false);
  }


  useEffect(() => {
    return () => getError(!error)
  },[error])


  return (
    <View style={styles.container}>
      <View style={[styles.inputConstainer, focus ? { borderColor: colors.primary[0] } : { borderColor: colors.black[5] }, error ? { borderColor: colors.alerts.error } : {}]}>
        <TextInput secureTextEntry={secure} style={styles.input} spellCheck={false} placeholderTextColor={error ? colors.alerts.error : null} value={value} onBlur={handleBlur} onFocus={handleFocus} onChangeText={handleChange} selectionColor={error ? colors.alerts.error : colors.primary[0]} placeholder={placeholder} />
      </View>
      {
        error && (
          <View style={styles.errorContainer}>
            <Image style={styles.errorIcon} source={require('../assets/error.png')} />
            <Text style={styles.errorText}>{'Required Fields'}</Text>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    marginTop: '5%'
  },

  inputConstainer: {
    borderWidth: 1,
    height: 60,
    borderRadius: 15,
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: '8%'
  },

  input: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 14,
    color: colors.primary[0]
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%'
  },
  errorIcon: {
    height: 15,
    width: 15,
    marginLeft: '3%',
  },
  errorText: {
    color: colors.alerts.error,
    marginLeft: '3%',
    fontFamily: 'Poppins'
  }

})


export default FormInput;