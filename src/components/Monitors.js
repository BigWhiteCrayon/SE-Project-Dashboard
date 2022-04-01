import React from 'react'
import Monitor from './Monitor';
import VideoPlayer from './VideoPlayer';
import socketio from 'socket.io-client';

class Monitors extends React.Component {
    constructor(props) {
        super(props);

        this.deleteMonitor = this.deleteMonitor.bind(this);
        this.updateMonitorPort = this.updateMonitorPort.bind(this);
        
        this.activePorts = new Map();

        //TODO: Switch to handle starting with multiple dashboards 
        const url = this.props.monitors[0].url;
        const port = /[0-9]{4}/.exec(url)[0];

        console.log(port);

        this.activePorts.set(port, 1); 

        const socket = socketio.connect(process.env.REACT_APP_MONITOR_URL);

        this.state = { socket: socket };

        this.state.socket.emit('start', 8080);

        this.videoStreams = new Map();
        this.videoStreams.set(url, <VideoPlayer url = {url}/>)
    }
    
    render() {
        if(this.props.monitors.length === 0){ //this is a disgusting workaround for now
            return (<div />);
        }
        return (
            this.props.monitors.map((e, i) => 
                <Monitor data={e} key={i} 
                deleteCallback={this.deleteMonitor}
                updateMonitorPortCallback={this.updateMonitorPort}
                socket={this.state.socket} 
                videoPlayer = {this.videoStreams.get(e.url)}/>
            )
        );
    }

    componentDidMount() {
        this.state.socket.on('connect', () => {
            console.log('ws connected')
            this.activePorts.forEach((_, key) => {
                this.state.socket.emit('start', key);
            })
        });
    }

    componentWillUnmount() {
        this.state.socket.close();
    }
    
    deleteMonitor(id) {
        this.props.deleteCallback(id);
    }

    updateMonitorPort(id, newUrl, oldUrl) {
        this.props.updateMonitorPortCallback(id, newUrl);

        const newPort = /[0-9]{4}/.exec(newUrl)[0];
        const oldPort = /[0-9]{4}/.exec(oldUrl)[0];

        console.log('old port: ' + oldPort.toString());
        console.log('new port: ' + newPort.toString());

        
        if(this.activePorts.get(oldPort) !== 1) {
            this.activePorts.set(oldPort, this.activePorts.get(oldPort) - 1);
        } else {
            // Commented out until we add some kind of thread handling to the server
            //this.activePorts.delete(oldPort);
            //this.state.socket.emit('stop', oldPort);

            const oldUrl = `http://localhost:${oldPort}/video`
            this.videoStreams.set(oldUrl, <VideoPlayer url = {oldUrl}/>)
        }

        if(this.activePorts.has(newPort)) {
            this.activePorts.set(newPort, this.activePorts.get(newPort) + 1);
        } else {
            this.activePorts.set(newPort, 1);
            this.state.socket.emit('start', newPort);

            const newUrl = `http://localhost:${newPort}/video`
            this.videoStreams.set(newUrl, <VideoPlayer url = {newUrl}/>)
        }
    }
}

export default Monitors;