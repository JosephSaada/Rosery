import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native' 
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import { auth, db } from '../firebase'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'

const ChatRow = ({matchDetails}) => { 
    const navigation = useNavigation(); 
    const [matchedUserInfo, setMatchedUserInfo] = useState(null); 
    const [lastMessage, setLastMessage] = useState('')

    useEffect(()=> { 
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, auth.currentUser.uid))
    }, [matchDetails, auth.currentUser]) 

    useEffect(()=> onSnapshot(
      query(collection(db, 'matches', matchDetails.id, 'messages'), 
      orderBy('timestamp', 'desc'),  
      limit(1)
    ), snapshot => setLastMessage(snapshot.docs[0]?.data()?.message)
    
    ), [matchDetails, db])

  return (
    <TouchableOpacity style={{flexDirection: 'row', height: 120, width: 510, backgroundColor: 'transparent', margin: 10}}
    onPress={()=>navigation.navigate('Message', {matchDetails})}
    >
     <Image
     style={{height: 100, width: 100, margin: 10, borderTopLeftRadius: 50,
        borderTopRightRadius: 50, borderBottomLeftRadius: 50, borderBottomRightRadius: 50}} 
        source={{uri: matchedUserInfo?.photoURL}}
     /> 
     <View>
     <Text style={{fontSize:30, color: "#f8f8ff",fontWeight: "bold", margin: 10}}>
        {matchedUserInfo?.name}
     </Text> 
     <Text style={{fontSize:20, color: "#f8f8ff", marginLeft: 15}} numberOfLines={1}>{lastMessage || "Start the roast"}</Text> 
     </View>
    </TouchableOpacity> 

  )
}

export default ChatRow