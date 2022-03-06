import React from 'react';
import Monitors from './components/Monitors';
import './App.css';


class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {click: true, monitors: [{
      port: 8080,
      metric: 'packet-size'
    }]};

    this.onClickAddButton = this.onClickAddButton.bind(this);
    this.monitorsCallback = this.monitorsCallback.bind(this);
  }

  render () {
    return (
      <div className="App">
        <Monitors monitors={this.state.monitors} deleteCallback={this.monitorsCallback}/>
        <div className="Add-Button-Card" 
            onClick={this.onClickAddButton}>
          <div className="Add-Button-Plus">+</ div>
        </ div>
      </div>
    );
  }

  onClickAddButton() {
    this.setState({click: !this.state.click});
    this.state.monitors.push({
      port: 8080,
      metric: 'packet-size'
    });
    this.setState({monitors: this.state.monitors});
  }

  monitorsCallback(index) {
    this.state.monitors.splice(index, 1);
    this.setState({monitors: this.state.monitors});
  }

}

export default App;
