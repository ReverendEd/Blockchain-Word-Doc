import { combineReducers } from 'redux';
import { } from '../requests/Requests'


const defaultUserState = {
    username: '',
    password: ''
}

const defaultDocState = {
    title: '',
    document: ''
}

const user = (state = defaultUserState, action) => {
  switch (action.type) {
      case 'LOGIN':
          state.username = action.payload.username;
          state.password = action.payload.password;
          console.log(state);
        break;
      default:
        break;     
  }
  return state;
};

const document = (state = defaultDocState, action) => {
    switch (action.type) {
        case 'EDIT_DOC':
            state.title = action.payload.title;
            state.document = action.payload.document;
            console.log(state);
          break;
        default:
          break;     
    }
    return state;
  };

// const message = (state = '', action) => {
//     switch (action.type) {
//       case LOGIN_ACTIONS.CLEAR_LOGIN_ERROR:
//         return '';
//       case LOGIN_ACTIONS.LOGIN_FAILED:
//         return 'Ooops! The username and password didn\'t match. Try again!';
//       case LOGIN_ACTIONS.LOGIN_FAILED_NO_CODE:
//         return 'Ooops! Something went wrong! Is the server running?';
//       case LOGIN_ACTIONS.INPUT_ERROR:
//         return action.payload;
//       default:
//         return state;
//     }
//   };

// const isLoading = (state = false, action) => {
//   switch (action.type) {
//     case LOGIN_ACTIONS.REQUEST_START:
//       return true;
//     case LOGIN_ACTIONS.REQUEST_DONE:
//       return false;
//     default:
//       return state;
//   }
// };

export default combineReducers({
  user,
  document
});
