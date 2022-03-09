import React from 'react'
import Monitor from './Monitor';

class Monitors extends React.Component {
    constructor(props) {
        super(props);

        this.deleteMonitor = this.deleteMonitor.bind(this);
        this.updateMonitorPort = this.updateMonitorPort.bind(this);
    }

    
    render() {
        if(this.props.monitors.length === 0){ //this is a disgusting workaround for now
            return (<div />);
        }
        return (
            this.props.monitors.map((e, i) => 
                <Monitor data={e} key={i} 
                deleteCallback={this.deleteMonitor}
                updateMonitorPortCallback={this.updateMonitorPort}/>
            )
        );
    }
    
    deleteMonitor(id) {
        this.props.deleteCallback(id);
    }

    updateMonitorPort(id, url) {
        this.props.updateMonitorPortCallback(id, url);
    }
}

export default Monitors;