import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [User, setUsername] = useState('');
  const [Pass2, setPassword2] = useState('');
  const [Pass, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (User === '' || Pass === '' || Pass2 === '') {
      setLoginError('Vui lòng nhập đầy đủ tên người dùng và mật khẩu');
    } else if (Pass !== Pass2) {
      setLoginError('Vui lòng nhập password giống nhau');
    } else {
      try {
        const response = await fetch('https://654468f65a0b4b04436c5590.mockapi.io/Login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            User: User,
            Pass: Pass,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Login response:', data);

        navigation.navigate('LINKEDIN');

        setLoginError('');
      } catch (error) {
        setLoginError('Đăng ký không thành công');
        console.error('Login error:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join LinkedIn now — it’s free!</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={User}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={Pass}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập Lại Password"
        value={Pass2}
        onChangeText={(text) => setPassword2(text)}
        secureTextEntry
      />
      <Text style={{ color: 'red', fontSize: 15 }}>{loginError}</Text>

      <Button title="Sign Up" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: 300,
    borderRadius: 5,
  },
});

export default LoginScreen;
