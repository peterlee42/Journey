import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/HomeScreen';
import { TabBarIcon } from './components/TabBarIcon';
import { Image } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import MapScreen from './components/MapScreen';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={
          {
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => <TabBarIcon name={focused ? "home" : "home-outline"} color={focused ? "#1156cf" : "000000"} />,
          }} />
        <Tab.Screen name="Calendar" component={TabBarIcon} options={
          {
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => <TabBarIcon name={focused ? "calendar" : "calendar-outline"} color={focused ? "#1156cf" : "000000"} />,
          }} />
        <Tab.Screen name="New" component={MapScreen} options={
          {
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: 'absolute',
                  bottom: 20, // space from bottombar
                  height: 58,
                  width: 58,
                  borderRadius: 58,
                  backgroundColor: '#543DE4',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('./assets/plus-solid.png')}
                  style={{
                    width: 40,
                    height: 40,
                    alignContent: 'center',
                  }}
                />
              </View>
            ),
          }} />
        <Tab.Screen name="Papers" component={TabBarIcon} options={
          {
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => <TabBarIcon name={focused ? "document" : "document-outline"} color={focused ? "#1156cf" : "000000"} />,
          }} />
        <Tab.Screen name="Profile" component={TabBarIcon} options={
          {
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => <TabBarIcon name={focused ? "person" : "person-outline"} color={focused ? "#1156cf" : "000000"} />,
          }} />
      </Tab.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
