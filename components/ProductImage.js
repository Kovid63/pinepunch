import React from 'react';
import { Dimensions } from 'react-native';
import { Image, View } from 'react-native';

const ProductImage = ({ item }) => {
  const { width, height } = Dimensions.get('window');

  return (
    <View style={{ alignItems: 'center', marginTop: '5%', width: width*(90/100) }}>
      <View style={{ backgroundColor: '#F8F8F8', borderRadius: 24, height: 300, width: '90%'  }}>
        <Image source={{uri: item}} style={{height: '100%', width: '100%', borderRadius: 24}}/>
      </View>
    </View>
  )
}

export default ProductImage;