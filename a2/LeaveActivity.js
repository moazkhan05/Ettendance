/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
const sendIcon = require('./designs/sendicon.png');
const calenderIcon = require('./designs/calender-icon.png');
import firebase from 'react-native-firebase'
//const logo=require('./designs/logo.png');
import moment from 'moment';
export default class LeaveActivity extends React.Component {
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
                                  purpose:'',
                                };
                              }
                            
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
                            onSendPress(){
                               var dbref = firebase.database().ref(`reason/`);
                                var key = dbref.push().key;
                                 
                              var uid =firebase.auth().currentUser.uid
                              firebase.database().ref(`reason/${uid}/${key}`).set({
                                reason:this.state.purpose,
                                StartDate:this.state.chosenDateStart,
                                EndDate:this.state.chosenDateEnd
                              },()=>{
                                
                                this.setState({purpose:"Reason",chosenDateStart:"Start",chosenDateEnd:"End"})
                              })
                              
                            }
                              toggleSwitch = value => {
                                //onValueChange of the switch this function will be called
                                this.setState({
                                  switchValue: value,
                                  showEndDate: this.state.switchValue == true ? true : false,
                                });
                            
                                //state changes according to switch
                              };
                            componentDidMount(){
                              console.log(this.state.chosenDateStart)
                            }
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
                                  switchValue,
                                } = this.state;
                                console.log(
                                  this.state
                                    .chosenDateStart,
                                );
                                return (
                                  <View style={[styles.container, {backgroundColor: '#00204A'}]}>
                                    <KeyboardAvoidingView
                                      style={styles.KeyboardWrapper}
                                      behavior={Platform.Os == 'ios' ? 'padding' : 'height'}>
                                      <View
                                        style={[
                                          styles.containerTextImage,
                                          {flex: 0.5, justifyContent: 'center', marginBottom: 20},
                                        ]}>
                                        <View style={[{alignItems: 'center'}]}>
                                          <Text
                                            style={[
                                              styles.textWrapping,
                                              {
                                                fontSize: 30,
                                                marginTop: 10,
                                                fontWeight: 'bold',
                                                fontStyle: 'italic',
                                                color: '#F89200',
                                              },
                                            ]}>
                                            Leave Application
                                          </Text>
                                        </View>
                                      </View>
                            
                                      <View
                                        style={[
                                          styles.container,
                                          {flex: 4.5, justifyContent: 'space-around'},
                                        ]}>
                                        <View style={[styles.container, {flex: 0.25}]}>
                                          <View
                                            style={[
                                              styles.containerTextImage,
                                              {marginLeft: 10, marginBottom: 10, flex: 0.5},
                                            ]}>
                                            <Switch
                                              trackColor={{false: 'grey', true: 'grey'}}
                                              thumbColor={
                                                this.state.switchValue == true ? '#F89200' : '#448Ef6'
                                              }
                                              ios_backgroundColor="#FFF"
                                              onValueChange={this.toggleSwitch}
                                              value={this.state.switchValue}
                                            />
                                            <Text
                                              style={[styles.textWrapping, {fontSize: 20, marginLeft: 0}]}>
                                              Half Day
                                            </Text>
                                          </View>
                                          <View
                                            style={[
                                              styles.containerTextImage,
                                              {
                                                alignSelf: 'center',
                                                justifyContent: 'space-between',
                                                width: '95%',
                                              },
                                            ]}>
                                            <TouchableOpacity
                                              style={[
                                                styles.inputText,
                                                styles.containerTextImage,
                                                {
                                                  borderRadius: 25,
                                                  backgroundColor: '#448Ef6',
                                                  alignItems: 'center',
                                                  justifyContent: 'center',
                                                  width: '95%',
                                                },
                                              ]}
                                              activeOpcaity={0.05}
                                              onPress={this.datepickerStart}>
                                              <Image
                                                style={{width: 50, height: 50, flex: 1}}
                                                source={calenderIcon}
                                              />
                                              <Text
                                                style={[
                                                  styles.textWrapping,
                                                  {flex: 4, marginLeft: 5, marginTop: 5, color: '#F89200'},
                                                ]}>
                                                {this.state.chosenDateStart
                                                
                                                }
                                              </Text>
                                            </TouchableOpacity>
                                            {show1 && (
                                              <DateTimePicker
                                                value={dateStart}
                                                mode={mode}
                                                minimumDate={minDateStart}
                                                maximumDate={maxDateStart}
                                                display="default"
                                                onChange={this.setStartDate}
                                              />
                                            )}
                            
                                            <View style={[{flex: 0.05}]} />
                                            {showEndDate && (
                                              <TouchableOpacity
                                                style={[
                                                  styles.inputText,
                                                  styles.containerTextImage,
                                                  {
                                                    borderRadius: 25,
                                                    backgroundColor: '#448Ef6',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '95%',
                                                  },
                                                ]}
                                                activeOpcaity={0.05}
                                                onPress={this.datepickerEnd}>
                                                <Image
                                                  style={{width: 50, height: 50, flex: 1}}
                                                  source={calenderIcon}
                                                />
                                                <Text
                                                  style={[
                                                    styles.textWrapping,
                                                    {
                                                      flex: 4,
                                                      marginLeft: 5,
                                                      marginTop: 5,
                                                      color: '#F89200',
                                                    },
                                                  ]}>
                                                  {this.state.chosenDateEnd}
                                                </Text>
                                              </TouchableOpacity>
                                            )}
                                            {show2 && (
                                              <DateTimePicker
                                                value={dateEnd}
                                                mode={mode}
                                                minimumDate={minDateEnd}
                                                maximumDate={maxDateEnd}
                                                display="default"
                                                onChange={this.setEndDate}
                                              />
                                            )}
                                          </View>
                            
                                          <View style={[styles.container, {flex: 0.25}]} />
                                        </View>
                                        <ScrollView style={[styles.scrollViewWrapper, {flex: 4.55}]}>
                                          <Text
                                            style={[
                                              styles.textWrapping,
                                              {
                                                alignSelf: 'flex-start',
                                                marginLeft: 5,
                                                marginTop: 5,
                                                color: '#F89200',
                                                fontWeight: 'bold',
                                              },
                                            ]}>
                                            Purpose
                                          </Text>
                                          <View style={[styles.container, {flex: 3}]}>
                                            <TextInput
                                              style={[
                                                {
                                                  marginTop: 10,
                                                  marginLeft: 15,
                                                  width: '97%',
                                                  fontSize: 20,
                                                  color: '#FFF',
                                                  borderBottomWidth: 2,
                                                  borderRadius: 10,
                                                  borderBottomColor: '#F89200',
                                                  minHeight: '10%',
                                                  maxHeight: 200,
                                                  backgroundColor: '#00204A',
                                                },
                                              ]}
                                              placeholderTextColor="#FFF"
                                              placeholder="Reason"
                                              multiline={true}
                                               value={this.state.purpose}
                                               onChangeText={(value)=>this.setState({purpose:value})}


                                            />
                                          </View>
                            
                                          <View style={[styles.containerTextImage, {flex: 1}]}>
                                            <View style={[styles.containerTextImage, {flex: 7}]} />
                                            <TouchableOpacity
                                            onPress={()=>this.onSendPress()}
                                              style={[
                                                styles.container,
                                                {
                                                  marginTop: 10,
                                                  alignSelf: 'flex-end',
                                                  borderRadius: 50,
                                                  alignItems: 'center',
                                                },
                                              ]}>
                                              <Image style={{width: 50, height: 50}} source={sendIcon} />
                                            </TouchableOpacity>
                                          </View>
                                        </ScrollView>
                                      </View>
                                    </KeyboardAvoidingView>
                                  </View>
                                );
                              }
                            }
                            
      const styles = StyleSheet.create({
        container: {
          display: 'flex',
          flex: 1,

          flexDirection: 'column',
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
      