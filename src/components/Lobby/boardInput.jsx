import React from 'react';
import ReactDOM from 'react-dom';

export default class BoardInput extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            sendInProgress:false
        };

        this.sendText = this.sendText.bind(this);
    }

    render() {
        return(
            <form className="chat-input-wrapper" onSubmit={this.sendText}>
                <input disabled={this.state.sendInProgress} placeholder="enter text here" ref={input => this.inputElement = input} />
                <input type="submit" className="btn" disabled={this.state.sendInProgress} value="Send" />
            </form>
        )
    }

    sendText(e) {
        e.preventDefault();
        this.setState(()=>({sendInProgress: true}));
        const gameName = this.inputElement.value;
        const numOfPlayers = this.inputElement.value;
        fetch('/chat', {
            method: 'POST',
            body: {name: gameName, numOfPlayers: numOfPlayers, active: false},
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