import React, {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tasks from './components/Tasks';

export default function App() {
  return (
    <NavigationContainer>{
      <View style={{flex: 1}}>
       <Tasks />
       </View>
  }</NavigationContainer>
  );
}