import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, Platform} from 'react-native';
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const LoginScreen = () => {   

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 

  const navigation = useNavigation()
  
  const auth = getAuth(); 

 useEffect(() => { 
    const unsubscribe = 
    onAuthStateChanged(auth, (user) => {  
      if (user && user.emailVerified) {    
        navigation.replace("Homescreen") 
      } 
    })  
    return unsubscribe  
 }, []);


  const handleSignUp = async () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;  
        sendEmailVerification(user);
        alert("Check your email to verify (check your spam as well) and then try to login in")
      }) 
      .catch(error => alert(error.message))  
  }

  const handleLogin = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user; 
        if (!user.emailVerified) {    
          sendEmailVerification(user); 
          alert("Check your email to verify (check your spam as well) and then try to login in")
        } else { 
          navigation.replace("Homescreen") 
        }
      })
      .catch(error => alert(error.message))
  }

  return (
    <View 
      style={styles.container} 
    >  

    <Image 
    source={require('../assets/rosery2.png')}
    style={{ width: 300, height: 300, resizeMode: 'contain', marginBottom: -200}} 
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
        <Text style={{fontSize:10, color: "#f8f8ff", textAlign: "center", fontWeight: "bold", marginTop: 10}}> 
        Don't reuse your bank password, I didn't spend a lot on security for this app. 
    </Text>
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

        { <Text style={{fontSize:20, color: "#f8f8ff", textAlign: "center", fontWeight: "bold", marginTop: 10}}> 
        Find your true rating today! 
    </Text> } 

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
    backgroundColor: '#B5838D', 
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  }, 
  inputContainer: {
    width: '80%' 
  },
  input: {
    backgroundColor: '#F8F0E3',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  button: {
    backgroundColor: '#E5989B',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: '#F8F0E3',
    marginTop: 7,
    borderColor: '#E5989B',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16, 
    fontWeight: 'bold',
  },
  buttonOutlineText: {
    color: '#B5838D',
    fontWeight: '700',
    fontSize: 16, 
    fontWeight: 'bold',
  },
})