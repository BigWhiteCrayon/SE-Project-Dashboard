import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Chart } from 'react-chartjs-2';
import './Monitor.css'

class MetricsGraph extends React.Component {
    constructor(props) {
        super(props);

        const data = {
            labels: ['January',
            'February',
            'March',
            'April',
            'May',
            'June'],

            datasets: [{label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45],
            }]
        };

        this.setState({metric: this.props.dataKey, data: data});

        this.port = /[0-9]{4}/.exec(this.props.url)[0];
        
        this.props.socket.on(this.port.toString(), (data) => {
            console.log(data);
        });
    }
    
    render() {
        return(
            <div>
            <ResponsiveContainer width='100%' aspect={16/9}>
                <LineChart  data={this.props.data}>
                    <Line stroke={this.props.lineColor} dataKey={this.props.dataKey} type='monotone' />
                    <XAxis dataKey={this.props.xAxisKey} />
                    <YAxis />
                </ LineChart>
            </ ResponsiveContainer>
            </div>
        );
    }

    /*render() {
        return(
            <div style={{flex: 3}}>
            <Chart
                type={'line'} data={this.state.data}
            />
            </div>
        );
    }*/
}


export default MetricsGraph