//Create a Redux Store

const reducer = (state = 5) => {
  return state;
}

// Redux methods are available from a Redux object
// For example: Redux.createStore()
// Define the store here:
const store = Redux.createStore(reducer)


//Get State from the Redux Store

const store = Redux.createStore(
  (state = 5) => state
);

// Change code below this line
const currentState = store.getState()


//Define a Redux Action

// Define an action here:
const action = {
  type: "LOGIN"
}


//Define an Action Creator

const action = {
  type: 'LOGIN'
}
// Define an action creator here:
const actionCreator = () => {
  return action
}


//Dispatch an Action Event

const store = Redux.createStore(
  (state = {login: false}) => state
);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};

// Dispatch the action here:
store.dispatch(loginAction());


//Handle an Action in the Store


const defaultState = {
  login: false
};

const reducer = (state = defaultState, action) => {
  // Change code below this line
  if(action.type === "LOGIN"){
    return state = {
  login: true
};
  } else{
    return defaultState
  }
  // Change code above this line
};

const store = Redux.createStore(reducer);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};


//Use a Switch Statement to Handle Multiple Actions


const defaultState = {
  authenticated: false
};

const authReducer = (state = defaultState, action) => {
  // Change code below this line
  switch(action.type){
    case "LOGIN":
     return state = {authenticated: true};
      break
  case "LOGOUT":
     return {authenticated: false };
      break
  default:
    return state
  }
  // Change code above this line
};

const store = Redux.createStore(authReducer);

const loginUser = () => {
  return {
    type: 'LOGIN'
  }
};

const logoutUser = () => {
  return {
    type: 'LOGOUT'
  }
};


//Use const for Action Types

const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"

const defaultState = {
  authenticated: false
};

const authReducer = (state = defaultState, action) => {

  switch (action.type) {
    case LOGIN: 
      return {
        authenticated: true
      }
    case LOGOUT: 
      return {
        authenticated: false
      }

    default:
      return state;

  }

};

const store = Redux.createStore(authReducer);

const loginUser = () => {
  return {
    type: LOGIN
  }
};

const logoutUser = () => {
  return {
    type: LOGOUT
  }
};


//Register a Store Listener

const ADD = 'ADD';

const reducer = (state = 0, action) => {
  switch(action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);

// Global count variable:
let count = 0;

// Change code below this line
store.subscribe(() => {
  return count++;
})
// Change code above this line

store.dispatch({type: ADD});
console.log(count);
store.dispatch({type: ADD});
console.log(count);
store.dispatch({type: ADD});
console.log(count);
