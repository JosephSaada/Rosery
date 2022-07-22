import { View, Text } from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import Homescreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import Disclaimer from './screens/Disclaimer'; 
import ModalScreen from './screens/ModalScreen'; 
import MatchedScreen from './screens/MatchedScreen'

const Stack = createNativeStackNavigator();

const StackNavigator = () => {  
  return (    
    <Stack.Navigator screenOptions={{headerShown: false}}>    
    <Stack.Screen name="LoginScreen" component={LoginScreen} /> 
    <Stack.Screen name="Homescreen" component={Homescreen} /> 
    <Stack.Screen name="ChatScreen" component={ChatScreen} />  
    <Stack.Screen name="Disclaimer" component={Disclaimer} />  
    <Stack.Group screenOptions={{presentation: "modal"}}>
    <Stack.Screen name="Modal" component={ModalScreen} /> 
    </Stack.Group> 
    <Stack.Group screenOptions={{presentation: "transparentModal"}}>
    <Stack.Screen name="Match" component={MatchedScreen} /> 
    </Stack.Group>
    </Stack.Navigator>  
  );
}

export default StackNavigator