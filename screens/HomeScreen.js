import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    ScrollView, 
    KeyboardAvoidingView,
    Alert,
    TextInput, 
    Modal,
    FlatList,
} from 'react-native';
import db from "../config";
import firebase from "firebase";
import { ListItem } from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'

export default class List extends React.Component {
    constructor(){
       super()
        this.state = {
          requests : []
        }
      this.requestRef= null
      }
    
      getRequests =()=>{

        this.requestRef = db.collection("requests")

        .onSnapshot((snapshot)=>{
          var requestedList = snapshot.docs.map(document => document.data());
          
          this.setState({
            requests : requestedList
          });

        })
      }
    
      componentDidMount(){
        this.getRequests()
      }
    
      componentWillUnmount(){
        this.requestRef();
      }
    
      keyExtractor = (item, index) => index.toString()
    
      renderItem = ( {item, i} ) =>{
        return (
          <ListItem
            key={i}
            title={item.item}
            subtitle={item.description}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            rightElement={
                <TouchableOpacity style={styles.button}>
                  <Text style={{color:'black',fontSize: 20}}>VIEW ITEM</Text>
                </TouchableOpacity>
              }
              bottomDivider
          />
        )
      }
    render(){
        return(
            
          <View style={{flex:1}}>
            <View style={{flex:1}}>
            <MyHeader title="LIST OF ITEMS"/>
              {
                this.state.requests.length === 0
                ?(
                  <View style={styles.subContainer}>
                    <Text style={{ fontSize: 20}}>List Of All Requested Items.</Text>
                  </View>
                )
                :(
                    <View>
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.requests}
                    renderItem={this.renderItem}
                  />
                  </View>
                )
              }
            </View>
          </View>
        
        )
    }
}

const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"50%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"50%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      borderColor: 'red',
      backgroundColor:"yellow",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
    }
  )
  