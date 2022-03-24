import React, { Component } from 'react'
import {Spring, animated} from 'react-spring'

import "Style/GameScreen.css";
import "Style/WriteStyle.css";

export default class WriteGameScreen extends Component {


    constructor(props){
        super(props);

        //Proposition list
        this.definition = this.props.table.def;
        this.answers = this.props.table.ans;



        this.audioData = this.props.audioData;
        

        this.state = {
            defSelected: -1,//We init at zero
            userAnswerWords: '',
        }

        this.props.handleUserAnswer('', this.answers);
    }



    generateOriginalExpression(defSelected){
        let expressionsComponents = [];

        for (let i = 0; i < this.definition.length; i++) {
            expressionsComponents.push(
                <div 
                    key={i}
                    className="originalWordCTN"
                >
                    <div 
                        className="originalWord"

                        onMouseLeave={ () => {
                            this.setState({defSelected: -1})
                        }}
                        onClick={()=>{
                            this.readAudioWord(i);
                            this.setState({defSelected: i})
                        }}
                    >
                        {this.definition[i][0]}
                    </div>

                    <Spring
                        opacity={(defSelected === i) ? 1 : 0}
                        translateY={(defSelected === i) ? 15: 0}
                        config={{duration: 300}} 
                    >
                        {styles => (
                            <animated.div className="tooltip" style={{...styles}}>
                                {this.definition[i][1]}
                            </animated.div>
                        )}
                    </Spring>
                </div>


            );
            
        }

        return expressionsComponents;

    }

    typingEvent(value){
        this.props.handleUserAnswer(value);

        this.setState({
            userAnswerWords: value
        });

    }

    readAudioPhrase(){
        if(this.audioData.phrase)

            this.audioData.phrase.play()

    }

    readAudioWord(i){

        if(this.audioData.word && this.audioData.word[i])
        
            this.audioData.word[i].play();
    }

    render() {

        return (
            <div id="CaseGameCTN">             

                <div id="kulech">
                    <h1 id="Consigne">Write this expression in English : </h1>

                    <div id="expression">
                        <div onClick={this.readAudioPhrase.bind(this)} id="audioImageCTN">
                            <img src="pub/sound.png" width="50px" height="50px"/>
                            
                        </div>
                        {this.generateOriginalExpression(this.state.defSelected)}
                    </div>

                    <div id="userTypingArea-WGS">
                        <textarea 
                            id="textArea-WGS"
                            onChange={(e)=>this.typingEvent(e.target.value)}
                        >

                        </textarea>
                        
                    </div>

                </div>
                
                <svg xmlns="http://www.w3.org/2000/svg" transform="scale(-1,1)">
                    <path fill="#273036" fillOpacity="1" d="M 0 0 L 0 200 C 0 250 100 200 100 250 L 100 350 C 100 400 150 350 150 400 C 150 500 150 500 50 500 Q 0 500 0 550 C 0 600 0 600 50 600 L 250 600 L 250 0 L 0 0 "></path>
                </svg>

            </div>
        )
    }
}


