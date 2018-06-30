import React from 'react';
import ReactDOM from 'react-dom';
import ConverssionArea from './converssionArea.jsx';
import ChatInput from './chatInput.jsx';
import LobbyArea from "./lobbyArea";
import BoardInput from "./boardInput";

export default function() {
    return(
        <div className="chat-contaier">
            <LobbyArea />
            <BoardInput />
        </div>
    )
}