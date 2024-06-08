import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>

            <View style={styles.topbar}>
                <Image style={styles.icon_img} source={require("../assets/profile.png")} />
                <View>
                    <Text style={styles.tiny_text}>Hello!</Text>
                    <Text style={styles.bold_text}>John Doe</Text>
                </View>
            </View>
            <View style={styles.centered}>
                <View style={styles.box}>
                    <View className="progress">
                        <Text style={styles.box_text}>
                            NFT Gallery
                        </Text>
                    </View>

                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // justifyContent: 'center',
    },
    centered: {
        alignItems: "center",
    },
    topbar: {
        marginHorizontal: 25,
        marginTop: 55,
        marginBottom: 20,
        flexDirection: "row",
    },
    icon_img: {
        width: 40,
        height: 40,
        marginRight: 10
    },
    tiny_text: {
        fontSize: 10,
        fontWeight: '400',
        fontFamily: "Inter",
        opacity: 0.56
    },
    bold_text: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 25.15,
    },
    box: {
        width: '80%',
        height: 250,
        borderRadius: 20,
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: "row",
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowOffset: { height: 4 },
        justifyContent: "center"
    },
    bottomDropShadow: {
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowOffset: { height: 4 }
    },
    box_text: {
        color: "black",
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 24,
        marginBottom: 10
    },
    button: {
        borderRadius: 20,
        width: 150,
        height: 36,
        backgroundColor: "#CAD1F7",
        alignItems: "center",
        justifyContent: "center"
    },
});
