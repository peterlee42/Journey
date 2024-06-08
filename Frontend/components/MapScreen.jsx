import { StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { key, JWT } from '../api-key.json'

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}



export default function MapScreen({ navigation }) {
    const [locDiff, setLocDiff] = useState(10);

    const [claimable, setClaimable] = useState('');

    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });

    const [POIs, setPOIs] = useState([

    ]);

    const genPOIs = async () => {
        try {
            const response = await fetch(
                'https://places.googleapis.com/v1/places:searchNearby',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'X-Goog-FieldMask': "places.displayName,places.location",
                        'X-Goog-Api-Key': key,
                        "Cache-Control": "no-cache"
                    },
                    body: JSON.stringify({
                        'locationRestriction': {
                            "circle": {
                                "center": {
                                    "latitude": location.latitude,
                                    "longitude": location.longitude
                                },
                                "radius": 5000
                            }
                        }
                    }),
                }
            );
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    }

    const claim = async () => {
        try {
            navigation.navigate('Calendar', { CID: '' })

            const response = await fetch(
                'https://e615-129-97-124-31.ngrok-free.app/generate_nft',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "text": claimable,
                        "wallet": "0xc9947a55bDD4b1E0fE27fDA4EEc68C74505307b7"
                    }),
                }
            );
            setPOIs(prevPOIs => prevPOIs.filter(marker => marker.displayName.text !== claimable));
            setClaimable('');

            const json = await response.json();
            console.log(json);
            navigation.navigate('Calendar', { CID: json.toReturn })
            return json;

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }
                let location = await Location.watchPositionAsync({
                    accuracy: Location.Accuracy.High,
                }, (newlocation) => {
                    let locationDiff = getDistanceFromLatLonInKm(location.latitude, location.longitude, newlocation.latitude, newlocation.longitude)
                    setLocDiff(locationDiff);
                    setLocation(newlocation.coords);
                });
            })().catch((err) => { console.log(err) });
        }, 1000)
    }, []);

    useEffect(() => {
        genPOIs().then((json) => {
            setPOIs(json.places);
        });
    }, [location])

    useEffect(() => {
        let minVal = 1000000000000;
        let best = false;
        POIs.map((val, index) => {
            if (getDistanceFromLatLonInKm(location.latitude, location.longitude, val.location.latitude, val.location.longitude) <= 0.2) {
                if (getDistanceFromLatLonInKm(location.latitude, location.longitude, val.location.latitude, val.location.longitude) <= minVal) {
                    minVal = getDistanceFromLatLonInKm(location.latitude, location.longitude, val.location.latitude, val.location.longitude) <= minVal
                    best = val;
                }
            }
        });
        if (best) {
            setClaimable(best.displayName.text);
        }
        else {
            setClaimable('');
        }
    }, [POIs, location]);


    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                scrollEnabled={true}
                showsTraffic={false}
                followsUserLocation={true}
                showsUserLocation={true}
                showsIndoors={false}
                showsPointsOfInterest={true}
                mapType="mutedStandard"
                zoomEnabled={true}
                showsCompass={true}
                scrollDuringRotateOrZoomEnabled={false}
            >
                {POIs.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.location}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}
            </MapView>
            {(claimable != '') ?
                <View className="bg-white w-[300] h-[70] rounded-2xl fixed bottom-[10%] items-center justify-center">
                    <Text className="text-xl font-medium" onPress={claim}>Claim Checkpoint</Text>
                </View>
                : <View></View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
})