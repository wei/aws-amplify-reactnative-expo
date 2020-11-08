import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

export default function App() {
  const [testText, setTestText] = useState('Initial state')

  async function doStuff() {
    setTestText('Next state')
  }

  return (
    <View style={styles.container}>
      <Text>{testText}</Text>
      <StatusBar style="auto" />
      <Button title="Do Stuff" onPress={doStuff}>Do Stuff</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
