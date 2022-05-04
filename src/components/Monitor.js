import React from 'react';
import PropType from 'prop-types';
import MetricsGraph from './MetricsGraph';
import { Socket } from 'socket.io-client';
import './Monitor.css';

class Monitor extends React.PureComponent {
    static propTypes = {
        data: PropType.shape({
            url: PropType.string.isRequired,
            id: PropType.string.isRequired,
            metric: PropType.string.isRequired
        }).isRequired,
        videoPlayer: PropType.element.isRequired,
        socket: PropType.instanceOf(Socket).isRequired,
        onComponentDidMount: PropType.func.isRequired,
        onComponentWillUnmount: PropType.func.isRequired,
        deleteCallback: PropType.func.isRequired,
        updateMonitorPortCallback: PropType.func.isRequired
    };

    metrics = [{ name: 'data_transfer_rate', display: 'Data Tranfer Rate' },
        { name: 'packets_per_second', display: 'Packets per Second' }];

    lineColor = {
        packets_per_second: 'rgb(0, 151, 167)',
        data_transfer_rate: 'rgb(255, 153, 0)'
    };

    streams = [{ name: 'Stream 1', url: process.env.REACT_APP_SOURCE_1_URL },
        { name: 'Stream 2', url: process.env.REACT_APP_SOURCE_2_URL },
        { name: 'Stream 3', url: process.env.REACT_APP_SOURCE_3_URL },
        { name: 'Stream 4', url: process.env.REACT_APP_SOURCE_4_URL },
        { name: 'Stream 5', url: process.env.REACT_APP_SOURCE_5_URL },
        { name: 'Stream 6', url: process.env.REACT_APP_SOURCE_6_URL }];

    constructor (props) {
        super(props);

        this.state = {
            url: this.props.data.url,
            metric: this.props.data.metric
        };

        this.onClickExit = this.onClickExit.bind(this);
        this.onPortChange = this.onPortChange.bind(this);
        this.handlePortChange = this.handlePortChange.bind(this);
        this.handleMetricChange = this.handleMetricChange.bind(this);
    }

    render () {
        console.log(this.metrics[0].name)
        return (
            <div className='Card'>
                <div className='Exit' onClick={this.onClickExit}>x</div>
                <div className='Card-Background'>
                    {this.props.videoPlayer}
                    <div style={{ flex: 3 }}>
                        <MetricsGraph metric={this.state.metric}
                            metric_name={this.state.metric == this.metrics[0].name ? 'Data Tranfer Rate' : 'Packets per Second'}
                            lineColor={this.lineColor[this.state.metric]}
                            socket={this.props.socket} url={this.state.url}/>
                    </ div>
                    <div style={{ flex: 2, paddingLeft: '5%' }}>
                        <label>
                        Stream:
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

    componentDidMount () {
        this.props.onComponentDidMount(this.state.url);
    }

    componentWillUnmount () {
        this.props.onComponentWillUnmount(this.state.url);
    }

    onClickExit () {
        this.props.deleteCallback(this.props.data.id);
    }

    onPortChange () {
        this.props.updateMonitorPortCallback(this.props.data.id, this.state.portValue);
    }

    handlePortChange (event) {
        this.props.updateMonitorPortCallback(this.props.data.id, event.target.value, this.state.url);
        this.setState({ url: event.target.value });
    }

    handleMetricChange (event) {
        this.setState({ metric: event.target.value });
    }
}

export default Monitor;
