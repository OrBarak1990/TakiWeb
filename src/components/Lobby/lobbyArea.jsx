import React from 'react';
import ReactDOM from 'react-dom';

export default class LobbyArea extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            boards: [],
            users: []
        };

        this.getLobbyContent = this.getLobbyContent.bind(this);
    }

    componentDidMount() {
        this.getLobbyContent();
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    render() {
        return(
            <div className="converssion-area-wrpper">
                <ul className="converssion-area-wrpper">
                    {this.state.users.map((line, index) => (<li key={line.user + index}>{line}</li>))}
                </ul>
                <ul className="converssion-area-wrpper">
                    {this.state.boards.map((line, index) => (<li data-key = {index} key={line.user.name + index} onClick={this.addEventListener.boardClicked}>{line.gameName}</li>))}
                </ul>
            </div>
        )
    }

    getLobbyContent() {
        return fetch('/chat', {method: 'GET', credentials: 'include'})
            .then((response) => {
                if (!response.ok){
                    throw response;
                }
                this.timeoutId = setTimeout(this.getLobbyContent, 2000);
                return response.json();
            })
            .then(content => {
                this.setState(()=>({boards: content.boards, users: content.users}));
            })
            .catch(err => {throw err});
    }

    boardClicked(e){
        e.preventDefault();
        let index = e.target.getAttribute('data-key');

        return fetch('/boardClicked', {method: 'POST', credentials: 'include'})
            .then((response) => {
                if (!response.ok){
                    throw response;
                }
            })
            //t
    }
}