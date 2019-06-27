import axios from 'axios';

export const saveUser = email => ({ type: 'SAVE_USER', payload: email });
export const deleteUser = () => ({ type: 'DELETE_USER' });

export const setLoginStatus = status => ({ type: 'SET_LOGINSTATUS', payload: status });
export const deleteLoginStatus = () => ({ type: 'DELETE_LOGINSTATUS' });

export const setCurrentDialog = dialog => ({ type: 'SET_CURRENT_DIALOG', payload: dialog });

export const createConnection = socket => ({ type: 'CREATE_CONNECTION', payload: socket });
export const deleteConnection = () => ({ type: 'DELETE_CONNECTION'});


const getUsersSuccess = users => ({ type: 'GET_USERS_SUCCESS', payload: users });
const getUsersError = error => ({ type: 'GET_USERS_ERROR', payload: error });

export const getUsers = () => (dispatch) => {
  axios('http://192.168.0.223:3020/api/all-users')
    .then(({ data }) => dispatch(getUsersSuccess(data)))
    .catch(error => dispatch(getUsersError(error)));
};

const getDialogsSuccess = users => ({ type: 'GET_DIALOGS_SUCCESS', payload: users });
const getDialogsError = error => ({ type: 'GET_DIALOGS_ERROR', payload: error });

export const getDialogs = id => (dispatch) => {
  axios(`http://192.168.0.223:3020/api/dialogs/${id}`)
    .then(({ data }) => dispatch(getDialogsSuccess(data)))
    .catch(error => dispatch(getDialogsError(error)));
};

const loginSuccess = users => ({ type: 'LOGIN_SUCCESS', payload: users });
const loginError = error => ({ type: 'LOGIN_ERROR', payload: error });

export const login = user => (dispatch) => {
  axios.post('http://192.168.0.223:3020/api/log-in', user)
    .then(({ data }) => dispatch(loginSuccess(data)))
    .catch(error => dispatch(loginError(error)));
};

const authSuccess = users => ({ type: 'AUTH_SUCCESS', payload: users });
const authError = error => ({ type: 'AUTH_ERROR', payload: error });

export const auth = user => (dispatch) => {
  axios.post('http://192.168.0.223:3020/api/auth', user)
    .then(({ data }) => dispatch(authSuccess(data)))
    .catch(error => dispatch(authError(error)));
};

const signUpSuccess = users => ({ type: 'SIGNUP_SUCCESS', payload: users });
const signUpError = error => ({ type: 'SIGNUP_ERROR', payload: error });

export const signUp = user => (dispatch) => {
  axios.post('http://192.168.0.223:3020/api/sign-up', user)
    .then(({ data }) => dispatch(signUpSuccess(data)))
    .catch(error => dispatch(signUpError(error)));
};

const getMessagesSuccess = users => ({ type: 'GET_MESSAGES_SUCCESS', payload: users });

export const getMessages = id => (dispatch) => {
  console.log(id);
  axios(`http://192.168.0.223:3020/api/messages/${id}`)
    .then(({ data }) => dispatch(getMessagesSuccess(data)))
    .catch(error => dispatch(console.log(error)));
};