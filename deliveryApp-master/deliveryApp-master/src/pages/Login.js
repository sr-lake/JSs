import React, { useState, useEffect } from 'react';
import {
  View,
  AsyncStorage,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { CommonActions } from '@react-navigation/native';

import api from '../services/api';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView enabled={Platform.OS == 'ios'} behavior="padding" style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.header}>Login</Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="username"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('List');
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}
          style={styles.registerButton}
        >
          <Text style={styles.registerText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30
  },

  header: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 50,
    paddingLeft: 18,
    fontSize: 32,
    fontFamily: ''
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    paddingLeft: 18,
    fontSize: 16
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#444',
    height: 64,
    marginBottom: 20,
    borderRadius: 10
  },

  button: {
    height: 62,
    backgroundColor: '#e0414e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },

  buttonText: {
    color: '#FFF',
    fontFamily: '',
    fontWeight: 'bold',
    fontSize: 18
  },

  registerButton: {
    marginTop: 20,
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 5
  },

  registerText: {
    color: '#1565c0',
    fontFamily: '',
    fontWeight: 'bold',
    fontSize: 18
  }
});
