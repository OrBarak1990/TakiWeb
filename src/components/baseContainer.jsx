import React from 'react';
import ReactDOM from 'react-dom';
import LoginModal from './login-modal.jsx';
import LobbyArea from './Lobby/lobbyArea.jsx';
import BoardInput from './Lobby/boardInput.jsx';

export default class BaseContainer extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            room3: false,
            showLogin: true,
            currentUser: {
                name: ''
            }
        };
        
        this.handleSuccessedLogin = this.handleSuccessedLogin.bind(this);
        this.handleLoginError = this.handleLoginError.bind(this);
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
        this.logoutHandler= this.logoutHandler.bind(this);
        this.boardClickedSuccessHandler = this.boardClickedSuccessHandler.bind(this);

        this.getUserName();
    }
    
    render() {
        if(this.state.room3){
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

    boardClickedSuccessHandler(){
        this.setState(()=>({room3: true}));
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

    renderRoom3() {

    }

    renderRoom2() {
        return(
            <div className="chat-contaier">
                <LobbyArea boardClickedSuccessHandler={this.boardClickedSuccessHandler}/>
                <BoardInput />
            </div>
        )
        // return (<LobbyContainer boardClickedSuccessHandler={this.boardClickedSuccessHandler} />)
    }
}