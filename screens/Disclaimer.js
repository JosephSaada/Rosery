import React from 'react' 
import {View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView} from 'react-native'; 
import {useNavigation} from '@react-navigation/core' 
import { auth } from '../firebase'  
import {Ionicons} from "@expo/vector-icons";   
import Footer from '../components/Footer';
import { BannerAd, TestIds, BannerAdSize } from 'react-native-google-mobile-ads';  

const Disclaimer = () => {     

  const adUnitId = (Platform.OS === 'ios') ? 'ca-app-pub-8819301922359044/7610536058' : 'ca-app-pub-8819301922359044/6680597761'; 

  const navigation = useNavigation();  

  const back = () => { 
    navigation.replace("Homescreen")
  }  

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("LoginScreen")
      })
      .catch(error => alert(error.message))
  } 

  return (      
    <View style={styles.container}>    
<ScrollView>   
  <View style={{flexDirection:"row", justifyContent:'space-between'}}>
    <TouchableOpacity onPress={back} style={{alignSelf: 'flex-start'}} >
       <Ionicons 
      name = "arrow-back" size = {50} color = '#f8f8ff'
      style = {{  
        marginLeft: 20,  
        marginTop: 27,  
      }} 
      />
     </TouchableOpacity>      
    
     </View> 
     
    <Text style={{fontSize:40, color: "#f8f8ff", textAlign: "center", marginTop: -20, marginBottom: 10, fontWeight: "bold"}}> 
        Information
    </Text>
    <Text style={{fontSize:20, color: "#f8f8ff", textAlign: "center", marginBottom: -45}}>
        Privacy Policy: Be nice and have fun! {'\n \n'} 
        Terms and Condtions: uhhh same thing as above {'\n \n'} 
        <Text style={{fontWeight: "bold",fontSize: 40 }}> Credits:</Text> {'\n \n'} 
        <Text style={{fontWeight: "bold"}}> Devolper:</Text>{'\n \n'}  Joseph Saada {'\n \n'}  
        <Text style={{fontWeight: "bold"}}> Assistant Director:</Text> {'\n \n'} God {'\n \n'}   
        <Text style={{fontWeight: "bold"}}> Assistant to Assistant Director:</Text> {'\n \n'} Jesus Christ {'\n \n'}  
        
        </Text>  

     <TouchableOpacity
       onPress={() => navigation.navigate("Modal")}
       style={styles.button}
     >
       <Text style={styles.buttonText}>Edit Profile</Text>
     </TouchableOpacity>  

     <TouchableOpacity
       onPress={handleSignOut}
       style={[styles.button, styles.buttonOutline]}
     >
       <Text style={styles.buttonOutlineText}>Sign out</Text>
     </TouchableOpacity> 
    </ScrollView>    
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
     <BannerAd 
      unitId={TestIds.BANNER}  
      size={BannerAdSize.FULL_BANNER}  
      requestOptions={{ 
        requestNonPersonalizedAdsOnly: true,
      }} 
      onAdFailedToLoad={error => console.log(error)}
      /> 
      </View>
    <Footer> </Footer>
    </View> 
  )
}

export default Disclaimer 

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    resizeMode: 'contain',
    backgroundColor: '#B5838D',      
  },  
   button: { 
    backgroundColor: '#E5989B',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center', 
    marginTop: 20,   
    alignSelf: 'center',    
  }, 
  buttonText: {
    color: '#f8f8ff',
    fontWeight: '700',
    fontSize: 16, 
    fontWeight: 'bold', 
  },  
  buttonOutline: {
    backgroundColor: '#F8F0E3',
    marginTop: 7,
    borderColor: '#E5989B',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: '#B5838D',
    fontWeight: '700',
    fontSize: 16, 
    fontWeight: 'bold',
  }, 
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
})