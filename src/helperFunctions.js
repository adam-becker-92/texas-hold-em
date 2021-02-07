const cardWeight = (card) => {
    switch (card) {
        case 'J':
            return 11;
        case 'Q':
            return 12;
        case 'K':
            return 13;
        case 'A':
            return 14;
        default:
            return parseInt(card);
    }
};
export { cardWeight };
