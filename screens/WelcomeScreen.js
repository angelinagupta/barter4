import React, { Component } from 'react';
import { 
  View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, Modal,ScrollView,KeyboardAvoidingView 
} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      username : '',
      password: '',
      isVisible : false,
      firstName : "",
      lastName : "",
      mobileNumber:"",
      address : "",
      confirmPassword : ""
    }
  }

  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      this.props.navigation.navigate("HomeScreen")
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return alert(errorMessage)
    })
  }

  userSignUp = (username, password,confirmPassword) =>{
    if(password !== confirmPassword){
        return Alert.alert("password doesn't match\nCheck your password.")
    }else{
      firebase.auth().createUserWithEmailAndPassword(username, password)
      .then((response)=>{
        db.collection('users').add({
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          mobile_number:this.state.mobileNumber,
          username:this.state.username,
          address:this.state.address
        })
        return  Alert.alert(
             'User Added Successfully',
             '',
             [
               {text: 'OK', onPress: () => this.setState({"isVisible" : false})},
             ]
         );
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
      });
    }

  }

  showModal = ()=>(
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isVisible}
      >
      <View style={styles.modalContainer}>
        <ScrollView style={{width:'100%'}}>
          <KeyboardAvoidingView style={{flex:1,justifyContent:'center', alignItems:'center'}}>
          <Text
            style={{justifyContent:'center', alignSelf:'center', fontSize:30,color:'#ff5722',margin:50}}
            >Registration</Text>
          <TextInput
            style={styles.formTextInput}
            placeholder ={"First Name"}
            maxLength ={8}
            onChangeText={(text)=>{
              this.setState({
                firstName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Last Name"}
            maxLength ={8}
            onChangeText={(text)=>{
              this.setState({
                lastName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Mobile Number"}
            maxLength ={10}
            keyboardType={'numeric'}
            onChangeText={(text)=>{
              this.setState({
                mobileNumber: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Address"}
            multiline = {true}
            onChangeText={(text)=>{
              this.setState({
                address: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Username"}
            keyboardType ={'email-address'}
            onChangeText={(text)=>{
              this.setState({
                username: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                password: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Confrim Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                confirmPassword: text
              })
            }}
          />
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={()=>
                this.userSignUp(this.state.username, this.state.password, this.state.confirmPassword)
              }
            >
            <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={()=>this.setState({"isVisible":false})}
            >
            <Text style={{color:'#fff'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  )


  render(){
    return(
      <View style={styles.container}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          {
            this.showModal()
          }
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Barter</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={{color:'#ff5722', fontSize:18, fontWeight:'bold',marginLeft:25}}>USERNAME</Text>
          <View style={{alignItems:'center'}}>
            <TextInput
            style={styles.loginBox}
            keyboardType ={'email-address'}
            onChangeText={(text)=>{
              this.setState({
                username: text
              })
            }}
            />
          </View>
          <Text style={{color:'#ff5722', fontSize:18, fontWeight:'bold',marginLeft:25}}>PASSWORD</Text>
          <View style={{alignItems:'center'}}>
            <TextInput
              style={styles.loginBox}
              secureTextEntry = {true}
              onChangeText={(text)=>{
                this.setState({
                  password: text
                })
              }}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <TouchableOpacity
              style={[styles.button,{marginBottom:10}]}
              onPress = {()=>{this.userLogin(this.state.username, this.state.password)}}
              >
              <Text style={{color:'#ff5722', fontSize:18, fontWeight:'bold'}}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={()=>{
                this.setState({"isVisible":true})
              }}
              >
                <Text style={{color:'#ff5722', fontSize:18, fontWeight:'bold'}}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1, 
    backgroundColor:'aqua',
 }, 
 profileContainer:{
    justifyContent:'center',
    alignItems:'center',
  },
 title :{
    fontSize:65,
    paddingBottom:50,
    color : 'red',
    alignSelf: 'center',
    fontWeight: 'bold'
 }, 
 loginBox:{
  width: 300, 
  height: 40, 
  borderBottomWidth: 1.5, 
  borderColor : '#fff', 
  fontSize: 20, 
  margin:10, 
  paddingLeft:10 
}, 
button:{ 
    width:300, 
    height:50, 
    justifyContent:'center', 
    alignItems:'center', 
    borderRadius:25, 
    backgroundColor:"blue", 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 15, }, 
    shadowOpacity: 0.30, 
    shadowRadius: 10.32, 
    elevation: 16,
},
 buttonText:{ 
     color:'#fff', 
     fontWeight:'200', 
     fontSize:20 
    }, 
buttonContainer:{ 
    flex:1, 
    alignItems:'center' 
} ,
modalContainer:{
borderRadius:20,
backgroundColor:"#fff",
marginRight:10,
marginLeft : 10,
marginTop:10,
marginBottom:10,
},
formTextInput:{
width:"75%",
height:35,
alignSelf:'center',
borderColor:'#ffab91',
borderRadius:10,
borderWidth:1,
marginTop:20,
padding:10
},
registerButton:{
width:200,
height:40,
alignItems:'center',
justifyContent:'center',
borderWidth:1,
borderRadius:10,
marginTop:30,
backgroundColor: 'green'
},
registerButtonText:{
color:'#fff',
fontSize:15,
fontWeight:'bold'
},
cancelButton:{
width:200,
height:40,
alignItems:'center',
justifyContent:'center',
borderWidth:1,
borderRadius:10,
marginTop:5,
backgroundColor: 'red',
marginBottom: 10

},
})