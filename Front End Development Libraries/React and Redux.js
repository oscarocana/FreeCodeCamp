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
