import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import { ModeContext } from '../../contexts/ModeContext'

const Search = ({ navigation }) => {

    const { mode } = useContext(ModeContext);

    function backPressHandler() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Header onPress={backPressHandler} pageTitle={'Search'} />
            <View style={styles.searchBarContainer}>
                <SearchBar editable={true} />
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
})

export default Search