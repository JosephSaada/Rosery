import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {View, Text, Button,TouchableOpacity, StyleSheet, Image, Platform, StatusBar} from 'react-native'; 
import {useNavigation} from '@react-navigation/core' 
import { auth } from '../firebase'
import {Ionicons, AntDesign, Entypo} from "@expo/vector-icons"; 
import Swiper from 'react-native-deck-swiper'; 
import {BoxShadow} from 'react-native-shadow'
import { onSnapshot, doc, collection, getDocs, setDoc, query, where } from '@firebase/firestore'; 
import {db} from "../firebase"; 
import { async } from '@firebase/util';

const Homescreen = () => { 
    const navigation = useNavigation();  
    const [profiles, setProfiles] = useState([]); 

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
 
    const handleChat = () => { 
      navigation.replace("ChatScreen")
    } 

    const handleDisclaimer = () => { 
      navigation.replace("Disclaimer")
    }

    const shadowOpt = {
      width: 485, // 485
      height: 100,
      color:"#000",
      border:2,
      radius:30,
      opacity:0.2,
      x:1,
      y:3, 
    } 

    const swipeLeft = (cardIndex) => { 
      if (!profiles[cardIndex]) return; 
      const userSwiped = profiles[cardIndex]; 
      setDoc(doc(db, 'users', auth.currentUser.uid, 'passes', userSwiped.id), userSwiped)
    }
    const swipeRight = async(cardIndex) => { 
      if (!profiles[cardIndex]) return; 
      const userSwiped = profiles[cardIndex]; 
      setDoc(doc(db, 'users', auth.currentUser.uid, 'swipes', userSwiped.id), userSwiped)
    }

  return ( 
     <View style={styles.container}>   

      <View style={{flexDirection:"row", justifyContent:'space-between'}} >
      <TouchableOpacity onPress={handleDisclaimer}> 
      <Image  
      source={require('../assets/Gamo3.png')} 
      style = {{
        width: 75,
        height: 75,  
        marginTop: 25, 
        marginLeft: 20,
      }}  
      />
    </TouchableOpacity>   

    <TouchableOpacity onPress={handleChat}> 
      <Ionicons 
      name = "chatbubble-sharp" size = {50} color = '#f8f8ff'
      style = {{ 
        marginTop: 40,  
        marginRight: 30, 
      }}
     /> 
    </TouchableOpacity>   

    </View>
     <Text style={{textAlign: 'center', color:'#f8f8ff', fontSize: 25}}>User: {(auth.currentUser?.email).split("@")[0]} </Text>


     <View style = {{flex: 1, marginTop: -45}}> 
      <Swiper  
      //ref = {swiperef}
      containerStyle={{backgroundColor: "transparent"}}
      //cards = {DUMMY_DATA}  
      cards = {profiles}  
      stackSize={5} 
      cardIndex={0}  
      animateCardOpacity 
      verticalSwipe={false}   
      onSwipedLeft={(cardIndex)=> { 
        console.log('left'); 
        swipeLeft(cardIndex);
      }} 
      onSwipedRight={(cardIndex)=> { 
        console.log('right'); 
        swipeRight(cardIndex);
      }} 
      overlayLabels={{ 
        left:{ 
           title: "NAH", 
           style: { 
            label: { 
              textAlign: "right", 
              color: "black",
            },
           },
        },  
        right: { 
          title: "ROAST", 
          style: { 
            label: { 
              textAlign: "left", 
              color: "white",
            }
          }
        }
      }}
      renderCard={(card) => card ? (
        <View key = {card.id} style = {{backgroundColor: "#28282B", height: '80%', borderTopLeftRadius: 20,
        borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
          <Image style = {{height: 775, borderTopLeftRadius: 20,
        borderTopRightRadius: 20}} source={{uri: card.photoURL}}/>    
<BoxShadow setting={shadowOpt}>
        <View style={{backgroundColor: '#28282B',  padding: 15, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: 100, textAlign: 'center', flexDirection:"row", justifyContent:'space-between'}}>
            <View>
              <Text style = {{ fontSize: 32, fontWeight: 'bold', color: '#f8f8ff'}}>{card.name}</Text>
              <Text style = {{ fontSize: 20, color: '#f8f8ff'}}>{card.job}</Text>
            </View>  
            <Text style={{fontSize: 40, fontWeight: 'bold', color: '#f8f8ff'}}>{card.age}</Text>
        </View> 
</BoxShadow> 
        </View>
  ) : 
( 
 <View style = {{backgroundColor: "#28282B", height: '90%', borderTopLeftRadius: 20,
 borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center', justifyContent: 'center'}}> 
  <Text style={{fontWeight:"bold", color: '#f8f8ff', fontSize: 25, textAlign: 'center'}}> There's no one left to roast</Text>
  </View>  
)}
      />
      </View>    
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
    color: 'white',
    fontWeight: '700',
    fontSize: 16, 
    fontWeight: 'bold', 
  },   
});