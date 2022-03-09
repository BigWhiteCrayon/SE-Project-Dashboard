import React from 'react';
import VideoPlayer from './VideoPlayer';
import MetricsGraph from './MetricsGraph';
import './Monitor.css'

class Monitor extends React.Component {

    metrics = [{name: 'packetSize', display: 'Packet Size'}, 
                {name: 'dataTransferRate', display: 'Data Transfer Rate'}];

    lineColor = {
                    packetSize: 'aqua',
                    dataTransferRate: 'red'
                }

    constructor(props) {
        super(props);

        this.state = {portValue: this.props.data.port, metric: this.metrics[0].name};

        this.onClickExit = this.onClickExit.bind(this);
        this.onPortChange = this.onPortChange.bind(this);
        this.handlePortChange = this.handlePortChange.bind(this);
        this.handleMetricChange = this.handleMetricChange.bind(this);
    }

    render() {
        const data = [{name: 'a', packetSize: 65, dataTransferRate: 34, time: -20}, {name: 'b',packetSize:55, dataTransferRate: 36,time: -15}, 
            {name: 'c', packetSize:56, dataTransferRate: 27, time: -10}, {name: 'd', packetSize: 67, dataTransferRate: 40, time: -5}, 
            {name: 'e', packetSize: 60, dataTransferRate: 35,time: 0}];
        return (
            <div className='Card'>
                <div className='Exit' onClick={this.onClickExit}>x</div>
                <div className='Card-Background'>
                    <VideoPlayer port={this.props.data.port} />
                    <div style={{flex: 3}}>
                        <MetricsGraph data={data} dataKey={this.state.metric} 
                        xAxisKey={'time'} lineColor={this.lineColor[this.state.metric]}/>
                    </ div>
                    <div style={{flex: 2, paddingLeft: '5%'}}>
                        <label>
                        Port: 
                            <input type='text' value={this.state.portValue}
                            onChange={this.handlePortChange} />
                            <button onClick={this.onPortChange}>Submit</ button>
                        </ label><br />
                        <label>
                        Metric : 
                            <select value={this.state.metric} onChange={this.handleMetricChange}>
                            {this.metrics.map((e, i) => 
                                    <option value={e.name} key={i}>{e.display}</option>
                                )
                            }
                            </select>
                        </ label>
                    </div>
                </div>
                
            </div>
        );
    }

    onClickExit() {
        this.props.deleteCallback(this.props.data.id);
    }

    onPortChange() {
        this.props.updateMonitorPortCallback(this.props.data.id, this.state.portValue);
    }

    handlePortChange(event) {
        this.setState({portValue: event.target.value});
    }

    handleMetricChange(event) {
        this.setState({metric: event.target.value});
    }
}

export default Monitor;