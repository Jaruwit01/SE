import React, { useState, useCallback } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import DatePicker from 'react-native-datepicker';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';


SplashScreen.preventAutoHideAsync();
export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordBorderColor, setConfirmPasswordBorderColor] = useState('gray');
  const [sex, setSex] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);




  const [fontsLoaded] = useFonts({
    'Kanit-Thin': require('../assets/font/Kanit/Kanit-Thin.ttf'),
    'Kanit-Light': require('../assets/font/Kanit/Kanit-Light.ttf'),
    'Kanit-Regular': require('../assets/font/Kanit/Kanit-Regular.ttf'),
    'Kanit-Medium': require('../assets/font/Kanit/Kanit-Medium.ttf'),
    'Kanit-SemiBold': require('../assets/font/Kanit/Kanit-SemiBold.ttf'),
    'Kanit-Bold': require('../assets/font/Kanit/Kanit-Bold.ttf'),
    'Kanit-ExtraBold': require('../assets/font/Kanit/Kanit-ExtraBold.ttf'),
    'Kanit-Black': require('../assets/font/Kanit/Kanit-Black.ttf'),

  });
  const Gender = ['Mail', 'Femail', 'Orther'];
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleSignUp = () => {
    // Check if all required fields are filled
    if (!name || !email || !password || !confirmPassword || !sex || !dateOfBirth) {
      console.log('Please fill in all required fields');
      // You can show an error message or handle it in a way that suits your UI/UX
      return;
    }

    // Check if password meets the requirements
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters, including one digit, one lowercase, and one uppercase letter.');
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      console.log('Password and Confirm Password do not match');
      // You can show an error message or handle it in a way that suits your UI/UX
      setConfirmPasswordBorderColor('red');
      return;
    }

    // Perform sign-up logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('Sex:', sex);
    console.log('Date of Birth:', format(dateOfBirth, 'dd/MM/yyyy'));

    // Reset the form after submission if needed
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setSex('');
    setDateOfBirth(new Date());

    // Reset the confirm password border color
    setConfirmPasswordBorderColor('gray');

    // Reset isFormValid to disable the "CONTINUE" button
    setIsFormValid(false);
  };


  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const hideDatePicker = () => {
    setShow(false);
  };
  const handleChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      setDateOfBirth(selectedDate);
    }
    hideDatePicker();
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>

      <Text style={styles.title}>Create Account</Text>
      <Text style={{ fontFamily: 'kanit-Thin', marginBottom: 20, fontWeight: 'bold', fontSize: 12, color: '#A0A0A0' }}>Enter the fields below to target started </Text>

      <Text style={styles.labelTextInput} nativeID='Name'>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => {
          setName(text);
          setIsFormValid(!!text && !!email && !!password && !!confirmPassword && !!sex && !!dateOfBirth);
        }}
      />
      <Text style={styles.labelTextInput}>Email</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setIsFormValid(!!text && !!email && !!password && !!confirmPassword && !!sex && !!dateOfBirth);
        }
        }

      />
      <Text style={styles.labelTextInput}>Password</Text>
      <TextInput
        style={[styles.input, { borderColor: passwordError ? 'red' : 'gray' }]}
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setPasswordError('');
          setIsFormValid(!!text && !!email && !!password && !!confirmPassword && !!sex && !!dateOfBirth);
        }}
        onBlur={() => {
          const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
          if (!passwordRegex.test(password)) {
            setPasswordError('Password must be at least 8 characters, including one digit, one lowercase, and one uppercase letter.');
          } else {
            setPasswordError('');
          }
        }}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <Text style={styles.labelTextInput}>Confirm Password</Text>
      <TextInput
        style={[styles.input, { borderColor: confirmPasswordBorderColor }]}
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          setIsFormValid(!!text && !!email && !!password && !!confirmPassword && !!sex && !!dateOfBirth);
        }}
        onBlur={() => {
          setConfirmPasswordBorderColor(password === confirmPassword && password !== '' && confirmPassword !== '' ? 'green' : 'red');

        }}
      />

      <View style={styles.Group_dropdown}>
        <View style={styles.dropdown} >
          <Text style={styles.labelTextInput} >Sex</Text>
          <SelectDropdown
            data={Gender}
            onSelect={(selectedItem, index) => {
              setSex(selectedItem)
            }}
            buttonStyle={styles.select_dropdown}
          />
        </View>
        <View style={styles.dropdown}>
          <Text style={styles.labelTextInput}>Date of Birth</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              style={styles.select_dropdown}
              value={format(dateOfBirth, 'dd/MM/yyyy')}
              editable={false}


            />
          </TouchableOpacity>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateOfBirth}
              mode='date'
              is24Hour={true}
              display="default"
              onChange={handleChange}
            />
          )}
        </View>

      </View>


      <TouchableOpacity onPress={handleSignUp}
        style={[styles.submitButton, { backgroundColor: isFormValid ? '#0068C6' : '#A0A0A0' }]}
        disabled={!isFormValid}>
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
    backgroundColor: '#ffffff',


  },
  title: {
    fontSize: 18,
    marginBottom: 5,
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
    fontSize: 16,
    fontFamily: 'Kanit-Thin',
  },
  labelTextInput: {
    fontFamily: 'Kanit-Thin',
    fontSize: 12,
    color: '#A0A0A0',
    fontWeight: 'bold',

  },

  Group_dropdown: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    padding: 5,

  },
  select_dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    width: "90%",
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 'bold',
  },
  dropdown: {
    padding: 10,
    width: '55%',
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '90%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 6,
    marginTop: 0,
  },

});

