import React from 'react'; 
import StackNavigator from './StackNavigator'; 
import {NavigationContainer} from '@react-navigation/native';   
import { LogBox } from "react-native";

export default function App() {  
  LogBox.ignoreLogs(["EventEmitter.removeListener"]); 
  return (    
    <NavigationContainer>    
     <StackNavigator />
    </NavigationContainer>
  );
}
