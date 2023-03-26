import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ModeContext } from '../../contexts/ModeContext';
import ModeBtn from '../../components/ModeBtn';
import { colors } from '../../colors';
import SearchBar from '../../components/SearchBar';
import Svg, { Path } from "react-native-svg"
import Button from '../../components/Button';
import { itemsForSale, scrapForSale } from '../../dummydata/dummydata';
import { ScrollView } from 'react-native';

const Home = () => {

  const { mode } = useContext(ModeContext);

  const ListRender = ({ item }) => {
    return (
      <View style={{ width: 160, backgroundColor: '#F8F8F8', borderRadius: 24, paddingVertical: 20, marginHorizontal: 10 }}>
        <Image source={{ uri: item.image }} style={{ height: 110, width: '70%', borderRadius: 19, alignSelf: 'center' }} />
        <Text style={{ marginHorizontal: '10%', marginTop: 25, fontFamily: 'Poppins', fontSize: 12 }}>{item.itemName}</Text>
        <View style={{ flexDirection: 'row', marginHorizontal: '5%', justifyContent: 'space-between' }}>
          <Text style={{ fontFamily: 'PoppinsSemiBold', fontSize: 16, marginLeft: '5%' }}>{'Rs ' + (item.price / item.quantity) + '/Kg'}</Text>
          <Svg style={{ height: 25, marginTop: 3, width: 25 }} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
            <Path
              d="M16.665 2.01A5.323 5.323 0 0 1 20.591 3.4a5.381 5.381 0 0 1 1.399 3.936v9.33a5.373 5.373 0 0 1-1.389 3.936 5.346 5.346 0 0 1-3.936 1.389h-9.33A5.332 5.332 0 0 1 3.399 20.6a5.332 5.332 0 0 1-1.389-3.936v-9.33A5.332 5.332 0 0 1 3.4 3.399 5.332 5.332 0 0 1 7.335 2.01Zm-.26 4.566a1.58 1.58 0 0 0-2.237 0l-.67.679c-.1.1-.1.27 0 .37l.055.054.246.244.497.496.605.604c.126.126.21.211.216.22.11.12.18.28.18.46 0 .359-.29.659-.66.659-.17 0-.33-.07-.44-.18L12.53 8.524a.217.217 0 0 0-.3 0l-4.765 4.765a1.8 1.8 0 0 0-.53 1.238l-.06 2.368c0 .13.04.25.13.34.09.09.21.14.34.14h2.347c.48 0 .94-.19 1.29-.53l6.722-6.743c.61-.62.61-1.618 0-2.228Z"
              fill="#130F26"
              fillRule="nonzero"
            />
          </Svg>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.modeBtnContainer}>
          <ModeBtn />
        </View>
        <TouchableOpacity style={styles.bellIconContainer}>
          <Svg style={styles.bellIcon} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
            <Path
              d="M10.324 20.106c.518.577 1.183.894 1.873.894h.001c.693 0 1.361-.317 1.88-.895a.75.75 0 0 1 1.115 1.004c-.808.897-1.87 1.391-2.995 1.391h-.002c-1.12-.001-2.182-.495-2.987-1.392a.749.749 0 1 1 1.115-1.002ZM12.247 1c4.445 0 7.431 3.462 7.431 6.695 0 1.663.423 2.368.872 3.116.444.738.947 1.576.947 3.16-.349 4.047-4.574 4.377-9.25 4.377S3.345 18.018 3 14.035c-.003-1.648.5-2.486.944-3.224l.157-.264c.386-.663.715-1.385.715-2.852C4.816 4.462 7.802 1 12.247 1Zm0 1.5c-3.495 0-5.93 2.738-5.93 5.195 0 2.079-.578 3.04-1.088 3.888-.409.681-.732 1.219-.732 2.388.167 1.886 1.412 2.877 7.75 2.877 6.303 0 7.587-1.035 7.753-2.942-.003-1.104-.326-1.642-.735-2.323-.51-.848-1.087-1.809-1.087-3.888 0-2.457-2.436-5.195-5.93-5.195Z"
              fill="#000"
              fillRule="evenodd"
            />
          </Svg>
        </TouchableOpacity>
      </View>
      <View style={styles.searchBarContainer}>
        <SearchBar />
      </View>
      <View style={styles.addProductTextContainer}>
        <Text style={styles.addProductText}>{'Add a product to sell'}</Text>
      </View>
      <View style={styles.addBtnContainer}>
        <Button text={'Add'} />
      </View>
      <ScrollView style={{marginBottom: 90, marginTop: '5%'}}>
        <View style={styles.middle}>
          <View>
            <Text style={styles.addProductText}>{'Items for sale'}</Text>
          </View>
          <Text style={styles.viewAllText}>{'View All'}</Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList showsHorizontalScrollIndicator={false} horizontal data={itemsForSale} renderItem={ListRender} />
        </View>
        <View style={styles.middle}>
          <View>
            <Text style={styles.addProductText}>{'Scrap for sale'}</Text>
          </View>
        </View>
        <View style={styles.listContainer}>
          <FlatList showsHorizontalScrollIndicator={false} horizontal data={scrapForSale} renderItem={ListRender} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.offWhite[1],
  },

  header: {
    flexDirection: 'row',
    paddingHorizontal: '8%',
    justifyContent: 'space-between',
    marginTop: '15%',
    alignItems: 'center'
  },

  modeBtnContainer: {
    width: '73%',
    marginLeft: '10%'
  },

  bellIconContainer: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 15,
    elevation: 1
  },

  bellIcon: {
    height: 30,
    width: 30
  },

  searchBarContainer: {
    width: '85%',
    alignSelf: 'center',
    marginTop: '3%',
  },

  addProductTextContainer: {
    marginTop: '10%',
    marginLeft: '8%'
  },

  addProductText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 17
  },

  addBtnContainer: {
    width: '16%',
    marginTop: '5%',
    marginLeft: '8%'
  },

  middle: {
    flexDirection: 'row',
    paddingHorizontal: '8%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%'
  },

  viewAllText: {
    color: colors.primary[0]
  },

  listContainer: {
    paddingHorizontal: '3%',
    marginTop: '5%'
  }

});

export default Home;