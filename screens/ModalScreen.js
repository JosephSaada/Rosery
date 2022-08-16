import { View, Text, StyleSheet, Image, Button, Platform, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, ScrollView} from 'react-native'
import React from 'react'  
import { auth } from '../firebase' 
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker'; 
import { useNavigation } from '@react-navigation/core'  
import { doc, serverTimestamp, setDoc} from '@firebase/firestore'; 
import {db} from "../firebase";  
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'

const ModalScreen = () => {      
  const navigation = useNavigation() 

  const [url, setURL] = useState(); 

  navigation.addListener('beforeRemove', (e) => {
    e.preventDefault();   
    const action = e.data.action; 
    if (!incomplete) {
    navigation.dispatch(action) 
  }
  })

  useEffect(()=> { 
    const func = async () => {   
      const storage = getStorage();  
      const reference = ref(storage,String(auth.currentUser.uid)) 
      await getDownloadURL(reference).then((x) => {  
        setURL(x)
      })
    } 
    func();
  })

  var str = (auth.currentUser?.email).split("@")[0]; 

  const [job, setjob] = useState(null); 
  const [age, setage] = useState(null); 
  const [name, setname] = useState(null);
  const [image, setImage] = useState(null);
 
  const incomplete = !image && !age && !name && !job  

  const updateProfile = () => {    
    setDoc(doc(db, 'users', auth.currentUser.uid), {   
      id: auth.currentUser.uid, 
      name: name, 
      photoURL: url, 
      job: job, 
      age: age, 
      timestamp: serverTimestamp(),
    }).then(()=>{ 
      navigation.navigate("Homescreen")
    }).catch(error => { 
      alert(error.message);
    })
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [7, 11],
      quality: 1,
    });

    if (!result.cancelled) { 
      const storage = getStorage();  
      const spaceref = ref(storage,String(auth.currentUser.uid));  
      const img = await fetch(result.uri)  
      const bytes = await img.blob()
      await uploadBytes(spaceref, bytes)
      setImage(result.uri);  
    }
  };

  return (  
    <ScrollView>
    <KeyboardAvoidingView 
    style={styles.container}
    keyboardVerticalOffset={10}
    >   
      <Image   
      source={require('../Roasterino.png')} 
      style={{width: 500, height: 100, resizeMode: 'contain', backgroundColor: '#231F20', borderColor: '#28282B', borderWidth: 2}} 
     />  
      <Text style={{textAlign: 'center', color: '#28282B', fontWeight: 'bold', fontSize: 30}}>Hi {str} </Text> 

        <Text style={styles.InputNames}>Full Name</Text>  
        <TextInput 
        value={name} 
        onChangeText={setname}
        placeholder ="enter your parent's first mistake"  
        placeholderTextColor="#f8f8ff"  
        style={styles.input}
        maxLength={25}
      />   


<Text style={styles.InputNames}> Age</Text>  
      
      <TextInput 
          value={age} 
          onChangeText={setage}
          placeholder ="enter how long you have been suffering for"  
          placeholderTextColor="#f8f8ff"    
          keyboardType='numeric'
          maxLength={3}
          style={styles.input} 
        />    

      <Text style={styles.InputNames}> Bio</Text>  

      <TextInput 
          value={job} 
          onChangeText={setjob}
          placeholder ="enter the thing sucking your soul"  
          placeholderTextColor="#f8f8ff"   
          maxLength={30}
          style={styles.input}
        />   
        
  <Text style={styles.InputNames}> Picture</Text>   
    <View style={styles.buttonContainer}> 

        <TouchableOpacity
          onPress={pickImage}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>   

        {image && <Image source={{ uri: url}} />}  
        </View> 

 <View style={styles.buttonContainer2}>
        <TouchableOpacity 
        disabled={incomplete}  
        style={styles.button2}  
        onPress={updateProfile}  
        > 
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>   
        </View> 

        <Text style={{marginTop: 10}}>If you're stuck here, close the app and reopen</Text>
    </KeyboardAvoidingView>  
    </ScrollView>
  ) 
} 

export default ModalScreen 

const styles = StyleSheet.create({
    container: { 
      alignItems: 'center', 
      padding: 1, 
      marginTop: 50, 
      flex: 1, 
      resizeMode: 'contain',    
    },   
    InputNames: {  
      marginTop: 10,
      textAlign: 'center', 
      color: '#28282B', 
      fontWeight: 'bold', 
      fontSize: 30,
    }, 
    inputContainer: {
      width: '80%' 
    }, 
    input: { 
      color: '#f8f8ff',
      backgroundColor: '#231F20',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5, 
      width: '80%', 
      borderColor: '#28282B',
      borderWidth: 2,
    }, 
    buttonContainer: {
      width: '80%', 
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    }, 
    buttonContainer2: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 35,
    },
    button: {
      backgroundColor: '#231F20',
      width: '100%',
      padding: 12,
      borderRadius: 10,
      alignItems: 'center', 
      borderColor: '#28282B',
      borderWidth: 2,
    }, 
    button2: {
      backgroundColor: '#231F20',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',  
      borderColor: '#28282B',
      borderWidth: 2,
    }, 
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16, 
      fontWeight: 'bold',
    },
  })