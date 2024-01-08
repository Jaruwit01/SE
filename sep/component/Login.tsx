import React from 'react';
import { View, Button, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const LoginScreen = () => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      // ตรวจสอบข้อมูลผู้ใช้ที่ได้จาก Google แล้วทำการเข้าสู่ระบบหรือดำเนินการต่อตามที่คุณต้องการ
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // ผู้ใช้ยกเลิกการเข้าสู่ระบบ
        console.log('User cancelled the login process');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // มีการดำเนินการเข้าสู่ระบบอยู่ในขณะนี้
        console.log('Sign in is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play Services ไม่พร้อมให้บริการ
        console.log('Play Services not available');
      } else {
        console.error('Error during Google login:', error.message);
      }
    }
  };

  return (
    <View>
      <Button title="Sign in with Google" onPress={signIn} />
    </View>
  );
};

export default LoginScreen;
