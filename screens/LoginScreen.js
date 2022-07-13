import { View, Text, Button, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, StatusBar, Platform } from 'react-native';
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {  
  //const { signIn } = useAuth(); 

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 

  const navigation = useNavigation()
  
  const auth = getAuth(); 

 useEffect(() => { 
    const unsubscribe = 
    onAuthStateChanged(auth, (user) => { 
      if (user) {    
        navigation.replace("Homescreen") 
      } 
    })  
    return unsubscribe  
 }, []);


  const handleSignUp = () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
    <View 
      style={styles.container} 
      behavior="padding"
    > 
    <Image 
    source={require('../assets/Gamo3.png')}
    style={{ width: 100, height: 100, resizeMode: 'contain', marginBottom: -10}} 
    /> 

      <View 
        style = {styles.inputContainer}> 
        <TextInput
          placeholder ="Email"  
          value = {email} 
          onChangeText={text => setEmail(text)} 
          style={styles.input}
        />  
        <TextInput
          placeholder ="Password"  
          value = {password} 
          onChangeText={text => setPassword(text)} 
          style={styles.input} 
          secureTextEntry
        /> 
        </View>  
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity> 

        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity> 

        <Text style={{fontSize:20, color: "#f8f8ff", textAlign: "center", fontWeight: "bold", marginTop: 10}}> 
        May the least ugly one win
    </Text>
      </View>
    </View>
  )
}

export default LoginScreen 

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#231F20', 
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  }, 
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  button: {
    backgroundColor: '#28282B',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 7,
    borderColor: '#28282B',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16, 
    fontWeight: 'bold',
  },
  buttonOutlineText: {
    color: '#28282B',
    fontWeight: '700',
    fontSize: 16, 
    fontWeight: 'bold',
  },
})