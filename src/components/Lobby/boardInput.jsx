import React from 'react';
import ReactDOM from 'react-dom';

export default class BoardInput extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            sendInProgress:false
        };

        this.addBoard = this.addBoard.bind(this);
    }

    render() {
        return(
            <form className="chat-input-wrapper" onSubmit={this.addBoard}>
                <input disabled={this.state.sendInProgress} placeholder="enter game name here" ref={input => this.inputElement = input} />
                <input disabled={this.state.sendInProgress} placeholder="enter number of players" ref={input => this.numPlayers = input} />
                <input type="submit" className="btn" disabled={this.state.sendInProgress} value="Send" />
            </form>
        )
    }

    addBoard(e) {
        e.preventDefault();
        this.setState(()=>({sendInProgress: true}));
        const gameName = this.inputElement.value;
        const numOfPlayers = parseInt(this.numPlayers.value);
        let text = {name: gameName, numOfPlayers: numOfPlayers};
        fetch('/lobby', {
            method: 'POST',
            body: JSON.stringify(text),
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                this.setState(()=>({sendInProgress: false}));
                this.inputElement.value = '';
            });
        return false;
    }
}