import { View, Text, Image, TouchableOpacity,StyleSheet,ImageBackground } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

const MatchedScreen = () => { 

    const navigation = useNavigation();
    const {params} = useRoute(); 

    const {userSwiped} = params; 
 
  return (
    <View style={styles.container}> 
      <Text style={{fontSize:40, color: "#f8f8ff", textAlign: "center", fontWeight: "bold"}}> 
        Describe your rating !
    </Text>   
    <ImageBackground style = {{height: 471, width: 300,  position: 'absolute'}} source={require('../assets/glow.png')}> 

    </ImageBackground>
    <Image style = {{height: 471, width: 300}} source={{uri: userSwiped.photoURL}} > 
    </Image>
        <Text style={{fontSize:40, color: "#f8f8ff", textAlign: "center", fontWeight: "bold"}}> 
        {(userSwiped.name).toUpperCase()} APPROACHES
    </Text>  
    <TouchableOpacity style={{width: '60%',padding: 15, borderRadius: 10, alignItems: 'center',  marginTop: 10, alignSelf: 'center', backgroundColor: '#f8f8ff'}}
        onPress={()=> {
            navigation.navigate("Homescreen")
            navigation.navigate("ChatScreen")
        }}
        > 
        <Text style={{fontWeight: '700', fontSize: 16, fontWeight: 'bold',}}>Chat</Text>
        </TouchableOpacity> 
    </View>
  )
}

export default MatchedScreen 

const styles = StyleSheet.create({ 
    container: {
      flex: 1, 
      opacity: 0.8,
      justifyContent: 'center',
      alignItems: 'center', 
      backgroundColor: '#B5838D',
    },  
})