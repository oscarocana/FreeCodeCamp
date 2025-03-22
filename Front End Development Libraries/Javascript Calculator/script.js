class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: '0',
      previousValue: '',
      formula: '',
      evaluated: false
    };
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
  }

  handleNumber(e) {
    const { currentValue, evaluated } = this.state;
    const value = e.target.value;

    if (evaluated) {
      this.setState({
        currentValue: value,
        formula: value !== '0' ? value : '',
        evaluated: false
      });
    } else {
      this.setState({
        currentValue: currentValue === '0' ? value : currentValue + value,
        formula: currentValue === '0' ? value : this.state.formula + value
      });
    }
  }

  handleOperator(e) {
  const { formula, currentValue, evaluated } = this.state;
  const value = e.target.value;

  if (evaluated) {
    this.setState({
      formula: currentValue + value,
      evaluated: false
    });
  } else {
    // Check if the last character in the formula is an operator
    const lastChar = formula.charAt(formula.length - 1);
    const isOperator = /[+\-*/]/.test(lastChar);

    if (isOperator) {
      // If the last character is an operator and the current operator is '-', allow it
      if (value === '-' && lastChar !== '-') {
        this.setState({
          formula: formula + value,
          currentValue: value
        });
      } else if (value !== '-') {
        // Replace the last operator with the new one, but handle multiple operators
        let newFormula = formula;
        while (/[+\-*/]$/.test(newFormula)) {
          newFormula = newFormula.slice(0, -1);
        }
        this.setState({
          formula: newFormula + value,
          currentValue: value
        });
      }
    } else {
      this.setState({
        formula: formula + value,
        currentValue: value
      });
    }
  }
}

  handleDecimal() {
    const { currentValue, evaluated } = this.state;

    if (evaluated) {
      this.setState({
        currentValue: '0.',
        formula: '0.',
        evaluated: false
      });
    } else if (!currentValue.includes('.')) {
      this.setState({
        currentValue: currentValue + '.',
        formula: this.state.formula + '.'
      });
    }
  }

  handleClear() {
    this.setState({
      currentValue: '0',
      previousValue: '',
      formula: '',
      evaluated: false
    });
  }

  handleEvaluate() {
    const { formula } = this.state;
    const result = eval(formula);
    this.setState({
      currentValue: result.toString(),
      formula: formula + '=' + result,
      evaluated: true
    });
  }

  render() {
    return (
      <div id="calculator">
        <div id="display">{this.state.currentValue}</div>
        <button id="clear" onClick={this.handleClear}>AC</button>
        <button id="divide" value="/" onClick={this.handleOperator}>/</button>
        <button id="multiply" value="*" onClick={this.handleOperator}>*</button>
        <button id="subtract" value="-" onClick={this.handleOperator}>-</button>
        <button id="add" value="+" onClick={this.handleOperator}>+</button>
        <button id="equals" onClick={this.handleEvaluate}>=</button>
        <button id="decimal" onClick={this.handleDecimal}>.</button>
        <button id="zero" value="0" onClick={this.handleNumber}>0</button>
        <button id="one" value="1" onClick={this.handleNumber}>1</button>
        <button id="two" value="2" onClick={this.handleNumber}>2</button>
        <button id="three" value="3" onClick={this.handleNumber}>3</button>
        <button id="four" value="4" onClick={this.handleNumber}>4</button>
        <button id="five" value="5" onClick={this.handleNumber}>5</button>
        <button id="six" value="6" onClick={this.handleNumber}>6</button>
        <button id="seven" value="7" onClick={this.handleNumber}>7</button>
        <button id="eight" value="8" onClick={this.handleNumber}>8</button>
        <button id="nine" value="9" onClick={this.handleNumber}>9</button>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
