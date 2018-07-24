import React from 'react';
import ReactDOM from 'react-dom';
import LoginModal from './login-modal.jsx';
import LobbyArea from './Lobby/lobbyArea.jsx';
import BoardInput from './Lobby/boardInput.jsx';
import BoardReact from './Game/boardReact.jsx';
import PreGame from './Game/preGame.jsx';
import {enumCard} from "../js/enumCard";

export default class BaseContainer extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            room3: false,
            room4: false,
            showLogin: true,
            currentUser: {
                name: ''
            }
        };

        this.backToLoginScreen = this.backToLoginScreen.bind(this);
        this.handleSuccessedLogin = this.handleSuccessedLogin.bind(this);
        this.handleLoginError = this.handleLoginError.bind(this);
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
        this.logoutHandler= this.logoutHandler.bind(this);
        this.boardClickedSuccessHandler = this.boardClickedSuccessHandler.bind(this);
        this.viewGameSuccessHandler = this.viewGameSuccessHandler.bind(this);
        this.enterGameHandler = this.enterGameHandler.bind(this);
        this.enterViewerGame = this.enterViewerGame.bind(this);
        this.getPos = this.getPos.bind(this);
        this.exitGame = this.exitGame.bind(this);

        this.getUserName();
    }
    
    render() {
        if(this.state.room4)
            return this.renderRoom4();
        else if(this.state.room3){
            return this.renderRoom3();
        }else if (this.state.showLogin) {
            return (<LoginModal loginSuccessHandler={this.handleSuccessedLogin} loginErrorHandler={this.handleLoginError}/>)
        }
        return this.renderRoom2();
    }


    handleSuccessedLogin() {
        this.setState(()=>({showLogin: false}), this.getUserName);
    }

    handleLoginError() {
        console.error('login failed');
       this.setState(()=>({showLogin: true}));
    }

    backToLoginScreen(){
        this.setState(()=>({showLogin: true}));
    }

    boardClickedSuccessHandler(boardDetail){
        this.setState(()=>({viewer: false, room3: true, boardDetail: boardDetail}));
    }

    viewGameSuccessHandler(boardDetail){
        if(boardDetail.registerPlayers === boardDetail.numOfPlayers)
            this.enterViewerGame(boardDetail);
        else
            this.setState(()=>({viewer: true, room3: true, boardDetail: boardDetail}));
    }

    enterViewerGame(boardDetail){
        return fetch('/game/viewerEnter', {
            method: 'POST',
            body: JSON.stringify(boardDetail),
            credentials: 'include'
        })
            .then((response) => {
                if (!response.ok){
                    this.setState(()=> ({errMessage: response.statusText}));
                }
                return response.json();
            })
            .then(content => {
                this.setState(()=>({room4: true, room3: false, myIndex: content.uniqueId, viewer: true}));
            })
    }

    enterGameHandler(boardDetail){
        return fetch('/game', {
            method: 'POST',
            body: JSON.stringify(boardDetail),
            credentials: 'include'
        })
            .then((response) => {
                if (!response.ok){
                    this.setState(()=> ({errMessage: response.statusText}));
                }
                return response.json();
            })
            .then(content => {
                this.setState(()=>({room4: true, room3: false, myIndex: content.uniqueId}));
            })
    }

   /* renderChatRoom() {
        return(
            <div className="chat-base-container">
                <div className="user-info-area">
                    Hello {this.state.currentUser.name}
                    <button className="logout btn" onClick={this.logoutHandler}>Logout</button>
                </div>
                <ChatContaier />                
            </div>
        )
    }
    */

    getUserName() {
/*        this.fetchUserInfo()
        .then(userInfo => {
            this.setState(()=>({currentUser:userInfo, showLogin: false}));
        })
        .catch(err=>{            
            if (err.status === 401) { // incase we're getting 'unautorithed' as response
                this.setState(()=>({showLogin: true}));
            } else {
                throw err; // in case we're getting an error
            }
        });*/
        fetch('/users',{method: 'GET', credentials: 'include'})
        .then(response => {
            if (response.ok){
                let userInfo = response.json();
                this.setState(()=>({currentUser:userInfo, showLogin: false}));
            }else{
                this.setState(()=>({currentUser: {name: ''}, showLogin: true}));
            }
        });
    }

    fetchUserInfo() {        
        return fetch('/users',{method: 'GET', credentials: 'include'})
        .then(response => {
            if (response.ok){
                return response.json();
            }
            return response.json();
        });
    }

    logoutHandler() {
        fetch('/users/logout', {method: 'GET', credentials: 'include'})
        .then(response => {
            if (!response.ok) {
                console.log(`failed to logout user ${this.state.currentUser.name} `, response);                
            }
            this.setState(()=>({currentUser: {name:''}, showLogin: true}));
        })
    }

    /*TODO:: adding props for: is computer and number of players
    * */
    renderRoom3() {
        return(
            <PreGame viewer = {this.state.viewer} viewGameSuccessHandler = {this.viewGameSuccessHandler} enterGameHandler = {this.enterGameHandler} boardDetail = {this.state.boardDetail}/>
        )
    }

    renderRoom2() {
        return(
            <div className="chat-contaier">
                <button id="Quit_Game" type="button" style={{width: "100px", visibility : "visible"}} onClick={this.backToLoginScreen}>Logout</button> {/*//TODO: remove the user*/}
                <LobbyArea boardClickedSuccessHandler={this.boardClickedSuccessHandler}/>
                <BoardInput />
            </div>
        )
        // return (<LobbyContainer boardClickedSuccessHandler={this.boardClickedSuccessHandler} />)
    }

    exitGame(){
        let massage = {gameName: this.state.boardDetail.gameName};
        fetch('/game/finishGame', {
            method: 'POST',
            body: JSON.stringify(massage),
            credentials: 'include'
        })
        .then(response => {
            if (response.ok){
                this.setState(()=>({room4: false}));
            }
        });
    }

    renderRoom4() {
        return(
            <BoardReact viewer = {this.state.viewer} exitGame = {this.exitGame} enumReactPosition = {this.getPos()} uniqueID = {this.state.myIndex} gameName = {this.state.boardDetail.gameName}/>
        )
    }

    getPos() {
        if(this.state.myIndex === 0 )
            return enumCard.enumReactPosition_0;
        else if(this.state.myIndex === 1 )
            return enumCard.enumReactPosition_1;
        else if(this.state.myIndex === 2 )
            return enumCard.enumReactPosition_2;
        return enumCard.enumReactPosition_3;
    }
}

/*
TODO: the get user name for first request, and for new window in same session is no good:
    1. in the first request there is a warning, we need to change the response from error
    2. in opening new window, the updateManagement will be correct only if we in login or in lobby
 */

/*
* TODO: add button for if the user want ine of the players will be computer
*/
