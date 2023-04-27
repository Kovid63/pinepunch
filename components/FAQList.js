import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Path, Svg } from 'react-native-svg';

const FAQList = (index) => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    function dropDownHandler() {
        isDropDownOpen ? setIsDropDownOpen(false) : setIsDropDownOpen(true)
    }
    return (
        <View key={index} style={styles.titleContainer}>
            <View style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={styles.titleText}>{'Security'}</Text>
                <TouchableOpacity onPress={dropDownHandler} style={{ marginHorizontal: 10 }}>
                    <Svg style={{ height: 24, width: 24, transform: [isDropDownOpen ? { rotateZ: '90deg' } : { rotateZ: '-90deg' }] }} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <Path
                            d="M20 25a1 1 0 0 1-.71-.29l-8-8a1 1 0 0 1 0-1.42l8-8a1 1 0 1 1 1.42 1.42L13.41 16l7.3 7.29a1 1 0 0 1 0 1.42A1 1 0 0 1 20 25Z"
                            data-name="Layer 2"
                            fill={'#000000'}
                        />
                        <Path
                            style={{
                                fill: "none",
                            }}
                            d="M0 0h32v32H0z"
                        />
                    </Svg>
                </TouchableOpacity>
            </View>
            {isDropDownOpen && <Text style={styles.text}>{'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error dolorum architecto sint numquam, ullam id, laudantium eum earum quis voluptatem, fugiat officiis.'}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({


    titleContainer: {
        marginTop: '10%',
        marginHorizontal: '3%'
    },

    titleText: {
        fontFamily: 'PoppinsBold',
        fontSize: 16
    },

    text: {
        fontFamily: 'Poppins',
        marginTop: '5%',
        color: '#B3B1B0'
    },

    scroll: {
        flex: 1,
        marginBottom: 80
    },

})

export default FAQList