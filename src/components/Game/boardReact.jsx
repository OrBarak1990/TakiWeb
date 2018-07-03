import React from 'react';
import ReactDOM from 'react-dom';
import Statistics from './statisticsReact'
import OpenCards from './openCardsReact'
import Stack from './stackReact'
import CardsHolder from './cardsHolderReact'
import PickColor from './pickColor'
import Clock from './clockReact'


export default class BoardReact extends React.Component {
    constructor(args) {
        super(...args);
        this.pickColorHolder =  React.createRef();
        this.setGame = this.setGame.bind(this);
        this.setTournament = this.setTournament.bind(this);
        this.restart = this.restart.bind(this);
        this.restartTournament = this.restartTournament.bind(this);
        this.eachMassage = this.eachMassage.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.state = {
            gameState: "start",
        };
    }

    changeSate(state){
        this.setState({gameState: state});
    }

    setGame(){
        this.props.manager.setStartGame(this, this.props.game);
    }

    setTournament(){
        this.props.manager.setStartTournament(this, this.props.game);
    }

    restartTournament(){
        this.props.manager.setRestartTournamentStartGame();
    }

    restart(){
        this.props.manager.setRestartStartGame();
    }


    openingWindowRender(){
        return(
            <div>
                <button id="Enter_Game" type="button" onClick={this.setGame}>Play Game</button>
                <button id="Enter_Game" type="button" onClick={this.setTournament}>Play Tournament</button>
            </div>
        );
    }

    gameRender(){
        return(
            <div className="container-fluid">
                <p id ="errors">{this.props.manager.error}</p>
                <p id ="directions">{this.props.manager.direction}</p>
                {<Clock/>}
                <div><button id="Quit_Game" type="button" style={{visibility : "visible"}} onClick={this.props.manager.setQuitGame}>Quit Game</button></div>
                <Statistics msg= {this.props.manager.statisticsMassages}/>
                <OpenCards anm = {this.props.manager.openCardAnm} card = {this.props.manager.openCard} open = {true} game = {this.props.game}/>
                <CardsHolder game = {this.props.game} cards = {this.props.manager.playersCards[0]} pickColorRef = {this.pickColorHolder} isDraggable = {true} open = {true} cssId = "playerCards" />
                <CardsHolder game = {this.props.game} cards = {this.props.manager.playersCards[1]} pickColorRef = {this.pickColorHolder} isDraggable = {false} open = {false} cssId = "computerCards" />
                <PickColor interactive = {true} visible = {this.props.manager.pickColorVidibility} ref= {this.pickColorHolder} game = {this.props.game}/>
                <Stack cards ={this.props.manager.stackCards} interactive = {true} img = {this.props.manager.stackImage} pickColorRef = {this.pickColorHolder} game = {this.props.game}/>
            </div>
        );
    }

    endGameRender(){
        return(
            <div>
                <div id = {"endGameMode"}>
                    <p id ="message">{this.props.manager.message}</p>
                    <button id={"restartGame"} onClick={this.restart}>Restart Regular Game</button>
                    <button id={"restartTournament"} onClick={this.restartTournament}>Start Tournament</button>
                    <button id={"endGame"} onClick={window.close}>Exit Game</button>
                </div>
                <div className="container-fluid">
                    <Statistics msg= {this.props.manager.statisticsMassages}/>
                    <OpenCards card =  {this.props.manager.openCard} open = {true} game = {this.props.game}/>
                    <CardsHolder cards = {this.props.manager.playersCards[0]} pickColorRef = {this.pickColorHolder} isDraggable = {false} open = {true} cssId = "playerCards" />
                    <CardsHolder cards = {this.props.manager.playersCards[1]} pickColorRef = {this.pickColorHolder} isDraggable = {false} open = {true} cssId = "computerCards" />
                    <PickColor interactive = {false} visible = {this.props.manager.pickColorVidibility} ref= {this.pickColorHolder} game = {this.props.game}/>
                    <Stack cards = {[]} interactive = {false} img = {this.props.manager.stackImage} pickColorRef = {this.pickColorHolder} game = {this.props.game}/>
                </div>
                <div>
                    <p id ="errors">{this.props.manager.error}</p>
                    <button id={"next"} onClick={this.next}>Next</button>
                    <button id={"prev"} onClick={this.prev}>Prev</button>
                </div>
            </div>
        );
    }

    next(){
        this.props.manager.next();
    }

    prev(){
        this.props.manager.prev();
    }

    endTournamentRender(){
        return(
            <div id = {"endGameMode"}>
                <div id={"message"}>
                {this.props.manager.message.map(this.eachMassage)}
                </div>
                <button id={"restartGame"} onClick={this.restart}>Start Regular Game</button>
                <button id={"restartTournament"} onClick={this.restartTournament}>Restart Tournament</button>
                <button id={"endGame"} onClick={window.close}>Exit Game</button>
            </div>
        );
    }

    eachMassage(msg,i) {
        return(
            <p key={i + 600}>{msg}</p>
        );
    }

    endGameInTournamentRender(){
        return(
            <div id = {"endGameMode"}>
                <p id ="message">{this.props.manager.message}</p>
                <button id={"restartGame"} onClick={this.restart}>Next Game</button>
            </div>
        );
    }

    render(){
        if(this.props.manager.gameState === "start")
            return this.openingWindowRender();
        else if(this.props.manager.gameState === "gaming")
            return this.gameRender();
        else if(this.props.manager.gameState === "endGame")
            return this.endGameRender();
        else if(this.props.manager.gameState === "endGameInTournament")
            return this.endGameInTournamentRender();
        else if(this.props.manager.gameState === "endTournament")
            return this.endTournamentRender();
    }
}