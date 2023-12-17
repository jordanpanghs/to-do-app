/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
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
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://10.0.2.2:5000/api/todos/get')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error(error));
  }, []);

  const handleAddTask = () => {
    const newTask = {
      task_name: `Task ${tasks.length + 1}`,
      completed: false,
    };

    fetch('http://10.0.2.2:5000/api/todos/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then(response => response.json())
      .then(data => {
        setTasks([...tasks, data]);
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleUpdateTask = (id, index) => {
    const updatedTasks = [...tasks];

    const updateTaskBody = {
      task_name: updatedTasks[index].task_name,
      completed: updatedTasks[index].completed,
    };

    fetch(`http://10.0.2.2:5000/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateTaskBody),
    })
      .then(response => {
        if (response.ok) {
          setTasks(updatedTasks);
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDeleteTask = (id, index) => {
    fetch(`http://10.0.2.2:5000/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          const updatedTasks = [...tasks];
          updatedTasks.splice(index, 1);
          setTasks(updatedTasks);
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
      .catch(error => console.error('Error:', error));
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
                  value={task.task_name}
                  onChangeText={text => {
                    const updatedTasks = [...tasks];
                    updatedTasks[index].task_name = text;
                    setTasks(updatedTasks);
                  }}
                  onBlur={() => handleUpdateTask(task.id, index)}
                />

                <Text style={styles.taskStatusText}>
                  {task.completed ? 'Completed' : 'Not Completed'}
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() => {
                    const updatedTasks = [...tasks];
                    updatedTasks[index].completed =
                      !updatedTasks[index].completed;
                    setTasks(updatedTasks);
                    handleUpdateTask(task.id, index);
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
                    handleDeleteTask(task.id, index);
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
