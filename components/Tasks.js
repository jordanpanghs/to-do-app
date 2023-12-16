/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Tasks() {
  const [tasks, setTasks] = useState([{name: 'Task 1', completed: false}]);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      {
        name: `Task ${tasks.length + 1}`,
        completed: false,
      },
    ]);
    setIsEditing(true);
  };

  const handleUpdateTask = index => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = index => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <>
      <ScrollView style={{flex: 1}}>
        {tasks.map((task, index) => (
          <View key={index} style={styles.tasksContainer}>
            <View
              style={[
                styles.tasks,
                task.completed
                  ? {backgroundColor: 'lightgreen'}
                  : {backgroundColor: 'lightcoral'},
              ]}>
              <View style={styles.textContainer}>
                <TextInput
                  style={styles.taskNameText}
                  value={task.name}
                  onChangeText={text => {
                    const updatedTasks = [...tasks];
                    updatedTasks[index].name = text;
                    setTasks(updatedTasks);
                  }}
                />

                <Text style={styles.taskStatusText}>
                  {task.completed ? 'Completed' : 'Not Completed'}
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() => {
                    handleUpdateTask(index);
                  }}>
                  {task.completed ? (
                    <Ionicons name="close-outline" size={30} color="red" />
                  ) : (
                    <Ionicons
                      name="checkmark-outline"
                      size={30}
                      color="green"
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleDeleteTask(index);
                  }}>
                  <Ionicons name="trash-outline" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => handleAddTask()}>
        <Ionicons name="add" size={30} color="black" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  tasksContainer: {
    width: 'auto',
    flexDirection: 'row',
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
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskNameText: {
    textAlign: 'center',
    width: '80%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  taskStatusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconContainer: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
