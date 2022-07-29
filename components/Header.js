import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react' 
import {Ionicons} from "@expo/vector-icons"; 
import {useNavigation} from '@react-navigation/core'   
import { auth } from '../firebase'

const Header = ({title}) => { 
    const navigation = useNavigation();  

    const back = () => { 
        navigation.replace("Homescreen")
      } 

  return (
    <View style={styles.container}>  
    <TouchableOpacity onPress={back} style={{alignSelf: 'flex-start'}} >
       <Ionicons 
      name = "arrow-back" size = {50} color = '#f8f8ff'
      style = {{marginLeft: 20,  
        marginTop: 30,}} 
      />
     </TouchableOpacity>    
     
     <Text numberOfLines={1} style={{fontSize:40, color: "#f8f8ff", marginTop: 27,fontWeight: "bold", flex: 1}}>{(auth.currentUser?.email).split("@")[0]}</Text>  
     <Text>                   </Text>   
      
    </View> 
  )
}

export default Header 

const styles = StyleSheet.create({
    container: { 
      padding: 2,  
      flexDirection: "row", 
      justifyContent:'space-between', 
      alignItems: 'center'
    },  
  })