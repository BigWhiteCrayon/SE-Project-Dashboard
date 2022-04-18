import React from 'react';
import PropType from 'prop-type';
import './Monitor.css';

class VideoPlayer extends React.Component {
    static propTypes = {
        url: PropType.string.isRequired
    };

    render () {
        return (
            <div className='Video-Window' >
                <video className='Video' muted autoPlay loop
                    src={this.props.url} type="video/mp4"
                />
            </div>
        );
    }
}

export default VideoPlayer;
