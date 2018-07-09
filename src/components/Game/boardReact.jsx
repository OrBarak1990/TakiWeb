import React from 'react';
import ReactDOM from 'react-dom';
import Statistics from './statisticsReact.jsx'
import OpenCards from './openCardsReact.jsx'
import Stack from './stackReact.jsx'
import CardsHolder from './cardsHolderReact.jsx'
import PickColor from './pickColor.jsx'
import Clock from './clockReact.jsx'
import {enumCard} from "../../js/enumCard";


export default class BoardReact extends React.Component {
    constructor(args) {
        super(...args);
        this.pickColorHolder =  React.createRef();
        this.setGame = this.setGame.bind(this);
        this.setTournament = this.setTournament.bind(this);
        this.restart = this.restart.bind(this);
        this.restartTournament = this.restartTournament.bind(this);
        this.eachMassage = this.eachMassage.bind(this);
        this.eachPlayer = this.eachPlayer.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.state = {
            gameState: "start",
        };
    }


    gameRender(){
        return(
            <div className="container-fluid">
                <p id ="errors">{this.props.manager.error}</p>
                //this.state.gameDetails.
                <p id ="directions">{this.props.manager.direction}</p>
                {<Clock/>}
                <Statistics msg= {this.props.manager.statisticsMassages}/>
                <OpenCards anm = {this.props.manager.openCardAnm} card = {this.props.manager.openCard} open = {true}/>
                {this.props.manager.playersCards.map(this.eachPlayer)}
                <PickColor interactive = {true} visible = {this.props.manager.pickColorVidibility} ref= {this.pickColorHolder}/>
                <Stack cards ={this.props.manager.stackCards} interactive = {true} img = {this.props.manager.stackImage} pickColorRef = {this.pickColorHolder}/>
            </div>
        );
    }

    pullCardHandler(uniqueId){
        this.setState({stackAnm: uniqueId % this.props.myIndex});
    }

    eachPlayer(cards, i) {
        return (
            <CardsHolder cards={cards} pickColorRef={this.pickColorHolder}
                 isDraggable={i % this.props.myIndex === 0}
                 open={i % this.props.myIndex === 0}
                 cssId={Object.keys(enumCard.enumReactPosition)[i % this.props.myIndex]}/>
        );
    }


    getBoardContent() {
        return fetch('/game', {
            method: 'PUT',
            body: {uniqueID: this.props.myIndex, boardName: this.props.boardName},
            credentials: 'include'
        })
            .then((response) => {
                if (!response.ok){
                    this.setState(()=> ({errMessage: response.statusText}));
                }
                this.timeoutId = setTimeout(this.getBoardContent, 200);
                return response.json();
            })
            .then(content => {
                if(content.pullAnm === true)
                    this.pullCardHandler(content.uniqueId);
                this.setState(()=> ({gameDetails: content.gameDetails}));
            })
    }

//  const uniqueId = req.body
//{error: board.stateManagment.errors[uniqueId], }
}