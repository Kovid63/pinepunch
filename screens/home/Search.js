import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import { ModeContext } from '../../contexts/ModeContext'
import { Path, Svg } from 'react-native-svg'
import { FlatList } from 'react-native'
import { homeCategory } from '../../data/homeCategory'
import { recentViewed } from '../../data/recentViewed'

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
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '10%' }}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 36" style={[styles.icon, { transform: [{ rotateY: '180deg' }] }]}>
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
                <View style={{ marginLeft: '2%' }}>
                    <FlatList horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginLeft: -12 }} data={homeCategory} renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => onSelectCategoryHandler(item)} activeOpacity={0.7} style={[{ height: 50, paddingHorizontal: 15, marginLeft: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 16 }, selectedCategory === item ? { backgroundColor: colors.primary[0] } : { backgroundColor: '#F8F8F8' }]}>
                                <Text style={[{ fontFamily: 'Poppins' }, selectedCategory === item ? { color: '#FFFFFF' } : { color: '#B3B1B0' }]}>{item}</Text>
                            </TouchableOpacity>
                        )
                    }} />
                </View>
            </View>
            <View style={{ marginTop: '10%' }}>
                <Text style={styles.headingText}>{'Recent Views'}</Text>
                <ScrollView keyboardShouldPersistTaps={'handled'}>
                    {
                        recentViewed.map((recent, index) => (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '5%' }}>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 15, color: '#B3B1B0' }}>{recent.item}</Text>
                                <TouchableOpacity activeOpacity={0.3}>
                                    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                                        <Path
                                            fill="#B3B1B0"
                                            fillRule="evenodd"
                                            d="M16.334 2C19.723 2 22 4.378 22 7.916v8.168C22 19.622 19.723 22 16.333 22H7.665C4.276 22 2 19.622 2 16.084V7.916C2 4.378 4.276 2 7.665 2h8.669Zm0 1.5H7.665C5.135 3.5 3.5 5.233 3.5 7.916v8.168c0 2.683 1.635 4.416 4.165 4.416h8.668c2.531 0 4.167-1.733 4.167-4.416V7.916c0-2.683-1.636-4.416-4.166-4.416ZM10.13 9.063l1.868 1.867 1.867-1.865a.749.749 0 1 1 1.06 1.06l-1.867 1.865 1.869 1.87a.749.749 0 1 1-1.06 1.06l-1.869-1.87-1.865 1.867a.744.744 0 0 1-.53.22.749.749 0 0 1-.53-1.28l1.865-1.867-1.868-1.867a.749.749 0 1 1 1.06-1.06Z"
                                        />
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </ScrollView>
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

    headingText: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 17
    },
})

export default Search