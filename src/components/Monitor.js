import React from 'react'
import './Monitor.css'

class Monitor extends React.Component {

    constructor(props) {
        super(props);

        this.onClickExit = this.onClickExit.bind(this);
    }
    render() {
        return (
            <div className='Card'>
                <div className='Exit' onClick={this.onClickExit}>x</div>
                <div className='Card-Background'>
                    <p className='Monitor-Text'>Dummy Monitor #{this.props.index + 1}</p>
                </div>
            </div>
        );
    }

    onClickExit() {
        this.props.deleteCallback(this.props.index);
    }
}

export default Monitor;