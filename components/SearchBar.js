import { TextInput } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { StyleSheet } from 'react-native'
import { Pressable } from 'react-native'

const SearchBar = ({editable, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Svg
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          strokeLinejoin: "round",
          strokeMiterlimit: 2,
          height: 30,
          width: 30
        }}
        fill={'#B3B1B0'}
        viewBox="0 0 25 24"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path d="M16.206 17.266a8.466 8.466 0 0 1-5.456 1.984c-4.691 0-8.5-3.809-8.5-8.5s3.809-8.5 8.5-8.5 8.5 3.809 8.5 8.5a8.466 8.466 0 0 1-1.984 5.456l3.264 3.264a.749.749 0 1 1-1.06 1.06l-3.264-3.264ZM10.75 3.75c3.863 0 7 3.137 7 7s-3.137 7-7 7-7-3.137-7-7 3.137-7 7-7Z" />
      </Svg>
      <TextInput editable={editable} selectionColor={'#B3B1B0'} style={styles.input} placeholder={'Search your Product'}/>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#E5E4E3',
    height: 70,
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: '8%',
    flexDirection: 'row',
  },

  input: {
    fontFamily: 'Poppins',
    width: '80%',
    marginLeft: '3%',
    fontSize: 14
  }
})

export default SearchBar