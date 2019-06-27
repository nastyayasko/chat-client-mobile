const initialState = {
  user: {},
  users: [],
  dialogs: [],
  messages: [],
  connection: null,
  currentDialog: null,
  loginStatus: '',
};


export default function reducers(state = initialState, action) {
  switch (action.type) {
    case 'SAVE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'DELETE_USER':
      return {
        ...state,
        user: {},
      };
    case 'GET_USERS_SUCCESS':
      return {
        ...state,
        users: action.payload,
      };
    case 'GET_DIALOGS_SUCCESS':
      return {
        ...state,
        dialogs: action.payload,
      };
    case 'SET_LOGINSTATUS':
      return {
        ...state,
        loginStatus: action.payload,
      };
    case 'DELETE_LOGINSTATUS':
      return {
        ...state,
        loginStatus: '',
      };
    case 'SET_CURRENT_DIALOG':
      return {
        ...state,
        currentDialog: action.payload,
      };
    case 'LOGIN_SUCCESS':
      if (action.payload.status) {
        return {
          ...state,
          loginStatus: action.payload.status,
        };
      }
      return {
        ...state,
        loginStatus: '',
        user: action.payload,
      };
    case 'SIGNUP_SUCCESS':
      if (action.payload.status) {
        return {
          ...state,
          loginStatus: action.payload.status,
        };
      }
      return {
        ...state,
        loginStatus: '',
        user: action.payload,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
      };
    case 'GET_MESSAGES_SUCCESS':
      return {
        ...state,
        messages: action.payload,
      };
    case 'CREATE_CONNECTION':
      return {
        ...state,
        connection: action.payload,
      };
    case 'DELETE_CONNECTION':
      return {
        ...state,
        connection: null,
      };
    default:
      return state;
  }
}
