import { Spring, animated } from 'react-spring';
import React, { Component } from 'react'

import CaseGameScreen from './GameScreen/CaseGameScreen';
import WriteGameScreen from './GameScreen/WriteGameScreen';
import QCMGameScreen from './GameScreen/QCMGameScreen';

import {TYPE} from 'CourseData/Table';
import LinkGameScreen from './GameScreen/LinkGameScreen';


export default class GameScreen extends Component {

    constructor(props){
        super(props);
    }


    executeCommingAnimation = async (next, cancel) => {
        await next({marginLeft: "0%", width: "85%"})
        //await next({marginLeft: "0%", width: "85%"})

    }

    executeExitAnimation = async (next, cancel) => {
        if (randus() < 25) {
            await next({marginLeft: '-85%'})  
        }
        else{
            await next({marginLeft: '100%'})  
        }
        

    }

    getNextGame(fade){
        if(fade){
            this.props.callback();
        }
    }

    generateGame(level){
        switch (this.props.table.tp) {

            case TYPE.NATIVE_CASE:
            case TYPE.FOREIGN_CASE:

            return (
            <CaseGameScreen 
                table={this.props.table}
                audioData={this.props.audioData}
                handleUserAnswer={this.props.handleUserAnswer}
            />
            );

            case TYPE.NATIVE_WRITE:
            case TYPE.FOREIGN_WRITE:
            return (
            <WriteGameScreen 
                table={this.props.table}
                audioData={this.props.audioData}
                handleUserAnswer={this.props.handleUserAnswer}
            />
            );

            case TYPE.QCM_FOREIGN:
            case TYPE.QCM_NATIVE:
            return (
            <QCMGameScreen
                table={this.props.table}
                audioData={this.props.audioData}
                handleUserAnswer={this.props.handleUserAnswer}    
            />
            );
            
            case TYPE.LINK_WORDS:
            return(
            <LinkGameScreen
                table={this.props.table}
                audioData={this.props.audioData}
                handleUserAnswer={this.props.handleUserAnswer}  
                validateCallback={this.props.validateCallback}          
            />
            );

            default:
                return ;
            
    
        }
      }


    
    render() {

        return (
            <Spring
                from={{marginLeft: !(this.props.fade) ? "-85%": "0%", width:'85%'}}
                to={!(this.props.fade) ? this.executeCommingAnimation : this.executeExitAnimation}
                onRest={()=>this.getNextGame(this.props.fade)}
            >

            { styles =>(
                <animated.div 
                    style={{...styles, ...screenStyle}}
                    
                >
                
                    {this.generateGame(this.props.level)}
                
                </animated.div> 
            )}

            </Spring>
        )
    }
}

const screenStyle = {
    //paddingTop: "2em",

    backgroundColor: '#1b1b1b',
    //border: "6px solid #1c1d1e"
    flex: '8',
}

function randus() {
    return 0 + (Math.random() * (100-0));
}


