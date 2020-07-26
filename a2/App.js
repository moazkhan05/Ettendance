/*import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { CreateAppContainer } from 'react-navigation';
import { View, Text } from 'react-native';
import { CreateStackNavigator } from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';
import MainActivity from './components/MainActivity.js';
import AttendanceMarkingActivity from './components/AttendanceMarkingActivity.js';
const Stack = createStackNavigator();


function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
*/
// In App.js in a new project
import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainActivity from './MainActivity.js';
import AttendanceMarkingActivity from './AttendanceMarkingActivity.js';
import LeaveActivity from './LeaveActivity.js';
import TabNavigationScreen from './TabNavigationScreen.js';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={MainActivity} options={{ headerShown: false }}/>
        <Stack.Screen name="AttendanceMarking" component={AttendanceMarkingActivity}  />
        <Stack.Screen name="Leave Application" component={LeaveActivity}  />
        <Stack.Screen name="Tabs" component={TabNavigationScreen}  options={{ headerShown: false }}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;
