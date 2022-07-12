import React from 'react' 
import {View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar} from 'react-native'; 
import {useNavigation} from '@react-navigation/core' 
import { auth } from '../firebase'  
import {Ionicons} from "@expo/vector-icons"; 

const Disclaimer = () => { 
  const navigation = useNavigation(); 

  const back = () => { 
    navigation.replace("Homescreen")
  } 

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("LoginScreen")
      })
      .catch(error => alert(error.message))
  } 

  return (    
    <View style={styles.container}>   

    <TouchableOpacity onPress={back} style={{alignSelf: 'flex-start'}} >
       <Ionicons 
      name = "arrow-back" size = {50} color = '#f8f8ff'
      style = {{  
        marginLeft: 20,  
        marginTop: 30,  
      }} 
      />
     </TouchableOpacity>    

    <Text style={{fontSize:40, color: "#f8f8ff", textAlign: "center", marginTop: -20, marginBottom: 10, fontWeight: "bold"}}> 
        Information
    </Text>
    <Text style={{fontSize:20, color: "#f8f8ff", textAlign: "center", marginBottom: -45}}>
        Privacy Policy: I am not responsible or liable for anything LMAO {'\n \n'} 
        Terms and Condtions: uhhh same thing as above {'\n \n'} 
        <Text style={{fontWeight: "bold",fontSize: 40 }}> Credits:</Text> {'\n \n'} 
        <Text style={{fontWeight: "bold"}}> Devolper:</Text>{'\n \n'}  Joseph Saada {'\n \n'} 
        <Text style={{fontWeight: "bold"}}> Branding Design:</Text> {'\n \n'} Ian Blevins {'\n \n'}   
        <Text style={{fontWeight: "bold"}}> Assistant Director:</Text> {'\n \n'} God {'\n \n'}   
        <Text style={{fontWeight: "bold"}}> Assistant to Assistant Director:</Text> {'\n \n'} Jesus Christ {'\n \n'}  
        
        </Text>  

     <TouchableOpacity
       onPress={() => navigation.navigate("Modal")}
       style={styles.button}
     >
       <Text style={styles.buttonText}>Profile</Text>
     </TouchableOpacity>  

     <TouchableOpacity
       onPress={handleSignOut}
       style={[styles.button, styles.buttonOutline]}
     >
       <Text style={styles.buttonOutlineText}>Sign out</Text>
     </TouchableOpacity> 
    </View> 
  )
}

export default Disclaimer 

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    resizeMode: 'contain',
    backgroundColor: '#231F20',   
    alignItems: 'center',   
  },  
   button: { 
    backgroundColor: '#28282B',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center', 
    marginTop: 20,   
    alignSelf: 'center',    
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
})