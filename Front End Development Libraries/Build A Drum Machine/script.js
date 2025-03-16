const drumPads = [
  { key: 'Q', id: 'Heater-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', id: 'Heater-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'E', id: 'Heater-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'A', id: 'Heater-4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 'S', id: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 'D', id: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { key: 'Z', id: "Kick-n'-Hat", url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', id: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 'C', id: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }
];

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: ''
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(event) {
    const pad = drumPads.find(p => p.key === event.key.toUpperCase());
    if (pad) {
      this.playSound(pad.key, pad.id);
    }
  }

  playSound(key, id) {
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.play();
    this.setState({ display: id });
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="display">{this.state.display}</div>
        <div className="pad-container">
          {drumPads.map(pad => (
            <div
              key={pad.id}
              className="drum-pad"
              id={pad.id}
              onClick={() => this.playSound(pad.key, pad.id)}
            >
              {pad.key}
              <audio className="clip" id={pad.key} src={pad.url}></audio>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<DrumMachine />, document.getElementById('root'));
