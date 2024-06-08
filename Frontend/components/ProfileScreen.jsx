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
                <Text style={styles.box_text}>
                    NFT Collection
                </Text>
                <View style={styles.box}>
                    <View style={styles.NFTs}>
                        <Image source={require('../output/1.png')} style={styles.Image} />
                        <Image source={require('../output/1.png')} style={styles.Image} />
                        <Image source={require('../output/1.png')} style={styles.Image} />
                        <Image source={require('../output/1.png')} style={styles.Image} />
                        <Image source={require('../output/1.png')} style={styles.Image} />
                        <Image source={require('../output/1.png')} style={styles.Image} />
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
        height: '85%',
        borderRadius: 20,
        backgroundColor: '#A1AEF2',
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: "row",
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowOffset: { height: 4 },
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
        marginBottom: 10,
        marginTop: 10
    },
    NFTs: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    Image: {
        width: 100,
        height: 100,
        margin: 10,
    },

});
