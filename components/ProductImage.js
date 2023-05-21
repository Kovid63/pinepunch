import { View, Text } from 'react-native';
import React from 'react';
import { FlatList, Image } from 'react-native';

const ProductImage = ({ imageArray, footer }) => {
  return (
    <FlatList horizontal data={imageArray} ListFooterComponent={footer} renderItem={() =>
      <View style={{ backgroundColor: '#F8F8F8', height: 300, marginTop: '10%', borderRadius: 24 }}>
        <Image />
      </View>
    } />
  )
}

export default ProductImage;