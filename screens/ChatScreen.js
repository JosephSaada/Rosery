import React from 'react' 
import {View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native'; 
import Header from '../components/Header'; 
import ChatList from '../components/ChatList';

const ChatScreen = () => { 
  return (  
    <View style={styles.container}> 
     <Header title = 'Chat'> </Header> 
     <ChatList />
    </View>
  )
}

export default ChatScreen 

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    resizeMode: 'contain',
    backgroundColor: '#231F20',  
  },  
   button: { 
    backgroundColor: '#28282B',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center', 
    marginTop: 40,   
    alignSelf: 'center',   
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16, 
    fontWeight: 'bold', 
  }, 
})