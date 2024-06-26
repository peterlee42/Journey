import { StyleSheet, Text, View, Image , Linking} from 'react-native';

export default function Milestone({route}) {

    const {CID} = route.params;
  return (
    <View className="items-center">
        <View className="bg-[#543DE4] w-full h-[200] rounded-xl items-center justify-center">
            <Text style={styles.text} className="mt-8 color-white text-5xl text-center px-12        font-semibold">Location Reached!</Text>
        </View>
        <Image source={{uri: `https://9dda-129-97-124-31.ngrok-free.app/${CID}.png`}} className="mt-6 w-[300] h-[300] border-black border-2"/>

        <View className="bg-[#FFF] border-2 border-black w-[80%] h-[100] rounded-xl items-center justify-evenly mt-7 flex-row">
            <Text style={styles.text} className="color-[#543DE4B0] text-xl font-semibold w-[50%]">Congrats on your new NFT!</Text>
            <Image source={require("../assets/lock.png")} className="h-10 w-10" />
        </View>
        <Text className="pt-2 text-blue-600 underline" onPress={() => Linking.openURL('https://testnets.opensea.io/collection/journey-19?search[sortAscending]=false&search[sortBy]=LAST_TRANSFER_DATE')}>See it on OpenSea</Text>
    </View>

  );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Inter",
    }
});
