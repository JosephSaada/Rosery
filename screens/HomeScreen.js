import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {View, Text, Button,TouchableOpacity, StyleSheet, Image, Platform, StatusBar, Modal, TextInput} from 'react-native'; 
import {useNavigation} from '@react-navigation/core' 
import { auth } from '../firebase'
import Swiper from 'react-native-deck-swiper'; 
import { onSnapshot, doc, collection, getDocs, setDoc, query, where, getDoc, serverTimestamp} from '@firebase/firestore'; 
import {db} from "../firebase"; 
import generateId from '../lib/generateId'; 
import Footer from '../components/Footer';

const Homescreen = () => {  
    const navigation = useNavigation();  
    const [profiles, setProfiles] = useState([]);    

    const [compliment, setCompliment] = useState('')

    'use strict';
    var React = require('react-native');
    var {Dimensions} = React; 
    var width = Dimensions.get('window').width;  

    //const swiperef = useRef(null);   

     useLayoutEffect(() =>  
      onSnapshot(doc(db, 'users', auth.currentUser.uid), snapshot => {  
        if (!snapshot.exists()) 
        navigation.navigate("Modal")
      }), []);  


      


    useEffect(() => { 
      let unsub;       

      const fetchCards = async () => {  
        const passes = await getDocs(collection(db,'users',auth.currentUser.uid, 'passes')).then(
          snapshot=> snapshot.docs.map((doc) => doc.id)
        ) 
        const swipes = await getDocs(collection(db,'users',auth.currentUser.uid, 'swipes')).then(
          snapshot=> snapshot.docs.map((doc) => doc.id)
        ) 
        const passedUserIds = passes.length > 0 ? passes : ['test']; 
        const swipedUserIds = swipes.length > 0 ? swipes : ['test'];

        unsub = onSnapshot(query(collection(db, 'users')), snapshot => {  
          setProfiles(snapshot.docs   
            .filter((doc)=> doc.id !== (auth.currentUser.uid))  
            .filter((doc)=> !(swipedUserIds.includes(doc.id))) 
            .filter((doc)=> !(passedUserIds.includes(doc.id)))
            .map(doc => ({ 
            id: doc.id, 
            ...doc.data()
          })))
        })
      } 

      fetchCards(); 
      return unsub;
    }, [db])

    const swipeLeft = (cardIndex) => { 
      if (!profiles[cardIndex]) return; 
      const userSwiped = profiles[cardIndex]; 
      setDoc(doc(db, 'users', auth.currentUser.uid, 'passes', userSwiped.id), userSwiped)
    }
    const swipeRight = async(cardIndex) => {  
      if (!profiles[cardIndex]) return;  

      const userSwiped = profiles[cardIndex]; 
      const loggedInProfile = await (await getDoc(doc(db, 'users', auth.currentUser.uid))).data();

      getDoc(doc(db, 'users', userSwiped.id, 'swipes', auth.currentUser.uid)).then( 
        (documentSnapshot) => { 
          if (documentSnapshot.exists()) { 
            setDoc(doc(db, 'users', auth.currentUser.uid, 'swipes', userSwiped.id), userSwiped) 
            setDoc(doc(db, 'matches', generateId(auth.currentUser.uid, userSwiped.id)), { 
              users: { 
                [auth.currentUser.uid]: loggedInProfile, 
                [userSwiped.id]: userSwiped
              }, 
              usersMatched: [auth.currentUser.uid , userSwiped.id], 
              timestamp: serverTimestamp(),
            }) ;
            navigation.navigate('Match', { 
              loggedInProfile, userSwiped,
             })
          } else { 
            setDoc(doc(db, 'users', auth.currentUser.uid, 'swipes', userSwiped.id), userSwiped)
          }
        }
      )
    }

  return (  
     <View style={styles.container}>   

     <View style = {{flex: 1, marginTop: 0}}> 
      <Swiper  
      //ref = {swiperef}
      containerStyle={{backgroundColor: "transparent"}}
      cards = {profiles}  
      stackSize={5} 
      cardIndex={0}  
      animateCardOpacity 
      verticalSwipe={false}   
      onSwipedLeft={(cardIndex)=> { 
        swipeLeft(cardIndex);
      }} 
      onSwipedRight={(cardIndex)=> { 
        swipeRight(cardIndex);
      }}  

      renderCard={(card) => card ? (    
        <View key = {card.id} style = {{borderTopLeftRadius: 20,
        borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignSelf: 'center',}}> 
          <Image style = {{height: '93%', width: width*.93, borderTopLeftRadius: 20,
        borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}} source={{uri: card.photoURL}}/>     

<View style = {styles.inputContainer}> 
      <TextInput
        placeholder ="Compliment"  
        value = {compliment} 
        onChangeText={text => setCompliment(text)} 
        style={styles.input}
      />  
      </View> 

        <View style={{backgroundColor: 'rgba(109,104,117,0.7)', marginTop: -100, padding: 15, height:100, width: width*.93, alignItems: 'center', alignContent: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20,}}>
            <View>
              <Text style = {{ fontSize: 32, fontWeight: 'bold', color: '#F8F0E3'}}>{card.name} {card.age}</Text> 
              <Text style = {{ fontSize: 20, color: '#F8F0E3', alignSelf: 'center'}}>{card.job}</Text>
            </View>  
        </View> 
        </View>
  ) : 
( 
 <View style = {{backgroundColor: "#E5989B", height: '85%', borderTopLeftRadius: 20,
 borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center', justifyContent: 'center'}}> 
  <Text style={{fontWeight:"bold", color: '#f8f8ff', fontSize: 25, textAlign: 'center'}}> Try complimenting youself today</Text>
  </View>  
)}
      />
      </View>      
    <Footer> </Footer> 
   </View> 
  ) 
  
}

export default Homescreen 

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    resizeMode: 'contain',
    backgroundColor: '#B5838D',    
  },   
  inputContainer: {
    width: '80%', 
    alignSelf: 'center', 
    position: 'absolute'
  },
  input: {
    backgroundColor: '#F8F0E3',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
  },
});