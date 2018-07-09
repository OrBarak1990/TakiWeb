function takiModeChecker(cards, takiMode) {
    let foundColor = false;
    for (let i = 0; i < cards.length; ++i) {
        if (cards[i].getColor() === takiMode.getColor()) {
            foundColor = true;
            break;
        }
    }

    return foundColor;
}

function removeAllCards(placeHOlder) {
    let deleteElement = document.getElementById(placeHOlder);

    while (deleteElement.hasChildNodes()) {
        deleteElement.removeChild(deleteElement.childNodes[0]);
    }
}

function getUniqueCss(color,type,separator){
    return color.concat(separator).concat(type);
}

function setCards(stock, cards) {
    for(let i = 0; i < cards.length; ++i){
        stock.push(cards[i]);
    }
}

function takeCards(stock, cardsToTake) {
    for(let i = 0; i < cardsToTake.length; ++i){
        stock.push(cardsToTake[i]);
    }
}

function takiPermission(player, card) {
    let taki = player.getTakiMode();
    return ( taki === undefined || (taki !== undefined && taki.getColor() === card.getColor()));
}

export {takiModeChecker, getUniqueCss, setCards, takeCards, takiPermission}