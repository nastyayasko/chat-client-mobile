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
  // timeout: 10000,
  // jsonp: false,
  // transports: ['websocket'],
  // autoConnect: false,
  agent: '-',
  path: '/', // Whatever your path is
  pfx: '-',
  key: '', // Using token-based auth.
  passphrase: '', // Using cookie auth.
  cert: '-',
  ca: '-',
  ciphers: '-',
  rejectUnauthorized: '-',
  perMessageDeflate: '-'
};