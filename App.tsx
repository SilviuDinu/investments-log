import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import storage from './constants/storage';
// import { TextInput } from './components/Themed';

const getTokenFromStorage = async () => {
  return storage.load({
    key: 'authToken',
  });
};

let authUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.NEW_RECORD_URL || 'http://localhost:3000/auth'
    : 'http://192.168.1.210:3000/auth';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const tokenRef = useRef<string>();

  useEffect(() => {
    if (!isLoggedIn) {
      if (tokenRef.current && typeof tokenRef.current === 'string') {
        const token = tokenRef.current;
        console.log('authToken in useEffect', tokenRef.current);
        setIsLoggedIn(!!token);
      } else {
        getTokenFromStorage()
          .then((ret) => {
            tokenRef.current = ret.token;
            console.log('authToken in getTokenFromStorage', tokenRef.current);
            setIsLoggedIn(!!tokenRef.current);
          })
          .catch((err) => {
            throw new Error('user not found');
          });
      }
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    if (!password || !username) {
      return;
    }
    axios
      .post(authUrl, { username, password })
      .then((response: any) => {
        tokenRef.current = response.data.token;
        console.log('token from response', tokenRef.current);
        if (tokenRef.current) {
          storage
            .save({
              key: 'authToken',
              data: {
                token: tokenRef.current,
              },
              expires: 1000 * 3600,
            })
            .then((res: any) => {
              setIsLoggedIn(true);
            });
        }
      })
      .catch((err: any) => {
        console.error('AUTH error ', err);
      });
  };

  axios.interceptors.request.use(
    async function (config) {
      if (!config.url?.includes('auth')) {
        const { token } = await getTokenFromStorage();
        (config as any).headers.Authorization = token;
      }
      return config;
    },
    function (error) {
      // Do something with request error
      // console.log('error request interceptor', error, '===', error.status);
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      // console.log('error response interceptor', error, '===', error.error);
      if (isLoggedIn) {
        setIsLoggedIn(false);
        tokenRef.current = '';
        storage.remove({ key: 'authToken' });
      }
      return Promise.reject(error);
    }
  );

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <Modal animationType="slide" transparent={false} visible={!isLoggedIn}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Login</Text>
              <TextInput
                style={{
                  height: 40,
                  width: '100%',
                  // paddingHorizontal: 12,
                  paddingVertical: 8,
                  textAlign: 'center',
                  borderColor: '#000',
                  borderBottomWidth: 1,
                }}
                value={username}
                onChangeText={setUsername}></TextInput>
              <TextInput
                style={{
                  height: 40,
                  width: '100%',
                  // paddingHorizontal: 12,
                  paddingVertical: 8,
                  textAlign: 'center',
                  borderColor: '#000',
                  borderBottomWidth: 1,
                }}
                value={password}
                onChangeText={setPassword}></TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose, { marginTop: 16 }]}
                onPress={handleLogin}>
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: 320,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
