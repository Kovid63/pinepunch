import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { units } from '../data/units';

const DropDownMenu = ({value, setValue}) => {

    const [isDropdownOpen, setIsDropDownOpen] = useState(false);

    function dropDownHandler() {
        isDropdownOpen ? setIsDropDownOpen(false) : setIsDropDownOpen(true);
    }

    function selectValueHandler(value){
        setValue(value);
        setIsDropDownOpen(false);
    }

    return (
        <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', justifyContent: 'center'}}>
            <View style={{ paddingHorizontal: 5, marginHorizontal: '2%'}}>
                <Text style={{ fontFamily: 'Poppins', width: 40 }}>{value}</Text>
                {isDropdownOpen && (units.map((unit, index) => (
                    <TouchableOpacity key={index} onPress={() => selectValueHandler(unit)}>
                        <Text style={{ fontFamily: 'Poppins', color: '#B3B1B0', width: 40 }}>{unit}</Text>
                    </TouchableOpacity>
                )))}
            </View>
            <TouchableOpacity onPress={dropDownHandler} style={{ marginHorizontal: 10 }}>
                <Svg style={{ height: 24, width: 24, transform: [{ rotateZ: '-90deg' }] }} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
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
    )
}

export default DropDownMenu;