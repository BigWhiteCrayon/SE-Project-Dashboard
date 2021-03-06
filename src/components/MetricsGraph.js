import React from 'react';
import PropTypes from 'prop-types';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import './Monitor.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

class MetricsGraph extends React.PureComponent {
    static propTypes = {
        metric: PropTypes.string.isRequired,
        metric_name: PropTypes.string.isRequired,
        lineColor: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        socket: PropTypes.object.isRequired
    };

    dataArray = [];
    timeLabels = [];

    constructor (props) {
        super(props);

        const formatedData = {
            labels: this.timeLabels,

            datasets: [{
                label: props.metric,
                backgroundColor: props.lineColor,
                borderColor: props.lineColor,
                data: this.dataArray.map((e) => e[props.metric])
            }]
        };

        const port = /[0-9]{4}/.exec(props.url)[0];

        const callback = (data) => {
            if (this.state.data) {
                // update this.dataArray
                if (this.timeLabels.length >= 11) {
                    this.dataArray.shift();
                } else if (this.timeLabels.length === 0) {
                    this.timeLabels.push(0);
                } else { // data array is not fully sized yet
                    this.timeLabels.unshift(this.timeLabels[0] - 2);
                }

                const correctedData = {
                    data_transfer_rate: data.metrics.data_transfer_rate / 2,
                    packets_per_second: data.metrics.packets_per_second / 2
                };
                this.dataArray.push(correctedData);
                const newDataArray = this.dataArray.map((e) => e[this.state.metric ? this.state.metric : props.metric]);
                const formatedData = this.state.data.datasets;
                formatedData[0].data = newDataArray;
                this.setState({
                    data: Object.assign({}, this.state.data,
                        { labels: this.timeLabels, datasets: formatedData })
                });
            }
        };

        this.state = {
            metric: props.metric,
            data: formatedData,
            socket: props.socket,
            port: port,
            callback: callback
        };
    }

    componentDidMount () {
        this.state.socket.on(this.state.port.toString(), this.state.callback);
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.url !== this.props.url) {
            const newPort = /[0-9]{4}/.exec(this.props.url)[0];

            this.state.socket.removeListener(prevState.port.toString(), this.state.callback);

            this.state.socket.on(newPort.toString(), this.state.callback);
            this.setState({ port: newPort });

            this.dataArray = [];
            this.timeLabels = [];
        }

        if (prevProps.metric !== this.props.metric) {
            const dumbData = {
                labels: this.state.data.labels,

                datasets: [{
                    label: this.timeLabels,
                    backgroundColor: this.props.lineColor,
                    borderColor: this.props.lineColor,
                    data: this.dataArray.map((e) => e[this.props.metric])
                }]
            };

            this.setState({ metric: this.props.metric, data: dumbData });
        }
    }

    render () {
        return (
            <Line options={{
                animation: { duration: 0 },
                aspectRatio: 16 / 9,
                plugins: { title: {
                    display: true,
                    text: this.props.metric == 'data_transfer_rate' ? [this.props.metric_name, 'bytes/second'] : this.props.metric_name
                },
                legend: { display: false }
                },
                scales: {
                    x: {
                        grid: {
                            drawTicks: false,
                            drawBorder: false,
                            z: -3
                        }
                    },
                    y: {
                        grid: {
                            drawTicks: false,
                            drawBorder: false,
                            z: -3
                        }
                    }}
            }}
            width='100%'
            data={this.state.data}
            redraw
            />

        );
    }
}

export default MetricsGraph;
