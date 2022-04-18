import React from 'react';
import Monitors from './components/Monitors';
import './App.css';

class App extends React.Component {
    constructor (props) {
        super(props);

        this.onClickAddButton = this.onClickAddButton.bind(this);
        this.monitorsDeleteCallback = this.monitorsDeleteCallback.bind(this);
        this.monitorsPortCallback = this.monitorsPortCallback.bind(this);

        this.idSet = new Set();

        const id = this.generateId();

        this.idSet.add(id);

        this.state = {
            monitors: [{
                url: process.env.REACT_APP_SOURCE_1_URL,
                metric: 'packet-size',
                id: id
            }]
        };
    }

    render () {
        return (
            <div className="App">
                <Monitors monitors={this.state.monitors}
                    deleteCallback={this.monitorsDeleteCallback}
                    updateMonitorPortCallback={this.monitorsPortCallback}/>
                <div className="Add-Button-Card"
                    onClick={this.onClickAddButton}>
                    <div className="Add-Button-Plus">+</ div>
                </ div>
            </div>
        );
    }

    onClickAddButton () {
        let id = this.generateId();

        while (this.idSet.has(id)) {
            id = this.generateId();
        }

        this.idSet.add(id);

        this.state.monitors.push({
            url: process.env.REACT_APP_SOURCE_1_URL,
            metric: 'packet-size',
            id: id
        });
        this.setState({ monitors: this.state.monitors });
    }

    monitorsDeleteCallback (id) {
        this.idSet.delete(id);

        const monitor = this.state.monitors.filter(monitor => monitor.id !== id);

        this.setState({ monitors: monitor });
    }

    monitorsPortCallback (id, url) {
        const monitor = this.state.monitors.map((e) => {
            if (e.id === id) {
                e.url = url;
            }
            return e;
        });

        this.setState({ monitors: monitor });
    }

    generateId () { // Generate a random 8 char hex string for id. Should *rarely* be regenerated
        const randChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
        let id = '';
        for (let i = 0; i < 8; i++) {
            id += randChar[Math.floor(Math.random() * randChar.length)];
        }
        return id;
    }
}

export default App;
