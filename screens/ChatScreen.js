import React from 'react'
import {View, StyleSheet, Platform} from 'react-native'; 
import Header from '../components/Header'; 
import ChatList from '../components/ChatList';
import Footer from '../components/Footer'; 
import { BannerAd, TestIds, BannerAdSize } from 'react-native-google-mobile-ads'; 


const ChatScreen = () => {   
  const adUnitId = Platform.OS === 'ios' ? 'ca-app-pub-8819301922359044/7610536058' : 'ca-app-pub-8819301922359044/6680597761';

  return (   
    <View style={styles.container}>  
     <Header> </Header>  
     <ChatList />    
     <View style={{alignItems: 'center', justifyContent: 'center'}}>
     <BannerAd 
      unitId={adUnitId}  
      size={BannerAdSize.FULL_BANNER}  
      requestOptions={{ 
        requestNonPersonalizedAdsOnly: true,
      }} 
      onAdFailedToLoad={error => console.log(error)}
      /> 
      </View>
    <Footer></Footer>    
    </View>
  )
}

export default ChatScreen 

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    resizeMode: 'contain',
    backgroundColor: '#B5838D',  
  },  
   button: { 
    backgroundColor: '#28282B',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center', 
    marginTop: 40,   
    alignSelf: 'center',   
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16, 
    fontWeight: 'bold', 
  }, 
})