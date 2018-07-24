import React from 'react';
import ReactDOM from 'react-dom';

export default class LobbyArea extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            users : [],
            boards : [],
            errMessage : ""
        };

        this.getLobbyContent = this.getLobbyContent.bind(this);
        this.boardClicked = this.boardClicked.bind(this);
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
                <h2>UsersName:</h2>
                <ul className="converssion-area-wrpper">
                    {this.state.users.map((user, index) => (<li key={100 + index}>{user}</li>))}
                </ul>
                <ul className="toolbar">
                    <li><a className="toolbar-item" >Number</a></li>
                    <li><a className="toolbar-item" >Title</a></li>
                    <li><a className="toolbar-item" >Players Active</a></li>
                    <li><a className="toolbar-item" >Players Capacity</a></li>
                </ul>
                <ul className="converssion-area-wrpper">
                    {this.state.boards.map((board, index) => (
                        <div className="singleBoardInLobby" key={200 + index} style ={{background:board.color}}>
                            <li><a className = "singleBoardItem" data-key = {index} >{index + 1}</a></li>
                            <li><a className = "singleBoardItem" data-key = {index} >{board.gameName}</a></li>
                            <li><a className = "singleBoardItem" data-key = {index} >{board.registerPlayers}.</a></li>
                            <li><a className = "singleBoardItem" data-key = {index} >{board.numOfPlayers}</a></li>
                            <button className="EnterGameButton" data-key = {index} type="button" disabled={this.state.sendInProgress} onClick={this.boardClicked}>Play Game</button>
                            <button className="ViewGameButton"  data-key = {index} type="button" disabled={this.state.sendInProgress}>View Game</button>
                         </div>
                    ))}
                </ul>
            </div>
        )
    }

    getLobbyContent() {
        return fetch('/lobby', {method: 'GET', credentials: 'include'})
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
        this.setState(()=>({sendInProgress: true}));
        let index = e.target.getAttribute('data-key');
        let boardDetail = this.state.boards[index];
        return fetch('/lobby/boardClicked', {
            method: 'POST',
            body: JSON.stringify(boardDetail),
            credentials: 'include'
        })
        .then((response) => {
            if (!response.ok){
                this.setState(()=> ({errMessage: response.statusText}));
            }
            this.setState(()=>({sendInProgress: false}));
            return response.json();
        })
        .then(content => {
            this.setState(()=> ({errMessage: ""}));
            this.props.boardClickedSuccessHandler(content.boardDetail);
        })
    }
}