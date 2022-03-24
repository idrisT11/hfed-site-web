import React from 'react';
import {Spring, animated} from 'react-spring';

//        <Spring>



class ProgressionBar extends React.Component {



  render(){

    let adv = this.props.level*100/this.props.nbLevel,
        step = 100/this.props.nbLevel;

    return (
      <div id="Container-ProgBar" style={barStyle}>

        
        <Spring 
            from={{width: Math.max(adv - step, 0) + "%"}}
            to={{width: adv + "%"}}
        >
          {
            stylesAnim => (
              <animated.div id="advancement-ProgBar" style={{...stylesAnim, ...advStyle}}>
            
              </animated.div>
            )
          }
          
        </Spring>

      </div>
    );
  }

}

export default ProgressionBar;

const barStyle = {
    backgroundColor : "#667c8b9f",
    width: "100%",

};

const advStyle = {
    backgroundColor : "#4b6cb8",
    margin: 0,
    height: '100%',

};




