/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
var array=[];
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Switch,
  Button,
  Platform,FlatList
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
//import Icon from 'react-native-vector-icons'
const sendIcon = require('./designs/sendicon.png');
const calenderIcon = require('./designs/calender-icon.png');
const refreshIcon=require('./designs/refresh1.png');
//const logo=require('./designs/logo.png');
import moment from 'moment';
import firebase from 'react-native-firebase'
export default class CheckAttendance extends React.Component {
                              constructor(props) {
                                super(props);
                                this.state = {
                                  //defauilt value of the date time
                                  dateStart: new Date(),
                                  dateEnd: new Date(),
                                  minDateStart: new Date(),
                                  maxDateStart: new Date(
                                    new Date().getFullYear(),
                                    new Date().getMonth() + 3,
                                    new Date().getDate(),
                                  ),
                                  minDateEnd: new Date(),
                                  maxDateEnd: new Date(
                                    new Date().getFullYear(),
                                    new Date().getMonth() + 3,
                                    new Date().getDate(),
                                  ),
                                  show1: false,
                                  show2: false,
                                  mode: 'date',
                                  userName: 'Muhammad Maaz',
                                  ActivityName: 'Leave Request',
                                  chosenDateStart: 'Start',
                                  chosenDateEnd: 'End',
                                  switchValue: false,
                                  showEndDate: true,
                                  array:[]
                                };
                              }
                            componentDidMount(){
                              var uid =firebase.auth().currentUser.uid
                              firebase.database().ref(`userAttendece/${uid}/`).on("value",(snapshot)=>{
                               snapshot.forEach(data => {

                               array.push(data.val())

                               });
                                this.setState({array:array})
                              })
                            
                            }
                             renderHeader = () => {
                                //View to set in Header
                                return (
                                  <View
                                    style={[
                                      styles.containerTextImage,
                                      {
                                        height: 50,
                                        alignItems:'center',
                                        alignSelf:
                                          'center',
                                        justifyContent:
                                          'space-between',
                                        width:
                                          '98%',
                                        marginTop:
                                          '1%',
                                        borderRadius: 20,
                                        backgroundColor:
                                          '#00204A',
                                      },
                                    ]}>
                                    <Text
                                      style={[
                                        styles.textWrapping,
                                        {
                                          flex: 4,
                                          marginLeft: 5,
                                          marginTop: 5,
                                          color:
                                            '#F89200',
                                          fontWeight:
                                            'bold',
                                        },
                                      ]}>
                                      Date
                                    </Text>

                                    <View
                                      style={[
                                        {
                                          flex: 0.05,
                                        },
                                      ]}
                                    />

                                    <Text
                                      style={[
                                        styles.textWrapping,
                                        {
                                          flex: 4,
                                          marginLeft: 5,
                                          marginTop: 5,
                                          color:
                                            '#F89200',
                                          fontWeight:
                                            'bold',
                                        },
                                      ]}>
                                      Time In
                                    </Text>

                                    <View
                                      style={[
                                        styles.container,
                                        {
                                          flex: 0.25,
                                        },
                                      ]}
                                    />

                                    <Text
                                      style={[
                                        styles.textWrapping,
                                        {
                                          flex: 4,
                                          marginLeft: 5,
                                          marginTop: 5,
                                          color:
                                            '#F89200',
                                          fontWeight:
                                            'bold',
                                        },
                                      ]}>
                                      Time Out
                                    </Text>
                                  </View>
                                );
                              };
                              setStartDate = (event, date) => {
                                if (event.type != 'dismissed') {
                                  this.setState({
                                    show1: Platform.OS === 'ios' ? true : false,
                                    chosenDateStart: moment(date).format('MMM, DD YYYY'),
                                    dateStart: new Date(date),
                                    minDateEnd: new Date(date),
                                  });
                                }
                              };
                            
                              setEndDate = (event, date) => {
                                if (event.type != 'dismissed') {
                                  this.setState({
                                    show2: Platform.OS === 'ios' ? true : false,
                                    chosenDateEnd: moment(date).format('MMM, DD YYYY'),
                                    dateEnd: new Date(date),
                                    maxDateStart: new Date(date),
                                  });
                                }
                              };
                            
                              show1 = mode => {
                                this.setState({
                                  show1: true,
                                  mode,
                                });
                              };
                              show2 = mode => {
                                this.setState({
                                  show2: true,
                                  mode,
                                });
                              };
                            
                              datepickerStart = () => {
                                this.show1('date');
                              };
                              datepickerEnd = () => {
                                this.show2('date');
                              };
                            
                              toggleSwitch = value => {
                                //onValueChange of the switch this function will be called
                                this.setState({
                                  switchValue: value,
                                  showEndDate: this.state.switchValue == true ? true : false,
                                });
                            
                                //state changes according to switch
                              };
                            
