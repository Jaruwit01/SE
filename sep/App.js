import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SignUpForm from './component/SignUpFrom';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>good</Text>
      <SignUpForm></SignUpForm>
      <StatusBar style="auto" />
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
