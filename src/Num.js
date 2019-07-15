import React from 'react';
import cardelse from './assets/cardelse.png';
import card1 from './assets/meliodas.jpg';
import card2 from './assets/diane.jpg';
import card3 from './assets/elizabith.jpg';
import card4 from './assets/escanor.jpg';
import card5 from './assets/gowther.jpg';
import card6 from './assets/hoke.jpg';
import card7 from './assets/king.jpg';
import card8 from './assets/ban.jpg';
import card9 from './assets/merlin.jpg';
import flippedcard from './assets/logoCard.jpg';

export default class Num extends React.Component{
//    state = {
//        isVisible: false, 
//        
//    }; 
    clickHandler = () => {
        if (!this.props.isVisible) {
            this.props.onSelect();
        }
    }
    
    showCard = (number) => {
        var cardToShow;
        if (number === 1) {
            cardToShow = card1;
        }
        else if (number === 2) {
            cardToShow = card2;
        } else if (number === 3) {
            cardToShow = card3;
        }else if (number === 4) {
            cardToShow = card4;
        }else if (number === 5) {
            cardToShow = card5;
        }else if (number === 6) {
            cardToShow = card6;
        }else if (number === 7) {
            cardToShow = card7;
        }else if (number === 8) {
            cardToShow = card8;
        }else if (number === 9) {
            cardToShow = card9;
        }
        
        
        else {
            cardToShow = cardelse;
        }
        return <img width="110" src={cardToShow} alt='active_card'/>;
    }
    
    
    render(){
        return(
        <td onClick={this.clickHandler}>
            {(this.props.isVisible === true) ? this.showCard(this.props.number) : <img width="110" src={flippedcard} alt='card'/>}
            </td> 
        ); 
        
    }
    
}