import React from 'react';
import ReactDOM from 'react-dom';

export default class CardHolderReact extends React.Component {
    constructor(args) {
        super(...args);
        this.Drop = this.Drop.bind(this);
        this.renderWithAnimation = this.renderWithAnimation.bind(this);
        this.renderWithoutAnimation = this.renderWithoutAnimation.bind(this);
        this.finishAnimation = this.finishAnimation.bind(this);
    }

    render() {
        if(this.state !== null) {
            if (this.state.anm) {
                this.state = null;
                return this.renderWithAnimation();
            }
            this.state = null;
            return this.renderWithoutAnimation();
        }else{
            if (this.props.anm)
                return this.renderWithAnimation();
            return this.renderWithoutAnimation();
        }
    }

    finishAnimation(){
        this.setState({anm: false});
    }

    renderWithAnimation(){
        return(
            <div onAnimationEnd={this.finishAnimation} onDragOver={this.allowDrop} onDrop = {this.Drop} id = {"openCards"} style={{transition: "0.6s",animation: "opencard_move 1.5s"}} >
                <img draggable={false} src={this.props.card.image}/>
            </div>
        );
    }

    renderWithoutAnimation(){
        return(
            <div onDragOver={this.allowDrop} onDrop = {this.Drop} id = {"openCards"}>
                <img draggable={false} src={this.props.card.image}/>
            </div>
        );
    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    Drop(ev) {
        let id = ev.dataTransfer.getData("Text");
        this.props.game.setDrop(id);
    }
}