import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { Path, Svg } from "react-native-svg";

export const SettingsSlot = ({ slot, onPress }, key) => (

    <TouchableOpacity onPress={onPress} key={key} style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ height: 45, width: 45, backgroundColor: '#F8F8F8', alignItems: 'center', justifyContent: 'center', borderRadius: 25 }}>
                <View style={{ height: 25, width: 25 }}>
                    {slot.icon}
                </View>
            </View>
            <View>
                <Text style={{ marginLeft: 15, fontFamily: 'Poppins', fontSize: 15 }}>{slot.name}</Text>
            </View>
        </View>
        <View>
            <Svg style={{
                height: 30,
                width: 30,
                transform: [
                    {
                        rotateZ: '180deg'
                    }
                ]
            }} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
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
        </View>
    </TouchableOpacity>
)