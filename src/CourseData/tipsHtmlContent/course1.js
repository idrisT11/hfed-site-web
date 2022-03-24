import React, { Component } from 'react'

export default class Course1 extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to your first Kabyle course !</h1>

                <table>
                    <thead>
                        <tr>
                            <th className="audioElemCourse">
                                Kabyle</th>
                            <th>English</th>
                        </tr>

                    </thead>
                    <tbody>
                        <tr>
                            <th className="audioElemCourse" onClick={()=>{
                                this.props.audioData.word[0].play()
                            }}
                            >
                                Nekki</th>
                            <th>I</th>
                        </tr>
                        <tr>
                            <th className="audioElemCourse" onClick={()=>{
                                this.props.audioData.word[1].play()
                            }}
                            >
                                Kchi</th>
                            <th>You</th>
                        </tr>
                    </tbody>

                </table>
            </div>
        )
    }
}

