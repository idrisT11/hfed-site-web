import React, { Component } from 'react'
import {Spring, animated, Transition} from 'react-spring'

import "Style/GameScreen.css";
import "Style/CaseStyle.css";

export default class CaseGameScreen extends Component {


    constructor(props){
        super(props);

        //Proposition list
        this.propositions = this.props.table.pro;
        this.definition = this.props.table.def;
        this.answers = this.props.table.ans;



        this.audioData = this.props.audioData;
        
        this.state = {
            defSelected: -1,//We init at zero
            userAnswerWords: [],
            remainingWordBank: [...this.props.table.pro],
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

    generateSelectedWord(userAnswerWords){
        let userSelectionComponents = [];

        for (let i = 0; i < userAnswerWords.length; i++) 
        {
            let value = userAnswerWords[i];

            
            userSelectionComponents.push(
                <Transition
                    native
                    items={this.propositions.includes(value)}
                    from={{opacity:0}}
                    enter={{opacity:1}}
                    leave={{opacity:0}}
                    reset={true}
                    
                    key={i}
                >
                    
                    { (styles, item) =>
                        item && (
                            <animated.div 
                                style={{...styles}}
                                onClick={(e)=>this.userAnswerClickEvent(e.target)} 
                                className="answerWord-CGS"
                            >
                                {userAnswerWords[i]}

                            </animated.div>
                        )
                    }
                </Transition>
                
            );

            
        }
            
        
        return userSelectionComponents;
    }

    generateWordBank(wordBank){

        let wordBankComponents = [];

        //We generate apart each div in the word-bank
        for (let i = 0; i < this.propositions.length; i++) 
        {

            wordBankComponents.push(
                //Here we lanch the animation such as, if the wordBank-word is not contained
                //(or not) in the original proposition list, we execute an animation
                <Spring 
                    key={i + this.propositions[i]} 
                    opacity={wordBank.includes(this.propositions[i])? 1 : 0}
                    translateY={wordBank.includes(this.propositions[i])? 0: -30}
                    config={{duration: 300}} 
                >
                {   styles => (

                    <animated.div 
                        style={{...styles}}
                        onClick={(e)=>(console.log(this.propositions[i],e.target.innerHTML)||true)&&wordBank.includes(this.propositions[i])&& this.wordBankClickEvent(e.target, i)} 
                        className="wordBankElem-CGS"
                    >
                        {this.propositions[i]}

                    </animated.div>

                )}
                </Spring>
                
            );

            
        }
            
        
        return wordBankComponents;
    }

    wordBankClickEvent(wordElement){
        let newValue = wordElement.innerHTML;
        let newAnswerTab = [...this.state.userAnswerWords];
        newAnswerTab.push(newValue);

        this.props.handleUserAnswer(newAnswerTab.join(' '));

        this.setState({
            userAnswerWords: newAnswerTab,
            remainingWordBank: this.state.remainingWordBank.filter(e=>e!==wordElement.innerHTML)
        });

    }

    userAnswerClickEvent(caseElement){
        let newValue = caseElement.innerHTML;
        let newWordBankTab = [...this.state.remainingWordBank];
        newWordBankTab.push(newValue);

        //ya reb
        this.props.handleUserAnswer(this.state.userAnswerWords.filter(e=>e!==newValue).join(' '));


        this.setState({
            userAnswerWords: this.state.userAnswerWords.filter(e=>e!==newValue),
            remainingWordBank: newWordBankTab
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

                    <div id="userSelection-CGS">
                        {this.generateSelectedWord(this.state.userAnswerWords)}
                    </div>

                    <div id="WordBank-CGS">
                        {this.generateWordBank(this.state.remainingWordBank)}
                    </div>

                </div>
                
                <svg xmlns="http://www.w3.org/2000/svg" transform="scale(-1,1)">
                    <path fill="#273036" fillOpacity="1" d="M 0 0 L 0 200 C 0 250 100 200 100 250 L 100 350 C 100 400 150 350 150 400 C 150 500 150 500 50 500 Q 0 500 0 550 C 0 600 0 600 50 600 L 250 600 L 250 0 L 0 0 "></path>
                </svg>

            </div>
        )
    }
}


