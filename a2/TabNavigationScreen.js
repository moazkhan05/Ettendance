import 'react-native-gesture-handler';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//import { MaterialCommunityIcons } from 'react-native-vector-icons';
import * as React from 'react';
import { Image,TouchableOpacity } from 'react-native';
import AttendanceMarkingActivity from './AttendanceMarkingActivity.js';
import LeaveActivity from './LeaveActivity.js';
import CheckActivity from './CheckAttendance.js';
import CheckAttendance from './CheckAttendance.js';
const employeeIcon=require('./designs/employee-icon.png');
const leaveIcon=require('./designs/leaveIcon.png');
const CheckIcon = require('./designs/check-attendance-icon.png');
const timeInActivityIcon=require('./designs/timein.png');
const Tab = createMaterialBottomTabNavigator();



function TabNavigationScreen() {
  return (
    <Tab.Navigator
      shifting="true"
      activeColor="#F89200"
      inactiveColor="#FFF"
      barStyle={{backgroundColor: '#00204A'}}
      tabBarColor="#00204A"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Time In') {
            return (
              <TouchableOpacity
                style={[
                  {
                    width: '99%',
                    borderRadius: 5,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  },
                ]}>
                <Image
                  style={{width: 50, height: 20}}
                  source={timeInActivityIcon}
                />
              </TouchableOpacity>
            );
          } else if (route.name === 'Leave') {
            return (
              <TouchableOpacity
                style={[
                  {
                    width: '99%',
                    borderRadius: 5,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  },
                ]}>
                <Image style={{width: 50, height: 20}} source={leaveIcon} />
              </TouchableOpacity>
            );
          } else if (route.name === 'CheckAttendance') {
            return (
              <TouchableOpacity
                style={[
                  {
                    width: '99%',
                    borderRadius: 5,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  },
                ]}>
                <Image style={{width: 50, height: 20}} source={CheckIcon} />
              </TouchableOpacity>
            );
          }
        },
      })}>
      <Tab.Screen name="Time In" component={AttendanceMarkingActivity} />
      <Tab.Screen name="Leave" component={LeaveActivity} />
      <Tab.Screen name="CheckAttendance" component={CheckAttendance} />
    </Tab.Navigator>
  );
}
export default TabNavigationScreen;
