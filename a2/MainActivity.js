/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'react-native-firebase'
import Geolocation from '@react-native-community/geolocation';

import React from 'react';
import {ImageBackground,
        StyleSheet,
        Image,
        View,
        Text,
        TextInput,
        TouchableOpacity,
        KeyboardAvoidingView,
        ScrollView,
        Switch,
        Alert,
        } from 'react-native';



const backgroundImage=require('./designs/backgroundImage.png');
const employeeIcon=require('./designs/employee-icon.png');
const logoIcon=require('./designs/LOGOOOO.png');
const lockIcon=require('./designs/lock-icon.png');
const eyeOff=require('./designs/eyeOff.png');
const eyeOpen=require('./designs/eyeOpen.png');
//const logo=require('./designs/logo.png');

class MainActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEyeOff: true,
      userName: '',
      password: '',
      longitude:0,
      latitude:0
    };
    this.toggleShowPassword = this.toggleShowPassword.bind(this);
  }
  toggleShowPassword() {
    this.setState({secureInput: !this.state.secureInput});
  }

  state = {switchValue: false};
  toggleSwitch = value => {
    //onValueChange of the switch this function will be called
    this.setState({switchValue: value});
    //state changes according to switch
  };
   componentDidMount(){
     console.log("ello")
      Geolocation.getCurrentPosition(info =>
        this.setState({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        },console.log(this.state.latitude)), 
      );
   }
  onSignIn() {
    console.log(this.state.userName);
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.userName, this.state.password)
      .then(() => {
        this.props.navigation.navigate('Tabs');
      });
  }
 
  onPressShowHidePasswrod() {
    var imgSource = this.state.showEyeOff ? eyeOff : eyeOpen;
    return <Image style={{width: 50, height: 50}} source={imgSource} />;
  }
  onSubmit() {
    const {userName, password} = this.state;
    //() => this.props.navigation.navigate('Tabs')

    if (userName === 'm' && password === '1') {
      () => this.props.navigation.navigate('Tabs');
    } else {
      Alert.alert('Password not matched');
    }
  }
  render() {
    const {userName, password} = this.state;
    return (
      <ImageBackground
        style={[styles.background]}
        resizeMode="stretch"
        source={backgroundImage}>
        <KeyboardAvoidingView style={styles.KeyboardWrapper}>
          <View style={styles.container}>
            <View
              style={[styles.container, {flex: 1.5, justifyContent: 'center'}]}>
              <Image style={{width: 170, height: 170}} source={logoIcon} />
              <View style={[{alignItems: 'stretch', flex: 9}]}>
                <Text
                  style={[
                    styles.textWrapping,
                    {
                      fontSize: 40,
                      marginTop: 10,
                      fontWeight: 'bold',
                      fontStyle: 'italic',
                      color: '#F89200',
                    },
                  ]}>
                  E
                  <Text
                    style={[
                      styles.textWrapping,
                      {
                        fontSize: 35,
                        marginTop: 10,
                        fontWeight: '100',
                        color: '#fff',
                      },
                    ]}>
                    ttendance
                  </Text>
                </Text>
              </View>
            </View>
            <View style={[styles.container, {flex: 2}]}>
              <ScrollView style={styles.scrollViewWrapper}>
                <View style={[styles.container, {flex: 1}]}>
                  <View
                    style={[
                      styles.containerTextImage,
                      {justifyContent: 'center'},
                    ]}>
                    <Text style={styles.textWrapping}>
                      Sign in to your
                      <Text style={[styles.textWrapping, {color: '#F89200'}]}>
                        {' '}
                        Ettendance
                        <Text style={styles.textWrapping}> Account</Text>
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.inputText,
                      styles.containerTextImage,
                      {padding: 0},
                    ]}>
                    <View style={{flex: 1}}>
                      <Image
                        style={{width: 50, height: 50}}
                        source={employeeIcon}
                      />
                    </View>
                    <View style={{flex: 3}}>
                      <TextInput
                        placeholder="Username"
                        onChangeText={value => this.setState({userName: value})}
                      />
                    </View>
                  </View>
                  <View
                    style={[
                      styles.inputText,
                      styles.containerTextImage,
                      {padding: 0},
                    ]}>
                    <View style={{flex: 1}}>
                      <Image
                        style={{width: 50, height: 50, borderRadius: 40}}
                        source={lockIcon}
                      />
                    </View>
                    <View style={{flex: 2}}>
                      <TextInput
                        placeholder="Enter Pin"
                        secureTextEntry
                        onChangeText={value => this.setState({password: value})}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({showEyeOff: !this.state.showEyeOff})
                      }
                      activeOpcaity={0.03}
                      style={{alignItems: 'flex-end', flex: 1}}>
                      {this.onPressShowHidePasswrod()}
                    </TouchableOpacity>
                  </View>

                  <View style={[styles.containerTextImage]}>
                    <TouchableOpacity
                      style={[
                        styles.inputText,
                        {backgroundColor: '#F89200', justifyContent: 'center'},
                      ]}
                      activeOpcaity={0.05}
                      onPress={() => this.onSignIn()}>
                      <View style={{alignItems: 'center'}}>
                        <Text>Sign In</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
            <View style={[styles.containerTextImage, {alignItems: 'flex-end'}]}>
              <View style={styles.containerTextImage}>
                <Switch
                  trackColor={{false: '#00204A', true: '#00204A'}}
                  thumbColor={
                    this.state.switchValue == true ? '#F89200' : '#448Ef6'
                  }
                  ios_background
                  Color="#fff"
                  onValueChange={this.toggleSwitch}
                  value={this.state.switchValue}
                />
                <Text style={[styles.textWrapping, {marginLeft: 0}]}>
                  Remember Me
                </Text>
              </View>

              <TouchableOpacity activeOpcaity={0.05}>
                <View>
                  <Text style={[styles.textWrapping, {color: '#F89200'}]}>
                    Forget Password?
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}


 const styles = StyleSheet.create({
   container: {
     display:'flex',
     flex: 1,
     alignItems:'center',
     flexDirection:'column',
   },
   KeyboardWrapper: {
     display: "flex",
     flex: 1,

   },
   scrollViewWrapper: {
     marginTop: 70,
     flex: 1
   },
   background:{
     width:'100%',
     height:'100%',
     justifyContent:'center',
     alignItems:'center',
     flex:1,
     },
     containerVertical:{
       flex: 1,
       justifyContent: 'center',
     },
   containerTextImage: {
     flex:1,
     flexDirection: 'row',
       },
   textWrapping: {
     //flexDirection:'row',
     fontSize: 15,
     margin: 10,
     textAlign: 'center',
     color:'#fff',
     fontFamily: 'San',

   },
   inputText: {
     width: '97%',
     borderRadius:40,
     backgroundColor: '#FFF',
     borderBottomColor:'#F89200',
     padding: 18,
     marginBottom: 15,
   },
   logocontainer:{
     marginTop:150,
     alignItems:'center',
     marginBottom:250,
     },
   bottom: {
   flex: 1,
   justifyContent: 'flex-end',
   marginBottom:36,
 },

 });
export default MainActivity;
