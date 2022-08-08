import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {View, Text, Button,TouchableOpacity, StyleSheet, Image, Platform, StatusBar, Modal} from 'react-native'; 
import {useNavigation} from '@react-navigation/core' 
import { auth } from '../firebase'
import {Ionicons} from "@expo/vector-icons"; 
import Swiper from 'react-native-deck-swiper'; 
import { onSnapshot, doc, collection, getDocs, setDoc, query, where, getDoc, serverTimestamp} from '@firebase/firestore'; 
import {db} from "../firebase"; 
import { async } from '@firebase/util';
import generateId from '../lib/generateId'; 
import Footer from '../components/Footer';
import { getContentById } from '../lib/getContentById';

const Homescreen = () => {  
    const navigation = useNavigation();  
    const [profiles, setProfiles] = useState([]);   

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

        // unsub = onSnapshot(query(collection(db, 'users'), getContentById('id', [...passedUserIds, ...swipedUserIds])), snapshot => {  
        //   setProfiles(snapshot.docs
        //     .filter((doc)=>doc.id !== auth.currentUser.uid)
        //     .map(doc => ({ 
        //     id: doc.id, 
        //     ...doc.data()
        //   })))
        // })

        unsub = onSnapshot(query(collection(db, 'users'), where('id', 'not-in', [...passedUserIds, ...swipedUserIds])), snapshot => {  
          setProfiles(snapshot.docs
            .filter((doc)=>doc.id !== auth.currentUser.uid)
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
      overlayLabels={{ 
        right: { 
          title: "ROAST", 
          style: { 
            label: { 
              textAlign: "left", 
              color: "white", 
              fontWeight: 'bold',
            }
          }
        }
      }} 
      
      renderCard={(card) => card ? (   
        <View key = {card.id} style = {{borderTopLeftRadius: 20,
        borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignSelf: 'center',}}> 
          <Image style = {{height: '93%', width: width*.93, borderTopLeftRadius: 20,
        borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}} source={{uri: card.photoURL}}/>     

        <View style={{backgroundColor: 'rgba(0,0,0,0.5)', marginTop: -100, padding: 15, height:100, width: width*.93, alignItems: 'center', alignContent: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20,}}>
            <View>
              <Text style = {{ fontSize: 32, fontWeight: 'bold', color: '#f8f8ff'}}>{card.name} {card.age}</Text> 
              <Text style = {{ fontSize: 20, color: '#f8f8ff', alignSelf: 'center'}}>{card.job}</Text>
            </View>  
        </View> 
        </View>
  ) : 
( 
 <View style = {{backgroundColor: "#28282B", height: '85%', borderTopLeftRadius: 20,
 borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center', justifyContent: 'center'}}> 
  <Text style={{fontWeight:"bold", color: '#f8f8ff', fontSize: 25, textAlign: 'center'}}> There's no one left to roast</Text>
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
    backgroundColor: '#231F20',    
  },  
   button: { 
    backgroundColor: '#28282B',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',    
    alignSelf: 'center',    
    marginBottom: 25,
  }, 
  buttonText: {
    color: '#f8f8ff',
    fontWeight: '700',
    fontSize: 16, 
    fontWeight: 'bold', 
  },  

});