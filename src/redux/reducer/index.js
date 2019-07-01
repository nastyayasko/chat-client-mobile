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
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'GET_USERS_SUCCESS':
      const {user} = state;
      const users = action.payload.filter(u => u._id !== user._id);
      return {
        ...state,
        users,
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
    case 'CREATE_DIALOG_SUCCESS':
      return {
        ...state,
        dialogs:[...state.dialogs, action.payload],
        currentDialog: action.payload,
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
