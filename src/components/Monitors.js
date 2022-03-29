import React from 'react'
import Monitor from './Monitor';
import VideoPlayer from './VideoPlayer';

import { io } from 'socket.io-client';

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

        this.socket = io(process.env.REACT_APP_MONITOR_URL); 

        this.socket.send('start', port);

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
                socket={this.socket} 
                videoPlayer = {this.videoStreams.get(e.url)}/>
            )
        );
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
            this.activePorts.delete(oldPort);
            this.socket.send('stop', oldPort);

            const oldUrl = `http://localhost:${oldPort}/video`
            this.videoStreams.set(oldUrl, <VideoPlayer url = {oldUrl}/>)
        }

        if(this.activePorts.has(newPort)) {
            this.activePorts.set(newPort, this.activePorts.get(newPort) + 1);
        } else {
            this.activePorts.set(newPort, 1);
            this.socket.send('start', newPort);

            const newUrl = `http://localhost:${newPort}/video`
            this.videoStreams.set(newUrl, <VideoPlayer url = {newUrl}/>)
        }
    }
}

export default Monitors;