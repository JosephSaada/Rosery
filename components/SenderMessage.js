import { View, Text } from 'react-native'
import React from 'react' 
import moment from "moment";

const SenderMessage = ({message}) => { 

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
        marginRight: 5,
        backgroundColor: '#f8f8ff', 
        alignSelf: 'flex-start', 
        marginLeft: 'auto'
    }}
    >
      <Text style ={{fontWeight: 'bold', fontSize: 16, color: 'black', textAlign: 'right'}}>
        {message.message}
        </Text>  
        
        <Text style={{fontSize: 10, textAlign: 'right'}}>
          {message.timestamp ? moment((message.timestamp).toDate()).format("LT") : "..."}
        </Text>
    </View>
  )
}

export default SenderMessage