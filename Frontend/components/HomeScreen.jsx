import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Image style={styles.icon_img} source={require("../assets/profile.png")}/>
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
      <Text className="text-xl font-semibold pt-5 pl-10">In Progress</Text>
      <View className="items-center pt-3">
        <View className="w-[80%] flex-row justify-around">
          <View className="bg-[#CAD1F7] w-[140] h-[80] rounded-[30px] border-black border-2">

          </View>
          <View className="bg-[#CAD1F7] w-[140] h-[80] rounded-[30px] border-black border-2 shadow-black shadow-sm">

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
    marginTop: 50,
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
    shadowOffset: {height: 4}
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
