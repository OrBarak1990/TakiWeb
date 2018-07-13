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
                <h2>New Board:</h2>
                <input disabled={this.state.sendInProgress} placeholder="enter game name here" ref={input => this.inputElement = input} />
                <select disabled={this.state.sendInProgress} ref={input => this.numPlayers = input}>
                    <option value="2">2</option>
                    <option value="4">4</option>
                </select>
                    <label id = "checkbox1">
                        <label>Coumputer</label>
                        <input  type = "checkbox" disabled={this.state.sendInProgress} placeholder="enter number of players" ref={input => this.computer = input} />
                    </label>
                <input type="submit" className="btn" disabled={this.state.sendInProgress} value="Send" />
            </form>
        )
    }

    addBoard(e) {
        e.preventDefault();
        this.setState(()=>({sendInProgress: true}));
        const gameName = this.inputElement.value;
        const numOfPlayers = parseInt(this.numPlayers.value);
        const computer = this.computer.checked;
        let text = {name: gameName, numOfPlayers: numOfPlayers, computer: computer};
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