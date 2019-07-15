import React from 'react';
import Num from './Num.js'; 
import './App.css';
import WrongAudio from './assets/Wrong-ans.mp3';
import CorrectAudio from './assets/ding.mp3';
//import GameAudio from '#';
import WinAudio from './assets/win.mp3';
import GameOverAudio from './assets/GameOver.mp3';




function randomTo(max) { 
    return Math.floor(Math.random() * max);
}

function generateNumbers() {
    const baseArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
    const arrToReturn = [[], [], []];
    var j = 0;
    var count = 0;
    while (baseArray.length) {
        var inx = randomTo(baseArray.length);        
        arrToReturn[j].push(baseArray[inx]);
        baseArray.splice(inx, 1);
        count++;
        if (count > 5) {
            count = 0;
            j++;
        }
    }
    return arrToReturn;
}


class  App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            previousNumber: null,
            visibleNums: [],
            canPlay: true,
            message: '',
            ansMessage: '', 
            score:0,
            numbers: generateNumbers(),
            chances: 5, 
            isPreviewing: true, 
            preview: 2, 

        }
        this.wrongAudio = new Audio(WrongAudio);
        this.correctAudio = new Audio(CorrectAudio); 
        this.gameoverAudio = new Audio(GameOverAudio);
        this.winAudio = new Audio(WinAudio); 
    } 

    componentDidMount() {
        this.reset();
    }
    
    preview = (row, column, number)=> {
        this.setState({
            
            canPlay: false,

            isPreviewing: true, 
             
        }, () => {
            setTimeout(() => {
                this.setState({
                    isPreviewing: false,
                    canPlay: true,
                    preview: this.state.preview-1,
                    
                })
            }, 2000);
        });
    }
    
    reset = (row, column, number)=> {
        this.setState({
            previousNumber: null,
            visibleNums: [],
            canPlay: false,
            message: '',
            ansMessage: '', 
            score:0,
            numbers: generateNumbers(),
            chances: 5, 
            isPreviewing: true, 
            preview: 2, 
        }, () => {
            setTimeout(() => {
                this.setState({
                    isPreviewing: false,
                    canPlay: true,
                
                })
            }, 5000);
        });
    }
    
    
    
    onSelectHandler = (row, column, number) => {
        if (this.state.canPlay === false) return;
        
        console.log(row, column, number)
        var oldVisibleNums = this.state.visibleNums;
        oldVisibleNums.push(`${row}-${column}`);
        this.setState({
            visibleNums: oldVisibleNums,
        }, () => {
            if (!this.state.previousNumber) { 
                this.setState({
                    previousNumber: number,
                })
            } else { 
                if (number === this.state.previousNumber) {
                    this.correctAudio.play();
                    this.setState({
                        previousNumber: null,
                        ansMessage: "Correct ^^", 
                        score: this.state.score +1, 
                    }, () => {
                        if (this.state.score === 9){
                            this.winAudio.play(); 
                            this.setState({
                                canPlay: false,
                                message:"You Win ^_^",
                        })
                
                    }
                    });
                }else {
                    this.wrongAudio.play();
                    this.setState({
                        ansMessage: "WRONG!",
                        canPlay: false, 
                        chances: this.state.chances-1
                    }, () => {
                        if (this.state.chances  === 0 ){
                            this.gameoverAudio.play();
                            this.setState({
//                                previousNumber: null,
//                                visibleNums: oldVisibleNums,
                                canPlay: false,
                                message: "GAME OVER :(",
                            })
                            
                        } else {
                            setTimeout(() => {
                                oldVisibleNums.pop();
                                oldVisibleNums.pop();
                                
                                 
                                this.setState({
                                    previousNumber: null,
                                    visibleNums: oldVisibleNums,
                                    canPlay: true,
                                    message: "",
                                })
                            }, 1000);
                        }
                    })
                }
            }
        })
    }

    
    render() {
        return (
        <div className="App"> 
            <div className="card">
          <table className="card-grid"> 
          <tbody>
            { this.state.numbers.map((row, i) => {
            return(
              <tr key={row}> 
               { row.map((number, j)=> {
                return (
                 <Num key={Math.random()} number={number} 
                  isVisible={this.state.isPreviewing || this.state.visibleNums.includes(`${i}-${j}`)} 
                  onSelect={() => this.onSelectHandler(i, j, number)}/> 

                ); 
               })}
            </tr> 

            ); 

            })}
            </tbody>
        </table>
            <div className={`overlay-message ${this.state.message && 'is-visible'}`}>
                <h2>{this.state.message}</h2>
            </div>
        </div> 
        <p id="ansMessage">{this.state.ansMessage} </p>  

        <div className="score">
            <p id="score"> Score: {this.state.score}</p>
            <p id ="chnces"> Chances: {this.state.chances}</p>
            <p id ="preview"> Hint: {this.state.preview}</p> 
        </div> 
        <button id="reset" onClick={this.reset}> Reset </button> 
        <button disabled={this.state.preview === 0 || this.state.score === 9} id="hint" onClick={this.preview}>Hint</button>
      </div>
         ); 
         }
    }

export default App;
