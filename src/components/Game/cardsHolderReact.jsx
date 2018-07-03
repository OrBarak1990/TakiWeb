import ReactDOM from 'react-dom';
import React from 'react';
import CardReact from './cardReact';

export default class CardHolderReact extends React.Component {
    constructor(args) {
        super(...args);

        this.eachCard = this.eachCard.bind(this);
    }

    eachCard(card, i) {
        return(
            <CardReact game = {this.props.game} pickColorRef = {this.props.pickColorRef} isDraggable = {this.props.isDraggable} key = {card.id} index = {i} openImg = {this.props.open} image = {card.image} id = {card.id} pullCardAnimation = {card.anm} humanAnimation = {card.humanAnimation}/>
        );
    }

    render() {
        return(
            <div className={"player"} id = {this.props.cssId}>
                {this.props.cards.map(this.eachCard)}
            </div>
        );
    }
}