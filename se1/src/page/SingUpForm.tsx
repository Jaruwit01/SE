import React, { useState, useCallback } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

SplashScreen.preventAutoHideAsync();
const SignUpForm = () => {
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
const [confirmPasswordError, setConfirmPasswordError] = useState('');
const [passwordsMatch, setPasswordsMatch] = useState(false);





const [fontsLoaded] = useFonts({
'Kanit-Thin': require('C:\Users\jaruw\Desktop\n\SE\se1\assets\Kanit\Kanit-Black.ttf'),
'Kanit-Light': require('C:\Users\jaruw\Desktop\n\SE\se1/assets/font/Kanit/Kanit-Light.ttf'),
'Kanit-Regular': require('C:\Users\jaruw\Desktop\n\SE\se1/assets/font/Kanit/Kanit-Regular.ttf'),
'Kanit-Medium': require('C:\Users\jaruw\Desktop\n\SE\se1/assets/font/Kanit/Kanit-Medium.ttf'),
'Kanit-SemiBold': require('C:\Users\jaruw\Desktop\n\SE\se1/assets/font/Kanit/Kanit-SemiBold.ttf'),
'Kanit-Bold': require('C:\Users\jaruw\Desktop\n\SE\se1/assets/font/Kanit/Kanit-Bold.ttf'),
'Kanit-ExtraBold': require('C:\Users\jaruw\Desktop\n\SE\se1/assets/font/Kanit/Kanit-ExtraBold.ttf'),
'Kanit-Black': require('C:\Users\jaruw\Desktop\n\SE\se1/assets/font/Kanit/Kanit-Black.ttf'),
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
// Check if password meets the requirements
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

if (!passwordRegex.test(password)) {
setPasswordError('Password must be at least 8 characters, including one digit, one lowercase, and one uppercase letter.');
return;
}

// Check if password and confirm password match
if (password !== confirmPassword) {
setConfirmPasswordError('Passwords do not match.');
setConfirmPasswordBorderColor('orange');
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

// Reset the confirm password border color and error message
setConfirmPasswordBorderColor('gray');
setConfirmPasswordError('');
};

const showMode = (currentMode: React.SetStateAction<string>) => {
setShow(true);
setMode(currentMode);
};

const showDatePicker = () => {
showMode('date');
};

const hideDatePicker = () => {
setShow(false);
};

const handleChange = (_event: any, selectedDate: React.SetStateAction<Date> | undefined) => {
if (selectedDate !== undefined) {
setDateOfBirth(selectedDate);
setIsFormValid(!!selectedDate && !!email && !!password && !!confirmPassword && !!sex && !!dateOfBirth && !!name);


}
hideDatePicker();
};

return (
<View style={styles.container} onLayout={onLayoutRootView}>
<Text style={styles.title}>Create Account</Text>
<Text style={{ fontFamily: 'kanit-Thin', marginBottom: 20, fontWeight: 'bold', fontSize: 12, color: '#A0A0A0' }}>
Enter the fields below to target started{' '}
</Text>
<View style={styles.inputBox}>
<Text style={styles.labelTextInput} nativeID="Name">
Name
</Text>
<TextInput
style={styles.input}
value={name}
onChangeText={(text) => {
setName(text);
setIsFormValid(!!text && !!email && !!password && !!confirmPassword && !!sex && !!dateOfBirth && !!name);
}}
/>
</View>
<View style={styles.inputBox}>
<Text style={styles.labelTextInput}>Email</Text>
<TextInput
style={styles.input}
keyboardType="email-address"
autoCapitalize="none"
value={email}
onChangeText={(text) => {
setEmail(text);
setIsFormValid(!!text && !!email && !!password && !!confirmPassword && !!sex && !!dateOfBirth && !!name);
}}
/>
</View>
<View style={styles.inputBox}>
<Text style={styles.labelTextInput}>Password</Text>
<TextInput
style={[styles.input, { borderColor: passwordError ? 'red' : 'gray' }]}
secureTextEntry
value={password}
onChangeText={(text) => {
setPassword(text);
setPasswordError('');
setIsFormValid(!!text && !!email && !!password && !!confirmPassword && !!sex && !!dateOfBirth && !!name);
}}
onBlur={() => {
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
if (!passwordRegex.test(password)) {
setPasswordError(
    'Password must be at least 8 characters, including one digit, one lowercase, and one uppercase letter.'
);
} else {
setPasswordError('');
}
}}
/>
{passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
</View>
<View style={styles.inputBox}>
<Text style={styles.labelTextInput}>Confirm Password</Text>
<TextInput
style={[
styles.input,
{ borderColor: passwordsMatch ? 'green' : (confirmPasswordError ? 'orange' : 'gray')},
]}
secureTextEntry
value={confirmPassword}
onChangeText={(text) => {
setConfirmPassword(text);
setPasswordsMatch(false); // Reset the success message when the user is typing
setConfirmPasswordError('');
}}
onBlur={() => {
if ( password !== confirmPassword) {
setConfirmPasswordError('Passwords do not match.');
setPasswordsMatch(false);
} else {
setConfirmPasswordError('');
setPasswordsMatch(true);
}
}}
/>
{passwordsMatch ?(
<Text style={styles.successText}>Passwords match!</Text>
):null}
{confirmPasswordError ? (
<Text style={styles.focusText}>{confirmPasswordError}</Text>
) : null}


</View>


<View style={styles.Group_dropdown}>
<View style={styles.sex}>
<Text style={styles.labelTextInput}>Sex</Text>
<SelectDropdown data={Gender} onSelect={(selectedItem, index) => {setSex(selectedItem);
        setIsFormValid(!!selectedItem && !!email && !!password && !!confirmPassword && !!sex && !!dateOfBirth && !!name);
        }

} buttonStyle={styles.select_dropdown} />
</View>
<View style={styles.dateOfBirth}>
<Text style={styles.labelTextInput}>Date of Birth</Text>
<TouchableOpacity onPress={showDatePicker}>
<TextInput style={styles.select_dropdown} value={format(dateOfBirth, 'dd/MM/yyyy')} editable={false} />
</TouchableOpacity>

{show && (
<DateTimePicker
    testID="dateTimePicker"
    value={dateOfBirth}
    mode="date"
    is24Hour={true}
    display="default"
    onChange={handleChange}
/>
)}
</View>
</View>

<TouchableOpacity
onPress={handleSignUp}
style={[styles.submitButton, { backgroundColor: isFormValid ? '#0068C6' : '#57A8E8' }]}
disabled={!isFormValid}>
<Text style={styles.textButton}>CONTINUE</Text>
</TouchableOpacity>
</View>
);
}

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
marginBottom:0,
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
marginBottom: 0,
},
Group_dropdown: {
flexDirection: 'row',
flexWrap: 'nowrap',
justifyContent: 'space-between',
marginTop:8,
marginRight: 10,
},
select_dropdown: {
height: 40,
borderColor: 'gray',
borderWidth: 1,
borderRadius: 30,
backgroundColor: '#ffffff',
width: '90%',
textAlign: 'center',
fontSize: 13,
fontWeight: 'bold',
},
sex:{

width: '55%',
},

dateOfBirth:{
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
height: 2,
},
shadowOpacity: 1,
shadowRadius: 4,
elevation: 5,
},
errorText: {
color: 'red',
fontSize: 8,
marginTop: 0,
},
successText: {
color: 'green',
fontSize: 8,
marginTop: 0,
},
inputBox: {
marginBottom: 18,
},
focusText: {
color: 'orange',
fontSize: 8,
marginTop: 0,
},
});

export default SignUpForm;