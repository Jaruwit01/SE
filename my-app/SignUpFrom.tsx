import React, { useState, useCallback } from 'react';
import { View, TextInput, StyleSheet, Platform , Text, TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DatePickerIOS } from 'react-native-datepicker';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sex, setSex] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const handleSignUp = () => {
    // Perform sign-up logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('Sex:', sex);
    console.log('Date of Birth:', dateOfBirth);

    // Reset the form after submission if needed
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setSex('');
    setDateOfBirth(new Date());
  };
  return (
    <View style={styles.container}>
        
        <Text style={styles.title}>Create Account</Text>

        <Text style={styles.labelTextInput}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
        <Text style={styles.labelTextInput}>Email</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.labelTextInput}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
        <Text style={styles.labelTextInput}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Picker
        style={styles.input}
        selectedValue={sex}
        onValueChange={(itemValue) => setSex(itemValue)}
      >
        <Picker.Item label="Select Gender" value=""/>
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
      {Platform.OS === 'ios' ? (
        <DatePickerIOS
          style={styles.input}
          date={dateOfBirth}
          onDateChange={(date) => setDateOfBirth(date)}
        />
      ) : null}
<TouchableOpacity onPress={handleSignUp} style={styles.submitButton}>
  <Text style={styles.textButton}>CONTINUE</Text>
</TouchableOpacity>
    </View>
      );
};
``
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: '100%',
    marginTop: 50,
    
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 30,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#0068C6',
    padding: 10,
    margin: 15,
    borderRadius: 30,
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    
  },
  labelTextInput: {
    fontSize:8,
    color: '#A0A0A0',
    fontWeight: 'bold',
  },
});

export default SignUpForm;
