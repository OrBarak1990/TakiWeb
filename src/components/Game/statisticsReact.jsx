import React from 'react';
import ReactDOM from 'react-dom';

export default class StatisticsReact extends React.Component {
    constructor(args) {
        super(...args);
    }

    render()
    {
        let messages = this.props.msg;
        let turnPlayed = messages[0];
        let currentPlayerTurn  = messages[1];
        messages = messages.slice(2,messages.length);
        return(
            <div id = {"statistics"}>
                <h2>Statistics:</h2>
                <h3>Game Statistics:</h3>
                <p>{turnPlayed}</p>
                <div id = {"CurrentTurn"}>
                    <p>{currentPlayerTurn}</p>
                </div>
                {messages.map(this.eachMassage)}
            </div>
        );
    }

    eachMassage(msg, i) {
        return(
            <p key={i + 200}>{msg}</p>
        );
    }
}