                              render() {
                                const {
                                  show1,
                                  show2,
                                  dateStart,
                                  dateEnd,
                                  mode,
                                  minDateEnd,
                                  minDateStart,
                                  maxDateStart,
                                  maxDateEnd,
                                  showEndDate,
                                } = this.state;
                                return (
                                  <View
                                    style={[
                                      styles.container,
                                      {
                                        backgroundColor:
                                          '#00204A',
                                      },
                                    ]}>
                                    <View>
                                      <View
                                        style={[
                                          styles.containerTextImage,
                                          {
                                            flex: 0.5,
                                            justifyContent:
                                              'center',
                                          },
                                        ]}>
                                        <View
                                          style={[
                                            {
                                              alignItems:
                                                'center',
                                            },
                                          ]}>
                                          <Text
                                            style={[
                                              styles.textWrapping,
                                              {
                                                fontSize: 30,
                                                marginTop: 10,
                                                fontWeight:
                                                  'bold',
                                                fontStyle:
                                                  'italic',
                                                color:
                                                  '#F89200',
                                              },
                                            ]}>
                                            Check
                                            Attendance
                                          </Text>
                                        </View>
                                      </View>
                                      <View>
                                        <View
                                          style={{
                                            height: 70,
                                          }}>
                                          <View
                                            style={[
                                              styles.containerTextImage,
                                              {
                                                alignSelf:
                                                  'center',
                                                justifyContent:
                                                  'space-between',
                                                width:
                                                  '95%',
                                                marginTop:
                                                  '20%',
                                              },
                                            ]}>
                                            <TouchableOpacity
                                              style={[
                                                styles.inputText,
                                                styles.containerTextImage,
                                                {
                                                  height: 50,
                                                  borderRadius: 25,
                                                  backgroundColor:
                                                    '#448Ef6',
                                                  alignItems:
                                                    'center',
                                                  justifyContent:
                                                    'center',
                                                  width:
                                                    '95%',
                                                },
                                              ]}
                                              activeOpcaity={
                                                0.05
                                              }
                                              onPress={
                                                this
                                                  .datepickerStart
                                              }>
                                              <Image
                                                style={{
                                                  width: 50,
                                                  height: 50,
                                                  flex: 1,
                                                }}
                                                source={
                                                  calenderIcon
                                                }
                                              />
                                              <Text
                                                style={[
                                                  styles.textWrapping,
                                                  {
                                                    flex: 4,
                                                    marginLeft: 5,
                                                    marginTop: 5,
                                                    color:
                                                      '#F89200',
                                                  },
                                                ]}>
                                                {
                                                  this
                                                    .state
                                                    .chosenDateStart
                                                }
                                              </Text>
                                            </TouchableOpacity>
                                            {show1 && (
                                              <DateTimePicker
                                                value={
                                                  dateStart
                                                }
                                                mode={
                                                  mode
                                                }
                                                minimumDate={
                                                  minDateStart
                                                }
                                                maximumDate={
                                                  maxDateStart
                                                }
                                                display="default"
                                                onChange={
                                                  this
                                                    .setStartDate
                                                }
                                              />
                                            )}

                                            <View
                                              style={[
                                                {
                                                  flex: 0.05,
                                                },
                                              ]}
                                            />
                                            {showEndDate && (
                                              <TouchableOpacity
                                                style={[
                                                  styles.inputText,
                                                  styles.containerTextImage,
                                                  {
                                                    height: 50,
                                                    borderRadius: 25,
                                                    backgroundColor:
                                                      '#448Ef6',
                                                    alignItems:
                                                      'center',
                                                    justifyContent:
                                                      'center',
                                                    width:
                                                      '95%',
                                                  },
                                                ]}
                                                activeOpcaity={
                                                  0.05
                                                }
                                                onPress={
                                                  this
                                                    .datepickerEnd
                                                }>
                                                <Image
                                                  style={{
                                                    width: 50,
                                                    height: 50,
                                                    flex: 1,
                                                  }}
                                                  source={
                                                    calenderIcon
                                                  }
                                                />
                                                <Text
                                                  style={[
                                                    styles.textWrapping,
                                                    {
                                                      flex: 4,
                                                      marginLeft: 5,
                                                      marginTop: 5,
                                                      color:
                                                        '#F89200',
                                                    },
                                                  ]}>
                                                  {
                                                    this
                                                      .state
                                                      .chosenDateEnd
                                                  }
                                                </Text>
                                              </TouchableOpacity>
                                            )}
                                            {show2 && (
                                              <DateTimePicker
                                                value={
                                                  dateEnd
                                                }
                                                mode={
                                                  mode
                                                }
                                                minimumDate={
                                                  minDateEnd
                                                }
                                                maximumDate={
                                                  maxDateEnd
                                                }
                                                display="default"
                                                onChange={
                                                  this
                                                    .setEndDate
                                                }
                                              />
                                            )}
                                            <View
                                              style={[
                                                {
                                                  flex: 0.05,
                                                },
                                              ]}
                                            />
                                            <TouchableOpacity
                                              style={[
                                                
                                                {
                                                  height: 40,
                                                  
                                                  
                                                  alignItems:
                                                    'center',
                                                  justifyContent:
                                                    'center',
                                                  
                                                },
                                              ]}
                                              activeOpcaity={
                                                0.05
                                              }>
                                              <Image
                                                style={{
                                                  width: 50,
                                                  height: 50,
                                                }}
                                                source={
                                                  refreshIcon
                                                }
                                              />
                                            </TouchableOpacity>
                                          </View>

                                          <View
                                            style={[
                                              styles.container,
                                              {
                                                flex: 0.25,
                                              },
                                            ]}
                                          />
                                        </View>
                                      </View>
                                    </View>
                                    <View
                                      style={{
                                        marginTop:
                                          '20%',
                                        flex: 1,
                                        backgroundColor:
                                          '#448Ef6',
                                        borderTopRightRadius: 25,
                                        borderTopLeftRadius: 25,
                                      }}>
                                      <FlatList
                                        data={
                                          array
                                        }
                                        ListHeaderComponent={
                                          this
                                            .renderHeader
                                        }
                                        renderItem={({
                                          item,
                                          separators,
                                          index,
                                        }) => {
                                          console.log(
                                            'a',
                                            item.Date,
                                          );
                                          return (
                                            <View>
                                              <View
                                                style={[
                                                  styles.containerTextImage,
                                                  {
                                                    alignSelf:
                                                      'center',
                                                    alignItems:
                                                      'center',
                                                    justifyContent:
                                                      'space-between',
                                                    width:
                                                      '93%',
                                                    marginTop:
                                                      '2%',
                                                    borderBottomColor:
                                                      '#00204A',
                                                    borderBottomWidth: 2,
                                                  },
                                                ]}>
                                                <Text
                                                  style={[
                                                    styles.textWrapping,
                                                    {
                                                      flex: 4,
                                                      marginLeft: 5,
                                                      marginTop: 5,
                                                      color:
                                                        '#00204A',
                                                    },
                                                  ]}>
                                                  {
                                                    item.Date
                                                  }
                                                </Text>

                                                <View
                                                  style={[
                                                    {
                                                      flex: 0.05,
                                                    },
                                                  ]}
                                                />

                                                <Text
                                                  style={[
                                                    styles.textWrapping,
                                                    {
                                                      flex: 4,
                                                      marginLeft: 5,
                                                      marginTop: 5,
                                                      color:
                                                        '#00204A',
                                                    },
                                                  ]}>
                                                  {
                                                    item.timeIn
                                                  }
                                                </Text>

                                                <View
                                                  style={[
                                                    styles.container,
                                                    {
                                                      flex: 0.25,
                                                    },
                                                  ]}
                                                />

                                                <Text
                                                  style={[
                                                    styles.textWrapping,
                                                    {
                                                      flex: 4,
                                                      marginLeft: 5,
                                                      marginTop: 5,
                                                      color:
                                                        '#00204A',
                                                    },
                                                  ]}>
                                                  {
                                                    item.timeOut
                                                  }
                                                </Text>
                                              </View>
                                            </View>
                                          );
                                        }}
                                      />
                                    </View>
                                  </View>
                                );
                              }
                            }
                            
      const styles = StyleSheet.create({
        container: {
          // display: 'flex',
          flex: 1,

          // flexDirection: 'column',
        },
        KeyboardWrapper: {
          display: "flex",
          flex: 1,

        },
        backBtn: {
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        },
        background: {
          width: '100%',
          height: '100%',
          flex: 1,
        },
        containerVertical: {
          flex: 1,
          justifyContent: 'center',
        },
        containerTextImage: {
          flex: 1,
          flexDirection: 'row',

        },
        textWrapping: {
          //flexDirection:'row',
          fontSize: 20,
          textAlign: 'center',
          color: '#fff',
          marginRight: 5,
          fontFamily: 'San',
        },
        userNameBox: {
          marginTop: 8,
          width: '50%',
          backgroundColor: '#F89200',
          height: '50%',
        },
        inputText: {
          width: '90%',
          borderRadius: 40,
          backgroundColor: '#FFF',
          borderBottomColor: '#F89200',
          padding: 10,
          marginBottom: 15,
        },
        logocontainer: {
          marginTop: 150,
          alignItems: 'center',
          marginBottom: 250,
        },
        bottom: {
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: 36,
        },

      });
      