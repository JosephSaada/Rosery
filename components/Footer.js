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
      <View style = {{flex: 1, marginTop: height/-10.5, marginRight: width}}> 
      <Swiper  
      containerStyle={{backgroundColor: "transparent"}} 
      cards = {profiles2}  
      stackSize={1} 
      cardIndex={0}  
      verticalSwipe={false}   
      horizontalSwipe={false}
      renderCard={(card) => card ? (   
        <View key = {card.id} style = {{borderTopLeftRadius: 20,
        borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}> 
          <Image style = {{height: '85%', width: width*.93, borderTopLeftRadius: 20,
        borderTopRightRadius: 20}} source={{uri: card.photoURL}}/>     
        <View style={{backgroundColor: '#28282B', padding: 15, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height:100, textAlign: 'center', flexDirection:"row", justifyContent:'space-between',  width: width*.93 }}>
            <View>
              <Text style = {{ fontSize: 32, fontWeight: 'bold', color: '#f8f8ff'}}>{card.name}</Text> 
              <Text style = {{ fontSize: 20, color: '#f8f8ff'}}>{card.job}</Text>
            </View>  
            <Text style={{fontSize: 40, fontWeight: 'bold', color: '#f8f8ff'}}>{card.age}</Text>
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
      
      <View style={{flexDirection:"row", justifyContent:'space-between'}} > 

      <TouchableOpacity  onPress={handleDisclaimer}> 
      <Ionicons 
      name = "alert-circle-outline" size = {50} color = '#f8f8ff'
      style = {{ 
        marginLeft: 35,
      }}
     />  
    </TouchableOpacity>   

      <TouchableOpacity onPress={handleHome}> 
      <Image  
      source={require('../assets/Gamo3.png')} 
      style = {{
        width: 40,
        height: 40,   
        transform: [{ scale: 2 }],
        marginBottom: 50, 
      }}  
      />
    </TouchableOpacity>    

    <TouchableOpacity  onPress={() => setModalVisible(true)}> 
      <Ionicons 
      name = "person-circle-outline" size = {50} color = '#f8f8ff'
      style = {{ 
       
      }}
     />  
    </TouchableOpacity>   

    <TouchableOpacity onPress={handleChat}> 
      <Ionicons 
      name = "chatbubble-sharp" size = {50} color = '#f8f8ff'
      style = {{  
        marginRight: 30,  
      }}
     /> 
    </TouchableOpacity>   
    </View>  
    </View> 
  )
}

export default Footer 

const styles = StyleSheet.create({
    container: { 
      padding: 2,  
    },  
    invbutton: { 
        backgroundColor: 'transparent',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center', 
        alignSelf: 'center', 
        marginBottom: 25,    
      },  
      invbuttonOutline: { 
        color: 'white',
        marginTop: 7,
        borderColor: 'white',
        borderWidth: 2,
      }, 
      invbuttonText: {
        color: 'white',
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
        backgroundColor: 'white',
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
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      } 
  })