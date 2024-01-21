import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useSelector } from 'react-redux';


export default function Map() {

    const { userLocation } = useSelector(state => state.user)


    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={userLocation}>
                <Marker coordinate={userLocation} title="Marker" />
            </MapView>
            {/* <TouchableOpacity onPress={userLocation} style={styles.button}>
                <Text style={styles.buttonText}>Get Current Location</Text>
            </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    button: {
        position: 'absolute',
        padding: 20,
        backgroundColor: 'red',
        bottom: 20,
        left: 20,
        zIndex: 1,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
