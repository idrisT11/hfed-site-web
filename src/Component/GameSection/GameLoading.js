import React, { Component } from 'react'

export default class GameLoading extends Component {

    constructor(props){

        super(props);

        this.table = this.props.table;

        this.audioArray = new Array( this.table.length );

        this.nbLoadedElement = 0;
        this.nbTotalElement = this.computeNbElementToLoad();//Temporaire

    }

    computeNbElementToLoad(){

        let nbElementToLoad = 0;

        for (let i = 0; i < this.audioArray.length; i++) {

            if(this.table[i].phraseAudio)

                nbElementToLoad++;

            if(this.table[i].wordAudio)

                nbElementToLoad += this.table[i].wordAudio.length;

        }

        return nbElementToLoad;
    }

    componentDidMount(){
        for (let i = 0; i < this.audioArray.length; i++) {

            let phraseAudio = this.table[i].phraseAudio ? this.table[i].phraseAudio: null;
            let wordAudio = this.table[i].wordAudio ? this.table[i].wordAudio: null;
            
            this.audioArray[i] = {};

            if(phraseAudio)
            {
                this.audioArray[i].phrase = new Audio(phraseAudio);

                this.audioArray[i].phrase.addEventListener('loadeddata', ()=>{

                    this.nbLoadedElement++;
    
                    if(this.nbLoadedElement === this.nbTotalElement)
    
                        this.props.loadedCallback(this.audioArray);
    
                });
            }


            if (wordAudio)
            {
                this.audioArray[i].word = wordAudio.map( (url) => new Audio(url) );

                for (let j = 0; j < this.audioArray[i].word.length; j++) 
                
                    this.audioArray[i].word[j].addEventListener('loadeddata', ()=>{

                        this.nbLoadedElement++;

                        if(this.nbLoadedElement === this.nbTotalElement)

                            this.props.loadedCallback(this.audioArray);

                    });
            }

        }
    }
    render() {
        return (
            <div style={loadingStyleCtn}>
                <h1>Loading...</h1>
            </div>
        )
    }
}

const loadingStyleCtn = {
    backgroundColor: '#1b1b1b',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    color: 'white'
}
