import { cardWeight } from './helperFunctions';
export var Result;
(function (Result) {
    Result[Result["WIN"] = 1] = "WIN";
    Result[Result["LOSS"] = 2] = "LOSS";
    Result[Result["TIE"] = 3] = "TIE";
})(Result || (Result = {}));
var Values;
(function (Values) {
    Values[Values["HIGHCARD"] = 1] = "HIGHCARD";
    Values[Values["PAIR"] = 2] = "PAIR";
    Values[Values["TWO_PAIRS"] = 3] = "TWO_PAIRS";
    Values[Values["THREE_OF_A_KIND"] = 4] = "THREE_OF_A_KIND";
    Values[Values["STRAIGHT"] = 5] = "STRAIGHT";
    Values[Values["FLUSH"] = 6] = "FLUSH";
    Values[Values["FULL_HOUSE"] = 7] = "FULL_HOUSE";
    Values[Values["FOUR_OF_A_KIND"] = 8] = "FOUR_OF_A_KIND";
    Values[Values["STRAIGHT_FLUSH"] = 9] = "STRAIGHT_FLUSH";
    Values[Values["ROYAL_FLUSH"] = 10] = "ROYAL_FLUSH";
})(Values || (Values = {}));
export default class PokerHand {
    constructor(hand) {
        this.flush = false;
        this.straight = false;
        this.pairs = [];
        const sortedCards = this.sortCards(hand);
        this.generateHash(sortedCards);
        this.checkIfStraight(sortedCards);
    }
    get isFlushHand() {
        return this.flush;
    }
    get isStraightHand() {
        return this.straight;
    }
    get isFourOfAKind() {
        return this.fourOfAKind;
    }
    get isThreeOfAKind() {
        return this.threeOfAKind;
    }
    get hasPairs() {
        return this.pairs;
    }
    sortCards(hand) {
        return hand
            .split(' ')
            .map(card => {
            const num = card[0];
            return {
                weight: cardWeight(num),
                card
            };
        })
            .sort((a, b) => a.weight - b.weight)
            .map(({ card }) => card)
            .join(' ');
    }
    generateHash(hand) {
        const flushHash = {};
        const numberHash = {};
        const cards = hand
            .split(' ')
            .map(card => [card[0], card[1]]);
        cards.forEach((card) => {
            const [num, suit] = card;
            if (!flushHash[suit]) {
                flushHash[suit] = true;
            }
            if (numberHash[num]) {
                numberHash[num] = numberHash[num] + 1;
            }
            else {
                numberHash[num] = 1;
            }
        });
        this.flush = Object.keys(flushHash).length === 1;
        Object.keys(numberHash).forEach((number) => {
            const count = numberHash[number];
            const num = parseInt(number);
            if (count === 4) {
                this.fourOfAKind = num;
            }
            if (count === 3) {
                this.threeOfAKind = num;
            }
            if (count === 2) {
                this.pairs.push(num);
            }
        });
    }
    checkIfStraight(hand) {
        const sequence = '2345678910JQKA';
        const numbers = hand.split(' ').map(card => card[0]);
        const handSequence = numbers
            .sort((a, b) => parseInt(a) - parseInt(b))
            .join('');
        this.straight = sequence.indexOf(handSequence) > -1;
    }
    compareWith() {
        return Result.TIE;
    }
}
