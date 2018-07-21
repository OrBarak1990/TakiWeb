import ReactDOM from 'react-dom';
import React from 'react';
import CloseCard from './../../Images/other/close_card.png'
import {enumCard} from './../../js/enumCard'
export default class CardReact extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            bold: false,
        };
        this.onDragStart = this.onDragStart.bind(this);
        this.fetchError = this.fetchError.bind(this);
        this.mouseover = this.mouseover.bind(this);
        this.onmouseout = this.onmouseout.bind(this);
        this.endAnimation = this.endAnimation.bind(this);
    }

    onDragStart(ev) {
        let changeColorReact = this.props.pickColorRef.current;
        if(changeColorReact.props.visible === "visible"){
            this.fetchError(enumCard.enumErrors.DRAG_CARD_WITH_CHANGE_COLOR_PICK);
            // this.props.game.renderError(enumCard.enumErrors.DRAG_CARD_WITH_CHANGE_COLOR_PICK);
            return false;
        }
        ev.dataTransfer.setData("Text", this.props.id);
    }

    fetchError(error) {
        let massage = {error: error, uniqueId: this.props.uniqueId,
            gameName: this.props.gameName};
        return fetch('/game/cardError', {
            method: 'POST',
            body: JSON.stringify(massage),
            credentials: 'include'
        })
    }

    render() {
        if(this.props.pullCardAnimation !== undefined) {
            if (this.props.humanAnimation === true) {
                return this.renderWithHumanAnimation();
            }
            else {
                return this.renderWithComputerAnimation();
            }
            // return this.renderEndAnimation();
        }
        else {
            if (!this.state.bold)
                return this.renderWithoutBold();
            else
                return this.renderWithBold();
        }
    }

    endAnimation(){
/*
        let massage = {error: error, playerID: this.props.uniqueId,
            gameName: this.props.gameName};
*/
        let massage = {uniqueID: this.props.uniqueID, gameName: this.props.gameName};

        return fetch('/game/animationCardEnd', {
            method: 'POST',
            body: JSON.stringify(massage),
            credentials: 'include'
        })
        // this.props.game.animationCardEnd();
    }

/*    renderEndAnimation(){
        return(
            <a id="regular">
                <img onAnimationEnd={this.endAnimation} style={{transition: "0.4s",animation: this.props.animationPullCardCss, position: "fixed"}} draggable={false} src={CloseCard}/>
            </a>
        );
    }*/

    renderWithComputerAnimation(){
        return(
            <a id="regular">
                <img id="endPullCardAnm" onAnimationEnd={this.endAnimation} style={{transition: "0.4s",animation: this.props.animationPullCardCss, position: "fixed"}} draggable={false} src={CloseCard}/>
            </a>
        );
    }

    renderWithHumanAnimation(){
        return(
            <a id="regular">
                <img id="endPullCardAnm" onAnimationEnd={this.endAnimation} style={{transition: "0.4s",animation: this.props.animationPullCardCss, position: "fixed"}} draggable={false} src={CloseCard}/>
            </a>
        );
    }

    renderWithBold(){
        return(
            <a id= "bold">
                <img onMouseEnter={this.mouseover} onMouseOut={this.onmouseout}
                     draggable={this.props.isDraggable} onDragStart={this.onDragStart}
                     src={this.props.openImg? this.props.images[this.props.image] : CloseCard}/>
            </a>
        );
    }

    renderWithoutBold(){
        return(
            <a id="regular">
                <img onMouseEnter={this.mouseover} onMouseOut={this.onmouseout}
                     draggable={this.props.isDraggable} onDragStart={this.onDragStart}
                     src={this.props.openImg? this.props.images[this.props.image] : CloseCard}/>
            </a>
        );
    }

    mouseover(){
        if(this.props.isDraggable){
            this.setState({bold: true});
        }
    }

    onmouseout(){
        if(this.props.isDraggable){
            this.setState({bold: false});
        }
    }
}