import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native'

import Amplify, { Auth, Hub } from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

Hub.listen('auth', console.log)

function App() {
  const [testText, setTestText] = useState('Initial state')

  async function doStuff() {
    setTestText('Next state')
    await Auth.signOut()
  }

  return (
    <View style={styles.container}>
      <Text>{testText}</Text>
      <StatusBar style="auto" />
      <Button title="Do Stuff" onPress={doStuff}>Do Stuff</Button>
    </View>
  );
}

export default withAuthenticator(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
