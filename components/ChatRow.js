import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native' 
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import { auth } from '../firebase'

const ChatRow = ({matchDetails}) => { 
    const navigation = useNavigation(); 
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);

    useEffect(()=> { 
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, auth.currentUser.uid))
    }, [matchDetails, auth.currentUser])

  return (
    <TouchableOpacity style={{flexDirection: 'row', height: 120, width: 510, backgroundColor: '#28282B'}}>
     <Image
     style={{height: 100, width: 100, margin: 10, borderTopLeftRadius: 50,
        borderTopRightRadius: 50, borderBottomLeftRadius: 50, borderBottomRightRadius: 50}} 
        source={{uri: matchedUserInfo?.photoURL}}
     />
    </TouchableOpacity>
  )
}

export default ChatRow