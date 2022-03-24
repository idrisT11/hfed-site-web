import React, { Component } from 'react'
import getJSXCourse from 'CourseData/tipsHtmlContent/courseRouter'

export default class TipsModal extends Component {
    constructor(props){
        super(props);
        this.courseContent = getJSXCourse(this.props.courseName, this.props.audioData);
        
    }

    render() {

        return (
            
            <div id="courseTipsModal" style={tipsPopupStyle}>
                <div onClick={this.props.closeTipsCallback}>X</div>
                {this.courseContent}
            </div>
        )
    }
}

const tipsPopupStyle = {
    backgroundColor : 'white',
    width: '50%',
    border: '1px black solid',
    position: 'absolute'
}
