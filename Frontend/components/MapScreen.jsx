import React from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';
Mapbox.setAccessToken('pk.eyJ1IjoicGV0ZXJsZWU0MiIsImEiOiJjbHg1a3dzcDQwNTh3MmtvbDh1MDNrdDN4In0.GYTBTetsiGupTYWqddUERQ');


const MapScreen = () => {
    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <Mapbox.MapView style={styles.map} />
            </View>
        </View>
    );
}

export default MapScreen;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        height: 300,
        width: 300,
    },
    map: {
        flex: 1
    }
});
