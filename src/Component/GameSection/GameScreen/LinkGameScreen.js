import React, { Component } from 'react'
import {Spring, animated} from 'react-spring'

import "Style/GameScreen.css";
import "Style/LinkStyle.css";

export default class LinkGameScreen extends Component {


    constructor(props){
        super(props);

        //Proposition list
        this.pairs = this.props.table.cpl;

        this.shuffledPairs = this.shuffle(this.pairs);

        this.audioData = this.props.audioData;
        
        this.selectedType = -1;//0 : Native, 1: Foreign
        this.selectedLine = -1;

        this.nbError = 0;

        this.state = {
            grayWords: [],
            selectedWord: ''
        }

        this.props.handleUserAnswer('', ['dummy']);
    }

    shuffle(tab){
        let newTab = [];

        let remaing_i = this.pairs.map((v, i)=>i),//On crée un tableau content les nombre de [0, 1, ..., len-1]
            remaing_j = [...remaing_i];//On copie

        remaing_i = remaing_i.sort((a, b)=> 0.5-Math.random());//On shuffle
        remaing_j = remaing_j.sort((a, b)=> 0.5-Math.random());

        for (let i = 0; i < this.pairs.length; i++) {

            newTab.push([
                tab[ remaing_i[i] ][0], tab[ remaing_j[i] ][1]
            ]);

            
        }

        return newTab;
    }

    getPairInLine(word, type){
        let i = 0;

        while (i < this.pairs.length && this.pairs[i][type] != word) 
            i++;

        return i;

        
    }

    handleClick(i, selectedWord, grayWords, currentType){

        //Condition khay
        let currentWord = this.shuffledPairs[i][currentType];

        if ( currentWord != selectedWord 
            && !grayWords.includes( currentWord )) 
        {
            if(this.selectedType != currentType)
            {
                if (selectedWord == '') 
                {
                    this.selectedType = currentType;
                    this.selectedLine = this.getPairInLine(currentWord, currentType);
                    console.log(this.selectedLine);
                    this.setState({
                        selectedWord: currentWord
                    });

                }
                else
                {
                    let correctWord = this.pairs[this.selectedLine][!this.selectedType+0];//JS MAGIC
                    let selected = this.state.selectedWord;

                    if ( currentWord == correctWord) {

                        this.selectedType = -1;
                        this.selectedLine = -1;
                        this.setState({
                            selectedWord: '',
                            grayWords: [...grayWords, currentWord, selected]
                        }, ()=>this.verifyEnd());

                    }
                    else
                    {
                        this.nbError++;
                        this.selectedType = -1;
                        this.selectedLine = -1;
                        this.setState({
                            selectedWord: '',
                        }, ()=>this.verifyEnd());

                    }
                }


            }
        }

    }

    generateWordPairs(selectedWord, grayWords){
        let pairsElem = [];

        for (let i = 0; i < this.shuffledPairs.length; i++) 
            
            pairsElem.push(
                <div className='linePair' key={i}>
                    <div 
                        className={grayWords.includes(this.shuffledPairs[i][0]) ? 'grayWords': 'pairElement'}
                        id={this.shuffledPairs[i][0] == selectedWord ? 'selected': 'non-selected'}//khra
                        
                        onClick={()=>this.handleClick(i, selectedWord, grayWords, 0)}
                    >
                        {this.shuffledPairs[i][0]}
                    </div>

                    <div 
                        className={grayWords.includes(this.shuffledPairs[i][1]) ? 'grayWords': 'pairElement'}
                        id={this.shuffledPairs[i][1] == selectedWord ? 'selected': 'non-selected'}//khra
                        onClick={()=>this.handleClick(i, selectedWord, grayWords, 1)}
                    >
                        {this.shuffledPairs[i][1]}
                    </div>

                </div>
            );
            
        return pairsElem;
    }

    verifyEnd(){
        if (this.state.grayWords.length == 2 * this.pairs.length) 
        {
            this.props.handleUserAnswer('dummy');
            this.props.validateCallback();    
        }
        else if(this.nbError >= 5)
        {
            this.props.handleUserAnswer('ghalet-dummy');
            this.props.validateCallback();    
        }
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
                    <h1 id="Consigne">Link the pairs of words : </h1>

                    <div id="wordPairsCTN">
                          {this.generateWordPairs(this.state.selectedWord, this.state.grayWords)}
                    </div>

                </div>
                
                <svg xmlns="http://www.w3.org/2000/svg" transform="scale(-1,1)">
                    <path fill="#273036" fillOpacity="1" d="M 0 0 L 0 200 C 0 250 100 200 100 250 L 100 350 C 100 400 150 350 150 400 C 150 500 150 500 50 500 Q 0 500 0 550 C 0 600 0 600 50 600 L 250 600 L 250 0 L 0 0 "></path>
                </svg>

            </div>
        )
    }
}

function randus_4() {
    return 0 + (Math.random() * (4-0));
}

