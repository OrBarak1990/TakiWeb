import React from 'react';
import ReactDOM from 'react-dom';
import Stack from './stackReact.jsx'
import CloseCards from './../../Images/other/many_close_cards.png'

export default class LobbyArea extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            boardDetail: undefined
        };

        this.getBoardContent = this.getBoardContent.bind(this);

        this.getBoardContent();
    }

    render(){
        return(
            <div className="container-fluid">
                <div>number of registered players: {this.state.boardDetail.registerPlayers}</div>
                <Stack cards = {[]} interactive = {false} img = {CloseCards}/>
            </div>
        );
    }

    getBoardContent() {
        let func = {func: this.writeSomthing, stam: "stam"};
        return fetch('/lobby/getBoard', {
            method: 'POST',
            body: this.props.boardDetail.gameName,
            // body: this,
            // body: JSON.stringify(func),
            credentials: 'include'
        })
        .then((response) => {
            if (!response.ok){
                this.setState(()=> ({errMessage: response.statusText}));
            }
            this.timeoutId = setTimeout(this.getBoardContent, 2000);
            return response.json();
        })
        .then(content => {
            this.setState(()=> ({boardDetail: content.boardDetail}));
        })
    }
}