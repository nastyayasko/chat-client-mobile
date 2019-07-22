import {StyleSheet} from 'react-native';

export const mainStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf0f1',
    },
    status: {
      fontSize: 25,
      textAlign: 'center',
      color: 'red',
    },
});
export const color = '#30d0fe';



export const socketObj = {
  agent: '-',
  pfx: '-',
  key: '-', // Using token-based auth.
  passphrase: '-', // Using cookie auth.
  cert: '-',
  ca: '-',
  ciphers: '-',
  rejectUnauthorized: '-',
  perMessageDeflate: '-'
};

export const iOSclientId = '191604032064-urrd7j2aof5grmkfvrhiark91lur0ere.apps.googleusercontent.com';
export const fbId = '385892928702080';
export const HOST = '192.168.0.217';