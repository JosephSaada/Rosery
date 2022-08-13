import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import ChatRow from '../components/ChatRow'; 


const ChatList = () => { 
    const [matches, setMatches] = useState([]);

    useEffect(()=>
        onSnapshot(query(collection(db, 'matches'), where('usersMatched', 'array-contains', auth.currentUser.uid)), 
        (snapshot) => setMatches(snapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data(),
        })))
        )
    , [auth.currentUser])

  return matches.length > 0 ? ( 
        <FlatList 
        style={{height: '100%'}}
        data={matches}  
        keyExtractor={(item) => item.id}  
        renderItem={ ({item}) => (
        <ChatRow matchDetails={item}/>)}
        /> 
        ) : (
        <Text></Text>
        );
}

export default ChatList