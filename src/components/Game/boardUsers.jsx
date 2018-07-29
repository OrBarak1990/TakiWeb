import React from 'react';
import ReactDOM from 'react-dom';

export default class BoardUsersReact extends React.Component {
    constructor(args) {
        super(...args);
    }

    render() {
        return (
            <div id="players-Viewers-Name">
                <p className="boldName">Players names:</p>
                {this.props.playersMsg.map(this.eachMassage)}
                <p className="boldName">Viewers names:</p>
                {this.props.viewersMsg.map(this.eachMassage)}
            </div>
        );
    }

    eachMassage(msg, i) {
        return (
            <p key={i + 200}>{msg}</p>
        );
    }
}