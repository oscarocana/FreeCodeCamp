class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerLabel: 'Session',
      timeLeft: 1500, // in seconds
      isRunning: false,
      intervalId: null
    };
    this.handleBreakDecrement = this.handleBreakDecrement.bind(this);
    this.handleBreakIncrement = this.handleBreakIncrement.bind(this);
    this.handleSessionDecrement = this.handleSessionDecrement.bind(this);
    this.handleSessionIncrement = this.handleSessionIncrement.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.tick = this.tick.bind(this);
    this.formatTime = this.formatTime.bind(this);
  }

  handleBreakDecrement() {
    if (this.state.breakLength > 1) {
      this.setState((state) => ({ breakLength: state.breakLength - 1 }));
    }
  }

  handleBreakIncrement() {
    if (this.state.breakLength < 60) {
      this.setState((state) => ({ breakLength: state.breakLength + 1 }));
    }
  }

  handleSessionDecrement() {
    if (this.state.sessionLength > 1) {
      this.setState((state) => ({
        sessionLength: state.sessionLength - 1,
        timeLeft: (state.sessionLength - 1) * 60,
      }));
    }
  }

  handleSessionIncrement() {
    if (this.state.sessionLength < 60) {
      this.setState((state) => ({
        sessionLength: state.sessionLength + 1,
        timeLeft: (state.sessionLength + 1) * 60,
      }));
    }
  }

  handleStartStop() {
    if (this.state.isRunning) {
      clearInterval(this.state.intervalId);
      this.setState({ isRunning: false, intervalId: null });
    } else {
      const intervalId = setInterval(this.tick, 1000);
      this.setState({ isRunning: true, intervalId });
    }
  }

  handleReset() {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerLabel: 'Session',
      timeLeft: 1500,
      isRunning: false,
      intervalId: null,
    });
    const beep = document.getElementById('beep');
    beep.pause();
    beep.currentTime = 0;
  }

  tick() {
    if (this.state.timeLeft === 0) {
      const beep = document.getElementById('beep');
      beep.play();
      this.setState((state) => ({
        timerLabel: state.timerLabel === 'Session' ? 'Break' : 'Session',
        timeLeft: state.timerLabel === 'Session' ? state.breakLength * 60 : state.sessionLength * 60,
      }));
    } else {
      this.setState((state) => ({ timeLeft: state.timeLeft - 1 }));
    }
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  render() {
    return (
      <div id="pomodoro-clock">
        <div id="break-label">
          Break Length
          <div id="break-controls">
            <button id="break-decrement" onClick={this.handleBreakDecrement}>-</button>
            <span id="break-length">{this.state.breakLength}</span>
            <button id="break-increment" onClick={this.handleBreakIncrement}>+</button>
          </div>
        </div>
        <div id="session-label">
          Session Length
          <div id="session-controls">
            <button id="session-decrement" onClick={this.handleSessionDecrement}>-</button>
            <span id="session-length">{this.state.sessionLength}</span>
            <button id="session-increment" onClick={this.handleSessionIncrement}>+</button>
          </div>
        </div>
        <div id="timer">
          <div id="timer-label">{this.state.timerLabel}</div>
          <div id="time-left">{this.formatTime(this.state.timeLeft)}</div>
        </div>
        <div id="controls">
          <button id="start_stop" onClick={this.handleStartStop}>
            {this.state.isRunning ? 'Pause' : 'Start'}
          </button>
          <button id="reset" onClick={this.handleReset}>Reset</button>
        </div>
        <audio id="beep" src="https://cdn.uppbeat.io/audio-files/aebfb3b0f1c6019e4ee3071a3ed56cf3/99c6bea857f447ace0bbb8274e269692/b372b656511e652c40651174be7b6589/STREAMING-digital-alarm-clock-beeping-loop-the-foundation-2-2-00-16.mp3
" type="audio/wav"></audio>
      </div>
    );
  }
}

ReactDOM.render(<PomodoroClock />, document.getElementById('root'));
