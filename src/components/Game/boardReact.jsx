import css from '../../css/cards.css'
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
        this.eachPlayer = this.eachPlayer.bind(this);
        this.gameRender = this.gameRender.bind(this);
        this.firstRender = this.firstRender.bind(this);
        this.getGameContent = this.getGameContent.bind(this);
        this.importAll = this.importAll.bind(this);
        // this.next = this.next.bind(this);
        // this.prev = this.prev.bind(this);
        this.state = {
            manager: undefined,
        };
        this.images = {};
    }

    componentDidMount(){
        this.getGameContent();
        this.images = Object.assign((this.importAll(require.context('./../../Images/blue', false, /\.(png|jpe?g|svg)$/))),
            (this.importAll(require.context('./../../Images/green', false, /\.(png|jpe?g|svg)$/))),
            (this.importAll(require.context('./../../Images/other', false, /\.(png|jpe?g|svg)$/))),
            (this.importAll(require.context('./../../Images/red', false, /\.(png|jpe?g|svg)$/))),
            (this.importAll(require.context('./../../Images/yellow', false, /\.(png|jpe?g|svg)$/))));
    }

    importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    render(){
        if (this.state.manager === undefined)
            return this.firstRender();
        return this.gameRender();
    }

    firstRender(){
        return(
            <div className="container-fluid">
            </div>
        );
    }

    gameRender(){
        return(
            <div className="container-fluid">
                <p id ="errors">{this.state.manager.player.error}</p>
                <p id ="directions">{this.state.manager.player.direction}</p>
                {<Clock/>}
                {/*<Statistics msg= {this.state.manager.player.statisticsMassages}/>*/}
                <OpenCards uniqueID={this.props.uniqueID} gameName={this.props.gameName} images = {this.images} anm = {this.state.manager.player.openCardAnm} card = {this.state.manager.openCard} open = {true}/>
                {this.state.manager.playersCards.map(this.eachPlayer)}
                <PickColor interactive = {true} visible = {this.state.manager.player.pickColorVidibility} ref= {this.pickColorHolder}/>
                <Stack uniqueID={this.props.uniqueID}  myModul = {this.props.myModul} gameName={this.props.gameName} images = {this.images} cards ={this.state.manager.player.stackCards} interactive = {true} img = {this.state.manager.stackImage} pickColorRef = {this.pickColorHolder}/>
            </div>
        );
    }

/*    gameRender(){
        return(
            <div className="container-fluid">
                <p id ="errors">{undefined}</p>
                <p id ="directions">{undefined}</p>
                {<Clock/>}
                {/!*<Statistics msg= {this.state.manager.player.statisticsMassages}/>*!/}
                <OpenCards images = {this.images} anm = {false} card = {this.state.manager.openCard} open = {true}/>
                {this.state.manager.playersCards.map(this.eachPlayer)}
                <PickColor interactive = {true} visible = {false} ref= {this.pickColorHolder}/>
                <Stack uniqueID={this.props.uniqueID}  myModul = {this.props.myModul} gameName={this.props.gameName} images = {this.images} cards ={this.state.manager.stackCards} interactive = {true} img = {this.state.manager.stackImage} pickColorRef = {this.pickColorHolder}/>
            </div>
        );
    }*/


    eachPlayer(cards, i) {
        return (
            <CardsHolder key = {555 + i} cards={cards} pickColorRef={this.pickColorHolder}
                 isDraggable={i % this.props.myModul === 0}
                 images = {this.images}
                 open={i % this.props.myModul === 0}
                 cssId={Object.keys(enumCard.enumReactPosition)[i % this.props.myModul]}
                 uniqueID = {this.props.uniqueID}
                 gameName={this.props.gameName}
                 />
        );
    }


    getGameContent() {
        let massage = {uniqueID: this.props.uniqueID, gameName: this.props.gameName};
        return fetch('/game/pull', {
            method: 'POST',
            body: JSON.stringify(massage),
            credentials: 'include'
        })
            .then((response) => {
                if (!response.ok){
                    this.setState(()=> ({errMessage: response.statusText}));
                }
                this.timeoutId = setTimeout(this.getGameContent, 200);
                return response.json();
            })
            .then(content => {
                this.setState(()=> ({manager: content.manager}));
            })
    }

//  const uniqueId = req.body
//{error: board.stateManagment.errors[uniqueId], }
}