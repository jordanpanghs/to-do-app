/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Tasks() {
  const [tasks, setTasks] = useState([{name: 'Task 1', completed: false}]);

  return (
    <View style={{justifyContent: 'center', alignContent: 'center', flex: 1}}>
      {tasks.map((task, index) => (
        <View key={index} style={styles.tasksContainer}>
          <View style={styles.tasks}>
            <View style={{}}>
              <Text>{task.name}</Text>
              <Text>{task.completed ? 'Completed' : 'Not Completed'}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  console.log('lmfao');
                }}>
                <Ionicons name="checkmark-outline" size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  console.log('lmfao');
                }}>
                <Ionicons name="trash-outline" size={30} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          setTasks([
            ...tasks,
            {
              name: `Task ${tasks.length + 1}`,
              description: 'New Task',
              completed: false,
            },
          ])
        }>
        <Ionicons name="add" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tasksContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasks: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 10,
  },
  button: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 25,
    right: 25,
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 10,
  },
});
