import React, {View, Text} from 'react-native';

import Tasks from './components/Tasks';

export default function App() {
  return (
    <View style={{justifyContent:'center', alignContent:'center', height: '100%'}}>
      <Text>Hello World</Text>
      <Tasks />
    </View>
  );
}

