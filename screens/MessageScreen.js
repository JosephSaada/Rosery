import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Button, Platform, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useNavigation} from '@react-navigation/core'   
import {Ionicons} from "@expo/vector-icons";  
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import { auth } from '../firebase';
import { useRoute } from '@react-navigation/core';  
import { doc, deleteDoc, addDoc, collection, serverTimestamp, onSnapshot, orderBy, query } from "firebase/firestore";
import { async } from '@firebase/util'; 
import {db} from "../firebase"; 
import SenderMessage from '../components/SenderMessage';
import ReceiverMessage from '../components/ReceiverMessage';

const MessageScreen = () => {   
  const user = auth.currentUser.uid  

    const {params} = useRoute(); 
    const {matchDetails} = params; 
 
    const [input, setInput] = useState("") 
    const [messages, setMessages] = useState([])

    useEffect(()=> onSnapshot(query(collection(db, 'matches', matchDetails.id, 'messages'), orderBy('timestamp', 'desc')), 
      snapshot => setMessages(snapshot.docs.map(
        doc => ({ 
          id: doc.id, 
          ...doc.data()
        })
      ))      
      )
    , [matchDetails, db])
    
    const sendMessage = () => {
      addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
        timestamp: serverTimestamp(), 
        userId: user, 
        displayName: auth.currentUser?.email, 
        photoURL: matchDetails.users[user].photoURL,  
        message: input,
      }) 
      setInput("");
    }

    const navigation = useNavigation();   

    const back = () => { 
        navigation.replace("ChatScreen")
      }  

      const unmatchUsers = async () => {  
        await deleteDoc(doc(db,"matches", getMatchedUserInfo(matchDetails.users, user).id + user))  
        await deleteDoc(doc(db,"matches", user + getMatchedUserInfo(matchDetails.users, user).id))    
        navigation.replace("ChatScreen") 
      }  
 
    return (      
      <React.Fragment> 
    <View  
    style={styles.container}
    keyboardVerticalOffset={10}
    > 
       <TouchableOpacity onPress={back} style={{alignSelf: 'flex-start'}} >
       <Ionicons 
      name = "arrow-back" size = {50} color = '#f8f8ff'
      style = {{marginLeft: 20,  
        marginTop: 27,}} 
      />
     </TouchableOpacity>    
     
     <Text numberOfLines={1} style={{fontSize:30, color: "#f8f8ff", marginTop: 30,fontWeight: "bold"}}>{getMatchedUserInfo(matchDetails.users, user).name}</Text>   

     <TouchableOpacity onPress={unmatchUsers} style ={{height: 80}}>
       <Ionicons 
      name = "person-remove-outline" 
      size = {40} color = '#f8f8ff' style = {{marginRight: 20,  marginTop: 30,}} />
     </TouchableOpacity> 
        
    </View>  
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
    <>
    <FlatList 
    data = {messages}  
    inverted={-1}
    style={{backgroundColor: '#231F20'}} 
    keyExtractor={item => item.id} 
    renderItem={({item: message}) => 
        message.userId === user ? (
          <SenderMessage key={message.id} message={message}/> 
        ) : ( 
          <ReceiverMessage key={message.id} message={message}/>
        )
  }
    />
    </>
    </TouchableWithoutFeedback>
    

       <KeyboardAvoidingView style = {{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', backgroundColor: '#231F20'}}>  
        <TextInput
        style={{
        height: 50, width: '100%',  
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop: 5,  
        marginBottom: 5, 
        marginLeft: 3,
        borderWidth: 2,  
        marginRight: -50,
        backgroundColor: '#f8f8ff' 
      }}  
        onChangeText={setInput} 
        onSubmitEditing={sendMessage} 
        value={input}   
        multiline={true}  
        textAlignVertical='top' 
        /> 

        <TouchableOpacity onPress={sendMessage}>  
        <Text style={{fontWeight: 'bold', fontSize: 16, marginRight: 50, color: 'black', opacity: 0.5}}>Send</Text>
        </TouchableOpacity>
       </KeyboardAvoidingView> 
    </React.Fragment> 
    
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