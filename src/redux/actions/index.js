import axios from 'axios';
import { HOST } from '../../constants'

export const saveUser = email => ({ type: 'SAVE_USER', payload: email });
export const deleteUser = () => ({ type: 'DELETE_USER' });

export const setLoginStatus = status => ({ type: 'SET_LOGINSTATUS', payload: status });
export const deleteLoginStatus = () => ({ type: 'DELETE_LOGINSTATUS' });

export const setCurrentDialog = dialog => ({ type: 'SET_CURRENT_DIALOG', payload: dialog });
export const addMessage = message => ({ type: 'ADD_MESSAGE', payload: message });

export const createConnection = socket => ({ type: 'CREATE_CONNECTION', payload: socket });
export const deleteConnection = () => ({ type: 'DELETE_CONNECTION'});


const getUsersSuccess = users => ({ type: 'GET_USERS_SUCCESS', payload: users });

export const getUsers = () => (dispatch) => {
  axios(`http://${HOST}:3020/api/all-users`)
    .then(({ data }) => dispatch(getUsersSuccess(data)))
    .catch(error => dispatch(console.log(error)));
};

const getDialogsSuccess = users => ({ type: 'GET_DIALOGS_SUCCESS', payload: users });

export const getDialogs = id => (dispatch) => {
  axios(`http://${HOST}:3020/api/dialogs/${id}`)
    .then(({ data }) => dispatch(getDialogsSuccess(data)))
    .catch(error => dispatch(console.log(error)));
};

const loginSuccess = users => ({ type: 'LOGIN_SUCCESS', payload: users });

export const login = user => (dispatch) => {
  axios.post(`http://${HOST}:3020/api/log-in`, user)
    .then(({ data }) => dispatch(loginSuccess(data)))
    .catch(error => dispatch(console.log(error)));
};

const authSuccess = users => ({ type: 'AUTH_SUCCESS', payload: users });

export const auth = user => (dispatch) => {
  axios.post(`http://${HOST}:3020/api/auth`, user)
    .then(({ data }) => dispatch(authSuccess(data)))
    .catch(error => dispatch(console.log(error)));
};

const signUpSuccess = users => ({ type: 'SIGNUP_SUCCESS', payload: users });

export const signUp = (user, file) => (dispatch) => {
  const currentUser = new FormData();
  currentUser.append('email', user.email);
  currentUser.append('firstName', user.firstName);
  currentUser.append('lastName', user.lastName);
  currentUser.append('password', user.password);
  if (file) {
    currentUser.append('file', file, file.name);
  }
  axios.post(`http://${HOST}:3020/api/sign-up`, currentUser)
    .then(({ data }) => dispatch(signUpSuccess(data)))
    .catch(error => dispatch(console.log(error)));
};

const getMessagesSuccess = users => ({ type: 'GET_MESSAGES_SUCCESS', payload: users });

export const getMessages = id => (dispatch) => {
  axios(`http://${HOST}:3020/api/messages/${id}`)
    .then(({ data }) => dispatch(getMessagesSuccess(data)))
    .catch(error => dispatch(console.log(error)));
};

const createDialogSuccess = dialog => ({ type: 'CREATE_DIALOG_SUCCESS', payload: dialog });

export const createDialog = dialog => (dispatch) => {
  axios.post(`http://${HOST}:3020/api/dialogs`, dialog)
    .then(({ data }) => dispatch(createDialogSuccess(data)))
    .catch(error => dispatch(console.log(error)));
};