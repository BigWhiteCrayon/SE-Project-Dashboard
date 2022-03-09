import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import './Monitor.css'

class MetricsGraph extends React.Component {
    render() {
        return(
            <div>
            {/*<button onClick={() => { this.props.data.push({name: 'f', amt:21})}}></button> */}
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
}

export default MetricsGraph