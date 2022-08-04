import { View, Text, Image } from 'react-native'
import React from 'react'

const ReceiverMessage = ({message}) => {
  return (
    <View 
    style={{ 
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 5,  
        marginBottom: 5, 
        marginLeft: 3,
        borderWidth: 2,  
        marginRight: -50,
        backgroundColor: 'black', 
        alignSelf: 'flex-start',  
        flexDirection: 'row',
    }}
    > 
    <Image 
       style={{height: 25, width: 25, borderTopLeftRadius: 50,
        borderTopRightRadius: 50, borderBottomLeftRadius: 50, borderBottomRightRadius: 50, marginRight: 10}} 
      source={{uri: message.photoURL}}
    />
      <Text style ={{fontWeight: 'bold', fontSize: 16, color: 'white'}}>{message.message}</Text>
    </View>
  )
}

export default ReceiverMessage