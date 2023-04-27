import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import Header from '../../components/Header'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import FAQList from '../../components/FAQList'

const FAQ = ({ navigation }) => {

    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    function backPressHandler() {
        navigation.goBack();
    }

    function dropDownHandler() {
        isDropDownOpen ? setIsDropDownOpen(false) : setIsDropDownOpen(true)
    }

    return (
        <View style={styles.container}>
            <Header onPress={backPressHandler} pageTitle={'FAQ'} />
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {[1, 2, 3, 4, 5].map((question, index) => (<FAQList index={index} />))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: '5%'
    },

    scroll: {
        flex: 1,
        marginBottom: 80
    },

})

export default FAQ;