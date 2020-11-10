import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Amplify, { DataStore, Hub } from 'aws-amplify'
import { Todo } from './models'
import config from './aws-exports'
Amplify.configure(config)

Hub.listen('datastore', ({ payload }) => {
  console.log(payload.event, (payload.data || {}).element)
})

function App() {
  const [todo, setTodo] = useState()

  async function getTodo() {
    let todos = await DataStore.query(Todo)

    if (todos.length === 0) {
      await DataStore.save(new Todo({name: 'Initial'}))
      todos = await DataStore.query(Todo)
    }
    setTodo(todos[0])
  }

  async function changeTodoName() {
    ['A', 'B', 'C', 'D', 'E'].forEach((letter, index) => {
      setTimeout(((todo) => {
        DataStore.save(todo)
      }).bind(null, Todo.copyOf(todo, updated => {
        updated.name = `Title ${letter} ${new Date().toTimeString().substr(0, 8)}`
      })), 1000 * index)
    })
  }

  async function addTodo() {
    await DataStore.save(new Todo({name: 'Another Todo'}))
  }

  useEffect(() => {
    getTodo()

    const sub = DataStore.observe(Todo).subscribe(({ opType, element }) => {
      console.log('DEBUG', opType, element._lastChangedAt, new Date(element._lastChangedAt).toTimeString().substr(0, 8), element.name);
      getTodo()
    });

    return () => sub.unsubscribe()
  }, [])

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(todo, null, 2)}</Text>
      <StatusBar style="auto" />
      <Button title="Do Stuff" onPress={changeTodoName}>Do Stuff</Button>
      <Button title="Do Other Stuff" onPress={addTodo}>Do Other Stuff</Button>
    </View>
  );
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
