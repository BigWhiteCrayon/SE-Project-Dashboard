import React from 'react'
import Monitor from './Monitor';

class Monitors extends React.Component {
    constructor(props) {
        super(props);

        this.deleteMonitor = this.deleteMonitor.bind(this);
    }

    
    render() {
        if(this.props.monitors.length === 0){ //this is a disgusting workaround for now
            return (<div />);
        }
        return (
            this.props.monitors.map((e, i) => 
                <Monitor data={e} key={i} index={i} deleteCallback={this.deleteMonitor}/>
            )
        );
    }
    
    deleteMonitor(index) {
        this.props.deleteCallback(index);
    }
}

export default Monitors;