import React from "react";
import './Monitor.css';

class VideoPlayer extends React.Component {

    render () {
        return(
            <video muted autoPlay className='Video-Window' loop
                src={`http://localhost:${this.props.port}/video`} type="video/mp4" 
            />    
        );
    }
}

export default VideoPlayer