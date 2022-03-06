import React from 'react'
import VideoPlayer from './VideoPlayer';
import './Monitor.css'

class Monitor extends React.Component {

    metrics = ['packet-size'];

    constructor(props) {
        super(props);

        this.state = {portValue: this.props.data.port};

        this.onClickExit = this.onClickExit.bind(this);
        this.onPortChange = this.onPortChange.bind(this);
        this.handlePortChange = this.handlePortChange.bind(this);
    }

    render() {
        return (
            <div className='Card'>
                <div className='Exit' onClick={this.onClickExit}>x</div>
                <div className='Card-Background'>
                    <VideoPlayer port={this.props.data.port} />
                    <div>
                        <label>
                        Port: 
                            <input type='text' value={this.state.portValue}
                            onChange={this.handlePortChange} />
                            <button onClick={this.onPortChange}>Submit</ button>
                        </ label>
                        {/*<label>
                        Metric : 
                            {this.metrics.map((e, i) => 
                                    <div>
                                        <input type="radio" id={e} key={i} value={e} />
                                        <label for={e}>{e}</ label>
                                    </ div>
                                )
                            }
                            <button onClick={this.onMetricChange}>Submit</ button>
                        </ label>*/}
                    </div>
                    {/*<p className='Monitor-Text'>Dummy Monitor #{this.props.data.id}</p>*/}
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

    onMetricChange() {

    }
}

export default Monitor;