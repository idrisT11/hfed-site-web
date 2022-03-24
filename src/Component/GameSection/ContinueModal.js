import { Spring, animated } from 'react-spring';
import React, { Component } from 'react';

import '../../Style/ContinueModal.css';

class ContinueModal extends Component {

    generateMessage(){

        if (this.props.gut) 
        {
            return(
                <div id="correctModal" className="modalContinue">
                    <section>
                        <h1>
                            Well Done !
                        </h1> 
                        <div className="modalContinueElement">
                            <strong>
                                The correct answer was effectivly :
                            </strong>
                            <span>
                                {this.props.correctAnswers[0]}
                            </span>
                        </div>
                        <div id="buttonCTN">
                            <button onClick={()=>this.props.callback()}>Continue</button>
                        </div>
                        
                    </section>
                </div>
            )
        }

        else
        {
            return(
                <div id="incorrectModal" className="modalContinue">
                    <section>
                        <h1>
                            Not the one !
                        </h1> 
                        <div className="modalContinueElement">
                            <strong>
                            The correct answer is :
                            </strong>
                            <span>
                                {this.props.correctAnswers[0]}
                            </span>
                        </div>
                        <div className="modalContinueElement">
                            <strong>
                                And your answer was :
                            </strong>
                            <span>
                                {this.props.userAnswer}
                            </span>
                        </div>
                        <div id="buttonCTN">
                            <button onClick={()=>this.props.callback()}>Continue</button>
                        </div>

                    </section>

                </div>
            )

        }

    }


    render() {
        return (
            <Spring
                from={{bottom: "-200px"}}
                to={{bottom: "0px"}}
            >
           {styles => ( 

            <animated.div style={{...styles}} id="modalContinueCTN">

                {this.generateMessage()}
                
            </animated.div>

            )}
            </Spring>
        )
    }
}

export default  ContinueModal;
//rouge : #bb616a
