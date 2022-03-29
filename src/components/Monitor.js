import React from 'react';
import MetricsGraph from './MetricsGraph';
import './Monitor.css';

class Monitor extends React.Component {

    metrics = [{name: 'packetSize', display: 'Packet Size'}, 
                {name: 'dataTransferRate', display: 'Data Transfer Rate'}];

    lineColor = {
                    packetSize: 'aqua',
                    dataTransferRate: 'red'
                };

    streams = [ {name: 'Stream 1', url: process.env.REACT_APP_SOURCE_1_URL},
                {name: 'Stream 2', url: process.env.REACT_APP_SOURCE_2_URL},
                {name: 'Stream 3', url: process.env.REACT_APP_SOURCE_3_URL},
                {name: 'Stream 4', url: process.env.REACT_APP_SOURCE_4_URL},
                {name: 'Stream 5', url: process.env.REACT_APP_SOURCE_5_URL},
                {name: 'Stream 6', url: process.env.REACT_APP_SOURCE_6_URL} ];

    constructor(props) {
        super(props);

        this.state = {
            url: this.props.data.url,  
            metric: this.metrics[0].name
        };

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
                    {this.props.videoPlayer}
                    <div style={{flex: 3}}>
                        <MetricsGraph data={data} dataKey={this.state.metric} 
                        xAxisKey={'time'} lineColor={this.lineColor[this.state.metric]}
                        socket={this.props.socket} url={this.state.url}/>
                    </ div>
                    <div style={{flex: 2, paddingLeft: '5%'}}>
                        <label>
                        Stream: 
                            {/*<input type='text' value={this.state.url}
                            onChange={this.handlePortChange} />
                            <button onClick={this.onPortChange}>Submit</ button>*/}
                            <select value={this.state.url} onChange={this.handlePortChange}>
                            {this.streams.map((e, i) => 
                                    <option value={e.url} key={i}>{e.name}</option>
                                )
                            }
                            </ select>
                        </ label><br />
                        <label>
                        Metric: 
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
        this.props.updateMonitorPortCallback(this.props.data.id, event.target.value, this.state.url);
        this.setState({url: event.target.value});
    }

    handleMetricChange(event) {
        this.setState({metric: event.target.value});
    }
}

export default Monitor;