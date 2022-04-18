import React from 'react';
<<<<<<< Updated upstream
import { Chart as ChartJS, 
    CategoryScale, 
=======
import PropTypes from 'prop-types';
import {
    Chart as ChartJS,
    CategoryScale,
>>>>>>> Stashed changes
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
<<<<<<< Updated upstream
    Legend, } from 'chart.js';
    
import {Line} from 'react-chartjs-2'
import './Monitor.css'
=======
    Legend
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import './Monitor.css';
>>>>>>> Stashed changes

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

        const callback = (wrongdata) => {
            const data = { metrics: { dataTransferRate: wrongdata.metrics, packetsPerSecond: 0 } };
            if (this.state.data) {
                // update this.dataArray
                if (this.timeLabels.length >= 21) {
                    this.dataArray.shift();
                } else if (this.timeLabels.length === 0) {
                    this.timeLabels.push(0);
                } else { // data array is not fully sized yet
                    this.timeLabels.unshift(this.timeLabels[0] - 1);
                }
                this.dataArray.push(data.metrics);
                const newDataArray = this.dataArray.map((e) => e[props.metric]);

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
                    label: this.props.metric,
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
                plugins: { legend: { display: false } }
            }}
            width='100%'
            data={this.state.data}
            redraw
            />

        );
    }
}

export default MetricsGraph;
