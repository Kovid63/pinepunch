import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../colors'

const ProductDraft = () => {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>{'Drafts of item to sell'}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

    container:{
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: '5%',
    },

    heading: {
      marginTop: '20%',
      marginHorizontal: '3%'
    },

    headingText:{
      fontFamily: 'PoppinsSemiBold',
      fontSize: 17
    },
})

export default ProductDraft