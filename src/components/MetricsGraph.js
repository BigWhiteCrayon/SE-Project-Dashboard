import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, 
    CategoryScale, 
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import './Monitor.css'

ChartJS.register( 
    CategoryScale, 
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function MetricsGraph (props) {

    const [ metric,  ] = useState(props.metric );
    const [ data,  ] = useState(props.data);

    const [ socket,  ] = useState(props.socket);
    
    const port = /[0-9]{4}/.exec(props.url)[0];

    useEffect(() => {
        socket.on(port.toString(), (data) => {
            console.log(data);
        });
    })

    const dumbData = {
        labels: data.map((e) => e.time),

        datasets: [{label: metric,
            backgroundColor: props.lineColor,
            borderColor: props.lineColor,
            data: data.map((e) => e[props.metric] ),
        }]
    };
    return(
        <Line options={{aspectRatio:16/9, plugins:{legend: {display:false}}}} width='100%'
            data={dumbData}
        />
    );
}


export default MetricsGraph