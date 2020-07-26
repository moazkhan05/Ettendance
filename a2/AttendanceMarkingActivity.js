/**
 * Sample React Native App
 * https://github.com/facebook/react-native
2 *
 * @format
 * @flow
 */
 import 'react-native-gesture-handler';
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import ImagePicker from 'react-native-image-picker';
 //import LeaveActivity from 'C:/Users/dell/a2/components/LeaveActivity.js';
import React from 'react';
import {
  StyleSheet,
        Image,
        View,
        Text,
        Alert,
        TouchableOpacity,
        } from 'react-native';
import firebase from 'react-native-firebase';



const backgroundImage=require('./designs/markingAttendanceBackground.png');
const employeeIcon=require('./designs/employee-icon.png');
const timeInIcon=require('./designs/timeinicon.png');
const timeOutIcon=require('./designs/timeouticon.png');
const employeePic=require('./designs/pic_circle2.png');
//const logo=require('./designs/logo.png');
const Stack = createStackNavigator();
var downloadURLGlobal=""
var image="";
 class AttendanceMarkingActivity extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       //defauilt value of the date time
       date: '',
       time: '',
       ampm: '',
       day: '',
       userName: '',
       image: '',
       avatarSource: '',
     };
   }
   componentDidMount() {
     this.takeCurrentUserData();
     this.timer = setInterval(() => {
       this.getCurrentTime();
     }, 1000);
   }
   takeCurrentUserData() {
     firebase
       .database()
       .ref(`profileData/${firebase.auth().currentUser.uid}`)
       .on('value', snapshot => {
         console.log(snapshot.val().image);
         image = snapshot.val().image;
         console.log('sa', image);
         this.setState({
           userName: snapshot.val().name,
         });
       });
   }
   componentWillUnmount() {
     clearInterval(this.timer);
   }
   getCurrentTime = () => {
     var weekday = new Array(7);
     weekday[0] = 'Sunday';
     weekday[1] = 'Monday';
     weekday[2] = 'Tuesday';
     weekday[3] = 'Wednesday';
     weekday[4] = 'Thursday';
     weekday[5] = 'Friday';
     weekday[6] = 'Saturday';

     var month = new Array(12);
     month[0] = 'Jan';
     month[1] = 'Feb';
     month[2] = 'Mar';
     month[3] = 'Apr';
     month[4] = 'May';
     month[5] = 'Jun';
     month[6] = 'Jul';
     month[7] = 'Aug';
     month[8] = 'Sep';
     month[9] = 'Oct';
     month[10] = 'Nov';
     month[11] = 'Dec';

     var d = new Date();
     var day = weekday[d.getDay()];
     var that = this;
     var date = d.getDate(); //Current Date
     var month = month[d.getMonth()]; //Current Month
     var year = d.getFullYear(); //Current Year
     var hours = d.getHours(); //Current Hours
     var min = d.getMinutes(); //Current Minutes
     var sec = d.getSeconds(); //Current Seconds
     var amPm = 'PM';
     if (date < 10) {
       date = '0' + date;
     }
     if (month < 10) {
       month = '0' + month;
     }
     if (hours < 10) {
       hours = '0' + hours;
     }
     if (min < 10) {
       min = '0' + min;
     }
     if (sec < 10) {
       sec = '0' + sec;
     }
     if (hours > 12) {
       hours = hours - 12;
     }
     if (hours == 0) {
       hours = 12;
     }
     if (d.getHours() < 12) {
       amPm = 'AM';
     }
     that.setState({
       //Setting the value of the date time
       day: day + ' ',
       date: date + ' , ' + month + ' ' + year,
       time: hours + ':' + min + ':' + sec,
       ampm: amPm,
     });
   };

   openTimeInImage = () => {
     const options = {
       title: 'Select Avatar',

       storageOptions: {
         skipBackup: true,
         path: 'images',
       },
     };

     ImagePicker.launchCamera(options, response => {
       console.log('Response = ', response);

       if (response.didCancel) {
         console.log('User cancelled image picker');
       } else if (response.error) {
         console.log('ImagePicker Error: ', response.error);
       } else if (response.customButton) {
         console.log('User tapped custom button: ', response.customButton);
       } else {
         const source = {uri: response.path};

         // You can also display the image using data:
         // const source = { uri: 'data:image/jpeg;base64,' + response.data };

         this.setState({
           avatarSource: source,
         },()=>{
           this.uploadTimeInImage()
         });
       }
     });
   
   };
   uploadTimeInImage() {

    

     var timestamp = new Date().getTime().toString();

     var uid = firebase.auth().currentUser.uid;
     
    

     var today = new Date();
     var time = new Date();
     var dd = String(today.getDate()).padStart(2, '0');
     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
     var yyyy = today.getFullYear();
     today = dd + '-' + mm + '-' + yyyy;

     var hour = time.getHours();
     var minutes = time.getMinutes();
     var ampm = hour >= 12 ? 'PM' : 'AM';
     hour = hour % 12;
     hour = hour ? hour : 12;
     if (minutes.toString().length == 1) {
       minutes = '0' + minutes;
     }
     if (hour.toString().length == 1) {
       hour = '0' + hour;
     }

     time = hour + ':' + minutes + ' ' + ampm;

     

     console.log('upload file called');
     console.log('s', this.state.avatarSource);
     var metadata = {
       contentType: 'image/jpeg',
     };

     var fileRef = firebase
       .storage()
       .ref(`images/`)
       .child(timestamp);

    var uploadTask = fileRef.putFile(this.state.avatarSource.uri, metadata);
     if (uploadTask === undefined || uploadTask === '') {
       Alert.alert('Unable to  upload');
     }
     uploadTask.on(
       'state_changed',
       snap => {
         const percentUploaded = Math.round(
           (snap.bytesTransferred / snap.totalBytes) * 100,
         );
         console.log('Percentage', percentUploaded);
        
       },
       () => {
         //unsuccessful Upload
       },
       () => {
         var fileR = firebase
           .storage()
           .ref(`images/`)
           .child(timestamp);
         // Upload completed successfully, now we can get the download URL
         fileR.getDownloadURL().then(downloadURL => {
           downloadURLGlobal = downloadURL;
           
           firebase
             .database()
             .ref(`userAttendece/${uid}/${today}`)

             .update({
              

               timeIn: time,
               Date: today,
               urlTimeIn: downloadURLGlobal,
             });
           
         });
       },
     );
   
   }
