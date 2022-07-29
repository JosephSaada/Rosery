import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useNavigation} from '@react-navigation/core'   
import {Ionicons} from "@expo/vector-icons";  
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import { auth } from '../firebase';
import { useRoute } from '@react-navigation/core';  
import { doc, deleteDoc } from "firebase/firestore";
import { async } from '@firebase/util'; 
import {db} from "../firebase"; 

const MessageScreen = () => {  
    const {params} = useRoute(); 
    const {matchDetails} = params;

    const user = auth.currentUser.uid  

    const navigation = useNavigation();   

    const back = () => { 
        navigation.replace("ChatScreen")
      }  

      //console.log(getMatchedUserInfo(matchDetails.users, user).id + user) 
      //console.log(user + getMatchedUserInfo(matchDetails.users, user).id)

      const unmatchUsers = async () => {  
        await deleteDoc(doc(db,"matches", getMatchedUserInfo(matchDetails.users, user).id + user))  
        await deleteDoc(doc(db,"matches", user + getMatchedUserInfo(matchDetails.users, user).id))    
        navigation.replace("ChatScreen") 
      }  
 
    return (
    <View style={styles.container}> 
       <TouchableOpacity onPress={back} style={{alignSelf: 'flex-start'}} >
       <Ionicons 
      name = "arrow-back" size = {50} color = '#f8f8ff'
      style = {{marginLeft: 20,  
        marginTop: 27,}} 
      />
     </TouchableOpacity>    
     
     <Text numberOfLines={1} style={{fontSize:30, color: "#f8f8ff", marginTop: 30,fontWeight: "bold"}}>{getMatchedUserInfo(matchDetails.users, user).name}</Text>   

     <TouchableOpacity onPress={unmatchUsers}>
       <Ionicons 
      name = "person-remove-outline" size = {40} color = '#f8f8ff' style = {{marginRight: 20,  marginTop: 27,}} />
     </TouchableOpacity>  
    </View>
  )
}

export default MessageScreen 

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      resizeMode: 'contain',
      backgroundColor: '#231F20',  
      padding: 2,  
      flexDirection: "row", 
      justifyContent:'space-between', 
    },  
})