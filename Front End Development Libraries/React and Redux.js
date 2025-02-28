// Getting Started with React Redux

class DisplayMessages extends React.Component {
  // Change code below this line
    constructor(props) {
        super(props)
        this.state ={
        input : "",
        messages : []
        }
    }
  // Change code above this line
  render() {
    return <div />
  }
};

//Manage State Locally First

class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  // Add handleChange() and submitMessage() methods here
  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  // Adds current input to messages array and clears input
  submitMessage() {
    this.setState(state => ({
      messages: [...state.messages, state.input], // Concatenate current message
      input: '' // Clear input
    }));
  }
  render() {
    return (
      <div>
        <h2>Message Board</h2>
        <input 
          type="text" 
          value={this.state.input} 
          onChange={this.handleChange} 
        />
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    );
  }
}


//Extract State Logic to Redux

// Define ADD, addMessage(), messageReducer(), and store here:
const ADD = "ADD"
const addMessage = (message) => {
  return {
    type: ADD,
    message
  };
};

const messageReducer = (state = [], action) => {
  switch(action.type) {
    case ADD:
      // Immutably add a new message to the state array
      return [...state, action.message];
    default:
      // Return the current state for unknown actions
      return state;
  }
};

const store = Redux.createStore(messageReducer);


//Use Provider to Connect Redux to React

// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};



const store = Redux.createStore(messageReducer);

// React:

class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {  
    this.setState((state) => {
      const currentMessage = state.input;
      return {
        input: '',
        messages: state.messages.concat(currentMessage)
      };
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};

const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
  // Render the Provider below this line
    render(){
      return(
    <Provider store={store}>
      <DisplayMessages/>
    </Provider>
      )
    }
  // Change code above this line
};


//Map State to Props


const state = [];

// Change code below this line

const mapStateToProps = (state) => {
  const object = { messages: state }
  return object;
}

//Map Dispatch to Props

const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

// Change code below this line

const mapDispatchToProps = (dispatch) => {
  return { submitNewMessage : function(message) {
    dispatch(addMessage(message))
  } }
}


//Connect Redux to React


const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

const mapStateToProps = (state) => {
  return {
    messages: state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message));
    }
  }
};

class Presentational extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h3>This is a Presentational Component</h3>
  }
};

const connect = ReactRedux.connect;
// Change code below this line
const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Presentational)