openTimeOutImage = () => {
  const options = {
    title: 'Select Avatar',

    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  ImagePicker.launchCamera(options, response => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = {
        uri: response.path
      };

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };

      this.setState({
        avatarSource: source,
      }, () => {
        this.uploadTimeOutImage()
      });
    }
  });

};
uploadTimeOutImage() {
  var timestamp = new Date().getTime().toString();

  var uid = firebase.auth().currentUser.uid;



  var today = new Date();
  var time = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + '-' + mm + '-' + yyyy;

  var hour = time.getHours();
  var minutes = time.getMinutes();
  var ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12;
  if (minutes.toString().length == 1) {
    minutes = '0' + minutes;
  }
  if (hour.toString().length == 1) {
    hour = '0' + hour;
  }

  time = hour + ':' + minutes + ' ' + ampm;



  console.log('upload file called');
  console.log('s', this.state.avatarSource);
  var metadata = {
    contentType: 'image/jpeg',
  };

  var fileRef = firebase
    .storage()
    .ref(`images/`)
    .child(timestamp);

  var uploadTask = fileRef.putFile(this.state.avatarSource.uri, metadata);
  if (uploadTask === undefined || uploadTask === '') {
    Alert.alert('Unable to  upload');
  }
  uploadTask.on(
    'state_changed',
    snap => {
      const percentUploaded = Math.round(
        (snap.bytesTransferred / snap.totalBytes) * 100,
      );
      console.log('Percentage', percentUploaded);

    },
    () => {
      //unsuccessful Upload
    },
    () => {
      var fileR = firebase
        .storage()
        .ref(`images/`)
        .child(timestamp);
      // Upload completed successfully, now we can get the download URL
      fileR.getDownloadURL().then(downloadURL => {
        downloadURLGlobal = downloadURL;

        firebase
          .database()
          .ref(`userAttendece/${uid}/${today}`)

          .update({
            

            timeOut: time,
            Date: today,
            urlTimeOut: downloadURLGlobal,
          });

      });
    },
  );

}

   render() {
     return (
       <View style={[styles.container, {backgroundColor: '#00204A'}]}>
         <View
           style={[
             styles.containerTextImage,
             {flex: 1, justifyContent: 'space-between'},
           ]}>
           <View style={[styles.userNameBox, {alignItems: 'stretch'}]}>
             <Text
               style={[
                 styles.textWrapping,
                 {alignSelf: 'center', marginTop: 5},
               ]}>
               {this.state.userName}
             </Text>
           </View>
         </View>

         <View style={[styles.container, {flex: 8}]}>
           <View
             style={[
               styles.container,
               {alignItems: 'center', justifyContent: 'flex-start', flex: 1},
             ]}>
             <Text style={[styles.textWrapping, {fontSize: 18}]}>
               {this.state.day}
               <Text style={[styles.textWrapping, {fontSize: 16}]}>
                 {this.state.date}
               </Text>
             </Text>

             <Text
               style={[styles.textWrapping, {fontSize: 65, color: '#F89200'}]}>
               {this.state.time}
               <Text style={[styles.textWrapping, {fontSize: 20}]}>
                 {this.state.ampm}
               </Text>
             </Text>
           </View>

           <View
             style={[styles.container, {alignItems: 'flex-start', flex: 2}]}>
             <Image
               style={{width: 200, height: 200, alignSelf: 'center'}}
               source={{
                 uri: image,
               }}
             />
           </View>

           <View style={[styles.container, {flex: 1}]}>
             <View
               style={[
                 styles.container,
                 styles.containerTextImage,
                 {alignSelf: 'center', padding: 0, width: '85%'},
               ]}>
               <TouchableOpacity
                 onPress={() => this.openTimeInImage()}
                 style={[
                   styles.inputText,
                   styles.containerTextImage,
                   {backgroundColor: '#F89200', padding: 0},
                 ]}
                 activeOpcaity={0.5}>
                 <View style={[{flex: 1}]}>
                   <Image
                     style={{width: 50, height: 50}}
                     source={timeInIcon}
                   />
                 </View>
                 <View style={[{flex: 1, alignItems: 'center'}]}>
                   <Text
                     style={[
                       {
                         fontSize: 30,
                         fontWeight: '900',
                         flex: 1,
                         marginTop: 6,
                       },
                     ]}>
                     Time In
                   </Text>
                 </View>
               </TouchableOpacity>
             </View>
             <View
               style={[
                 styles.container,
                 styles.containerTextImage,
                 {alignSelf: 'center', padding: 0, width: '85%'},
               ]}>
               <TouchableOpacity
                 onPress = {
                   () => this.openTimeOutImage()
                 }
                 style={[
                   styles.inputText,
                   styles.containerTextImage,
                   {backgroundColor: '#F89200', padding: 0},
                 ]}
                 activeOpcaity={0.5}>
                 <View style={[{flex: 1, alignItems: 'center'}]}>
                   <Text
                     style={[
                       {
                         fontSize: 30,
                         fontWeight: '300',
                         marginTop: 6,
                         flex: 1,
                       },
                     ]}>
                     Time Out
                   </Text>
                 </View>
                 <View style={[{flex: 1, alignItems: 'flex-end'}]}>
                   <Image
                     style={{width: 50, height: 50, justifyContent: 'center'}}
                     source={timeOutIcon}
                   />
                 </View>
               </TouchableOpacity>
             </View>
           </View>
         </View>

         <View
           style={[
             styles.container,
             {flex: 1, alignSelf: 'flex-end', backgroundColor: '#00204A'},
           ]}
         />
       </View>
     );
   }
 }

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flex: 1,

    flexDirection:'column',
  },
  KeyboardWrapper: {
    display: "flex",
    flex: 1,

  },
  backBtn:{
    justifyContent:'flex-start',
    alignItems:'flex-start',
    },
  background:{
    width:'100%',
    height:'100%',
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
    fontSize: 20,
    textAlign: 'center',
    color:'#fff',
    marginRight:5,
    fontFamily: 'San',
  },
  userNameBox:{
    marginTop:8,
    width: '50%',
    backgroundColor: '#F89200',
    height:'50%',
    },
    inputText: {
    width: '90%',
    borderRadius:40,
    backgroundColor: '#FFF',
    borderBottomColor:'#F89200',
    padding: 10,
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
export default AttendanceMarkingActivity;
