import React from 'react' 
import {View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native'; 
import {useNavigation} from '@react-navigation/core' 

const ChatScreen = () => { 
  const navigation = useNavigation(); 

  const back = () => { 
    navigation.replace("Homescreen")
  }

  return ( 
    <View style={styles.container}>
       <TouchableOpacity
       onPress={back}
       style={styles.button}
     >
       <Text style={styles.buttonText}>Back</Text>
     </TouchableOpacity>
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