import React from "react";
import './Monitor.css';

class VideoPlayer extends React.Component {

    render () {
        return(
            <div className='Video-Window' >
                <video className='Video' muted autoPlay loop
                    src={`http://localhost:${this.props.port}/video`} type="video/mp4" 
                />    
            </div>
        );
    }
}

export default VideoPlayer