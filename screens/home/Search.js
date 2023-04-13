import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import { ModeContext } from '../../contexts/ModeContext'
import { Path, Svg } from 'react-native-svg'
import { FlatList } from 'react-native'
import { homeCategory } from '../../data/homeCategory'

const Search = ({ navigation }) => {

    const { mode } = useContext(ModeContext);
    const [selectedCategory, setSelectedCategory] = useState(homeCategory[0]);

    function backPressHandler() {
        navigation.goBack();
    }

    function onSelectCategoryHandler(item) {
        setSelectedCategory(item);
      }

    return (
        <View style={styles.container}>
            <Header onPress={backPressHandler} pageTitle={'Search'} />
            <View style={styles.searchBarContainer}>
                <SearchBar editable={true} />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: '10%'}}>
            <TouchableOpacity onPress={{}} style={styles.iconContainer}>
                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 36" style={[styles.icon, { transform: [{rotateY: '180deg'}] }]}>
                    <Path
                        d="M23.43 16.83A1 1 0 0 0 22 18.24L25.72 22H7.83a1 1 0 0 0 0 2h17.89L22 27.7a1 1 0 1 0 1.42 1.41L29.53 23Z"
                        className="clr-i-outline clr-i-outline-path-1"
                        fill={'#000000'}
                    />
                    <Path
                        d="M13.24 18.45a1 1 0 0 0 .71-1.71L10.24 13h17.88a1 1 0 0 0 0-2H10.24l3.71-3.73a1 1 0 0 0-1.42-1.41L6.42 12l6.11 6.14a1 1 0 0 0 .71.31Z"
                        className="clr-i-outline clr-i-outline-path-2"
                        fill={'#000000'}
                    />
                    <Path fill="none" d="M0 0h36v36H0z" />
                </Svg>
            </TouchableOpacity>
            <View style={{ marginRight: '15%', marginLeft: '2%' }}>
              <FlatList horizontal showsHorizontalScrollIndicator={false} data={homeCategory} renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={() => onSelectCategoryHandler(item)} activeOpacity={0.7} style={[{ height: 50, paddingHorizontal: 15, marginLeft: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 16 }, selectedCategory === item ? { backgroundColor: colors.primary[0] } : { backgroundColor: '#F8F8F8' }]}>
                    <Text style={[{ fontFamily: 'Poppins' }, selectedCategory === item ? { color: '#FFFFFF' } : { color: '#B3B1B0' }]}>{item}</Text>
                  </TouchableOpacity>
                )
              }} />
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: '8%',
        paddingBottom: 90
    },

    searchBarContainer: {
        width: '100%',
        alignSelf: 'center',
        marginTop: '8%',
    },

    iconContainer: {
        width: '15%',
        backgroundColor: '#F8F8F8',
        padding: 8,
        borderRadius: 15
    },

    icon: {
        height: 30,
        width: 30
    },
})

export default Search