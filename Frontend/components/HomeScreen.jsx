import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';



export default function HomeScreen() {

  [nftList, setnftList] = useState([]);

  useEffect(() => {
    const fetchCollection = async () => {
      const response = await fetch(
        'https://e615-129-97-124-31.ngrok-free.app/all_images',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      const json = await response.json();
      setnftList(json.contents[0]);
    }
    fetchCollection();

  }, [])

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
          <View className="w-[70%]">
            <Text style={styles.box_text}>
              Weekly Milestones Collected
            </Text>
            <View style={styles.button}>
              <Text style={styles.box_text_2}>View Progress</Text>
            </View>
          </View>
          <View className="w-[90] h-[80] justify-center items-center">
            <Text className="text-4xl text-white font-bold">23%</Text>
          </View>
        </View>
      </View>
      <Text className="text-xl font-semibold pt-5 pl-12">In Progress</Text>
      <View className="items-center pt-3">
        <View className="w-[90%] flex-row justify-around">
          <View style={styles.bottomDropShadow} className="bg-[#CAD1F7] w-[150] h-[80] rounded-[30px] border-black border-2 pt-2 pl-4">
            <Text className="font-light text-xs">Nature</Text>
            <Text className="text-lg font-medium">Visit 5 Parks</Text>
            <View className="bg-white h-1 mt-1 w-[90%]">
              {/* Put percent completion here */}
              <View className="bg-sky-400 h-1 w-[20%]">
              </View>
            </View>
          </View>
          <View style={styles.bottomDropShadow} className="bg-[#CAD1F7] w-[150] h-[80] rounded-[30px] border-black border-2 pt-2 pl-4">
            <Text className="font-light text-xs">Exploration</Text>
            <Text className="text-lg font-medium">Visit 4 Towns</Text>
            <View className="bg-white h-1 mt-1 w-[90%]">
              {/* Put percent completion here */}
              <View className="bg-sky-400 h-1 w-[75%]">
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="items-center justify-center pt-6">
        <View className="bg-[#A1AEF2] h-[100] w-[85%] rounded-[30px] flex-row">
          <View className="-[90%]">
            <Text className="pt-4 pl-7 text-xl font-medium">Calories Burned</Text>
            <Text className="pt-1 pl-8 text-xl font-bold color-[#543DE4] opacity-70">2977 kcal</Text>
          </View>
          <View className="items-center">
            <Image source={require("../assets/running.png")} className="mt-4 ml-10 h-16 w-16"></Image>
          </View>
        </View>
        <View className="bg-[#A1AEF2] h-[100] w-[85%] rounded-[30px] flex-row mt-6">
          <View className="-[90%]">
            <Text className="pt-4 pl-7 text-xl font-medium">NFTs Collected</Text>
            <Text className="pt-1 pl-8 text-xl font-bold color-[#543DE4] opacity-70">{nftList.length
            } NFTs</Text>
          </View>
          <View className="items-center">
            <Image source={require("../assets/tree.png")} className="mt-4 ml-12 h-16 w-16"></Image>
          </View>
        </View>
        <View className="bg-[#A1AEF2] h-[100] w-[85%] rounded-[30px] flex-row mt-6">
          <View className="-[90%]">
            <Text className="pt-4 pl-7 text-xl font-medium">Gas Money Saved</Text>
            <Text className="pt-1 pl-8 text-xl font-bold color-[#543DE4] opacity-70">${(nftList.length * 0.144).toFixed(2)}</Text>
          </View>
          <View className="items-center">
            <Image source={require("../assets/gas.png")} className="mt-4 ml-5 h-20 w-20"></Image>
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
    height: 120,
    borderRadius: 20,
    backgroundColor: "#543DE4",
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowOffset: { height: 4 }
  },
  bottomDropShadow: {
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowOffset: { height: 4 }
  },
  box_text: {
    color: "#fff",
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    borderRadius: 20,
    width: 150,
    height: 36,
    backgroundColor: "#CAD1F7",
    alignItems: "center",
    justifyContent: "center"
  },
  box_text_2: {
    fontWeight: "600",
    fontFamily: "Inter",
    fontSize: 16,
  },
});
