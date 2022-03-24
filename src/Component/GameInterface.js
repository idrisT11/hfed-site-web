import React from 'react';

import 'Style/GameInterface.css';


import ProgressionBar from './GameSection/ProgressionBar';
import GameScreen from './GameSection/GameScreen';
import ContinueModal from './GameSection/ContinueModal';
import GameLoading from './GameSection/GameLoading';
import TipsModal from './GameSection/TipsModal';


class GameInterface extends React.Component {

  constructor(props){
    super(props);
    this.table = this.props.table;
    this.remainingLevels = [...this.table].splice(1).map((v, i) => i+1);//JS ta3 khra
    
    this.nbLevel = 10;

    
    this.userAnswer = [];
    this.correctAnswers = [];
    this.gutAnswer = true;

    this.gutSound = new Audio('pub/sah2.ogg');
    this.ghletSound = new Audio('pub/ghalet.ogg');

    this.state = {
      nbCorrectLevel: 0,
      loadTips: false,
      audioLoaded: false,

      level: this.remainingLevels.shift(),
      nbTries: 0,

      transition: false,
      fadeGameScreen: false,
    }

    this.handleUserAnswer = this.handleUserAnswer.bind(this);
    this.keyDownEventHandler = this.keyDownEventHandler.bind(this)
  }

  keyDownEventHandler(e){

    if (e.key == 'Enter' && !this.state.transition) 
              
        this.validate();
    
    else if (e.key == 'Enter' && this.state.transition && !this.state.fadeGameScreen) 
    
        this.clickOnContinue();
  }

  componentDidMount(){
    document.addEventListener('keyup', this.keyDownEventHandler);
  }

  componentWillUnmount(){
    document.removeEventListener('keyup', this.keyDownEventHandler)
  }

  handleAudioLoading(audioData){
    this.audioData = audioData;
    
    this.setState({
      audioLoaded: true,
    })
  }

  handleUserAnswer(userAnswser, correctAnswers=null){
    this.userAnswer = userAnswser;

    if(correctAnswers != null)
      this.correctAnswers = correctAnswers;

  }

  handleCloseTips(){
    this.setState({loadTips: false});
  }


  validate(){

    this.gutAnswer = this.correctAnswers.includes(this.userAnswer);

    if(this.gutAnswer)
    {      
      this.gutSound.play();
            
    }
    else 
    {
      this.ghletSound.play();
      this.remainingLevels.push(this.state.level);
    }

    this.setState({
      transition: true, 
      nbCorrectLevel: this.state.nbCorrectLevel+this.gutAnswer
    });
  }

  clickOnContinue(){
    this.setState({
      fadeGameScreen: true, transition: false
    })
    this.nbTries++;
    
  }

  nextExercice(){
    
    this.setState({
      nbTries: this.state.nbTries + 1,
      level: this.remainingLevels.shift(), 
      fadeGameScreen: false
    });
  }

  showTips(){
    this.setState({loadTips: !this.state.loadTips});
  }

  render(){
    return (
      
      <div style={styleGameInterface}>

        {this.state.audioLoaded && 
          <div 
            style={styleGameInterface}
          >

            <div id="top-GI">
              <button id="quitButton-GI">✕</button>
              <ProgressionBar level={this.state.nbCorrectLevel} nbLevel={this.nbLevel}/>
            </div>
            
            
            <GameScreen 
                key={this.state.nbTries}

                fade={ this.state.fadeGameScreen } 
                active={ ! this.state.transition } 


                callback={ ()=>this.nextExercice() }
                validateCallback={ ()=>this.validate() }
                handleUserAnswer={ this.handleUserAnswer.bind(this) }

                table={ this.table[ this.state.level ] }
                audioData={ this.audioData[ this.state.level ] }
            />

            { !this.state.transition &&
            <div id="footerBar">
              <button id="HelpButton" onClick={()=>this.showTips()}>Help</button>
              <button id="GOButton" onClick={()=>this.validate()}>Check</button>
            </div>
            }

            { this.state.transition &&
              <ContinueModal 
                callback={()=>this.clickOnContinue()}
                userAnswer={this.userAnswer}
                correctAnswers={this.correctAnswers}
                gut={this.gutAnswer}
              />
            }

            { this.state.loadTips &&
              <TipsModal
                courseName={this.table[0].htmlContentUrl}
                audioData={this.audioData[0]}
                closeTipsCallback={this.handleCloseTips.bind(this)}
              />
            }
          </div>
        }

        {!this.state.audioLoaded && 
          <GameLoading table={this.table} loadedCallback={(tab)=>this.handleAudioLoading(tab)}/>  
        }

      </div>
    );
      
      
    
  }

}

export default GameInterface;

const styleGameInterface = {
  height: "100%",
  backgroundColor: '#1b1b1b',
  display: 'flex',
  flexDirection: 'column',

}
/*
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#273036" fill-opacity="1" d="M0,192L0,160L110.8,160L110.8,192L221.5,192L221.5,256L332.3,256L332.3,288L443.1,288L443.1,224L553.8,224L553.8,64L664.6,64L664.6,32L775.4,32L775.4,96L886.2,96L886.2,288L996.9,288L996.9,160L1107.7,160L1107.7,224L1218.5,224L1218.5,32L1329.2,32L1329.2,288L1440,288L1440,320L1329.2,320L1329.2,320L1218.5,320L1218.5,320L1107.7,320L1107.7,320L996.9,320L996.9,320L886.2,320L886.2,320L775.4,320L775.4,320L664.6,320L664.6,320L553.8,320L553.8,320L443.1,320L443.1,320L332.3,320L332.3,320L221.5,320L221.5,320L110.8,320L110.8,320L0,320L0,320Z"></path>
        </svg>
        */