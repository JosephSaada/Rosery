import {View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native'
import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native' 
import {Ionicons} from "@expo/vector-icons";  
import { onSnapshot, collection, query} from '@firebase/firestore'; 
import {db} from "../firebase";  
import Swiper from 'react-native-deck-swiper'; 
import { auth } from '../firebase' 
import {useRoute} from '@react-navigation/native';

const Footer = () => { 
    const navigation = useNavigation();    

    const [modalVisible, setModalVisible] = useState(false);  

    'use strict';
    var React = require('react-native');
    var {Dimensions} = React; 
    var width = Dimensions.get('window').width;  
    var height = Dimensions.get('window').height;  

    const [profiles2, setProfiles2] = useState([]);    
    
    const route = useRoute();
    
    const currentScreen = route.name 

    const handleChat = () => { 
        if (route.name !== 'ChatScreen') { 
          navigation.replace("ChatScreen")
        } 
      } 
  
    const handleDisclaimer = () => { 
      if (route.name !== 'Disclaimer') { 
        navigation.replace("Disclaimer")
      } 
    } 

    const handleHome = () => {  
        if (route.name !== 'Homescreen') { 
          navigation.replace("Homescreen")
        }
      }
  

    useEffect(() => { 
      let unsub; 
      const fetchCards = async () => {  
        unsub = onSnapshot(query(collection(db, 'users')), snapshot => {  
          setProfiles2(snapshot.docs
            .filter((doc)=>doc.id === auth.currentUser.uid)
            .map(doc => ({ 
            id: doc.id, 
            ...doc.data()
          })))
        })
      } 
      fetchCards(); 
      return unsub;
    }, [db]) 

  return (
    <View style={styles.container}>  
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}> 
      <View style = {{flex: 1, marginTop: height/-14, marginRight: width }} > 
      <Swiper  
      containerStyle={{backgroundColor: "transparent"}} 
      cards = {profiles2}  
      stackSize={1} 
      cardIndex={0}  
      verticalSwipe={false}   
      horizontalSwipe={false}
      renderCard={(card) => card ? (   
        <View key = {card.id} style = {{borderTopLeftRadius: 20,
          borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignSelf: 'center'}}> 
            <Image style = {{height: '93%', width: width*.93, borderTopLeftRadius: 20,
          borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}} source={{uri: card.photoURL}}/>     
  
          <View style={{backgroundColor: 'rgba(0,0,0,0.5)', marginTop: -100, padding: 15, height:100, width: width*.93, alignItems: 'center', alignContent: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
              <View>
                <Text style = {{ fontSize: 32, fontWeight: 'bold', color: '#F8F0E3'}}>{card.name} {card.age}</Text> 
                <Text style = {{ fontSize: 20, color: '#F8F0E3', alignSelf: 'center'}}>{card.job}</Text>
              </View>  
          </View> 
          </View>
       ): 
       ( 
        <View> 
         <Text>Loading...</Text>
         </View>  
       )} 
         />
        </View>


            <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={[styles.invbutton, styles.invbuttonOutline]}
     >
            <Text style={styles.invbuttonText}>Hide Profile</Text>
     </TouchableOpacity> 
          </View>
        </View>
      </Modal>  
      
      <View
  style={{
    borderBottomColor: '#F8F0E3',
    borderBottomWidth: 2, 
    marginBottom: 20,
  }} 

/>

      <View style={{flexDirection:"row", justifyContent:'space-between', marginBottom: 10}} > 


{currentScreen === 'Disclaimer' ? 
      <TouchableOpacity  onPress={handleDisclaimer} style={{marginLeft: 35,}}> 
      <Ionicons 
      name = "settings" size = {50} color = '#eb8165'
      style = {{ 
        
      }}
     />  
     <Text style={{color:'#F8F0E3', fontSize: 16, fontWeight: 'bold', alignSelf: 'center'}} >Info</Text>
    </TouchableOpacity>    
: 
<TouchableOpacity  onPress={handleDisclaimer} style={{marginLeft: 35,}}> 
      <Ionicons 
      name = "settings-outline" size = {50} color = '#eb8165'
      style = {{ 
        
      }}
     />  
     <Text style={{color:'#F8F0E3', fontSize: 16, fontWeight: 'bold', alignSelf: 'center'}} >Info</Text>
    </TouchableOpacity>    
}

    {currentScreen === 'Homescreen'
        ? <TouchableOpacity onPress={handleHome}>  
        <Image  
          source={require('../assets/rosery2.png')} 
          style = {{
            width: 49.5,
            height: 52,   
            marginBottom: 5, 
          }}   
          /> 
          <Text style={{color:'#F8F0E3', fontSize: 16, fontWeight: 'bold', alignSelf: 'center'}} >Home</Text>
        </TouchableOpacity> 

        : 
        
        <TouchableOpacity onPress={handleHome}>  
        <Image  
          source={require('../assets/rosery3.png')} 
          style = {{
            width: 50,
            height: 50,   
            marginBottom: 5, 
          }}   
          /> 
          <Text style={{color:'#F8F0E3', fontSize: 16, fontWeight: 'bold', alignSelf: 'center'}} >Home</Text>
        </TouchableOpacity>  
      }

    <TouchableOpacity  onPress={() => setModalVisible(true)}> 
      <Ionicons 
      name = "person-circle-outline" size = {50} color = '#eb8165'
      style = {{}}
     />   
     <Text style={{color:'#F8F0E3', fontSize: 16, fontWeight: 'bold'}} >Profile</Text>
    </TouchableOpacity>   

{currentScreen === 'ChatScreen' ? 
    <TouchableOpacity onPress={handleChat}> 
      <Ionicons 
      name = "chatbubble" size = {50} color = '#eb8165'
      style = {{  
        marginRight: 35,   
        marginLeft: -10,
      }}
     />  
     <Text style={{color:'#F8F0E3', fontSize: 16, fontWeight: 'bold'}} >Chat</Text>
    </TouchableOpacity>    
: 
  <TouchableOpacity onPress={handleChat}> 
  <Ionicons 
  name = "chatbubble-outline" size = {50} color = '#eb8165'
  style = {{  
    marginRight: 35,   
    marginLeft: -10,
  }}
  />  
  <Text style={{color:'#F8F0E3', fontSize: 16, fontWeight: 'bold'}} >Chat</Text>
  </TouchableOpacity>   
}
    </View>  
    </View> 
  )
}

export default Footer 

const styles = StyleSheet.create({
    container: { 
      padding: 2,   
      bottom: 0,  
      backgroundColor: '#6D6875'
      //position: 'absolute'  
    },  
    invbutton: { 
        backgroundColor: '#6D6875',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center', 
        alignSelf: 'center', 
        marginBottom: 25,    
      },  
      invbuttonOutline: { 
        color: '#F8F0E3',
        marginTop: 7,
        borderColor: '#F8F0E3',
        borderWidth: 2,
      }, 
      invbuttonText: {
        color: '#F8F0E3',
        fontWeight: '700',
        fontSize: 16, 
        fontWeight: 'bold', 
      },  
      buttonText: {
        color: '#f8f8ff',
        fontWeight: '700',
        fontSize: 16, 
        fontWeight: 'bold', 
      },  
      buttonOutline: {
        backgroundColor: '#F8F0E3',
        marginTop: 7,
        borderColor: '#28282B',
        borderWidth: 2,
      },
      buttonOutlineText: {
        color: '#28282B',
        fontWeight: '700',
        fontSize: 16, 
        fontWeight: 'bold',
      }, 
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
       
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "#F8F0E3",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      } 
  })