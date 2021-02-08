import { cardWeight } from './helperFunctions';
export var Result;
(function (Result) {
    Result[Result["WIN"] = 1] = "WIN";
    Result[Result["LOSS"] = 2] = "LOSS";
    Result[Result["TIE"] = 3] = "TIE";
})(Result || (Result = {}));
var Hand;
(function (Hand) {
    Hand[Hand["HIGHCARD"] = 1] = "HIGHCARD";
    Hand[Hand["PAIR"] = 2] = "PAIR";
    Hand[Hand["TWO_PAIRS"] = 3] = "TWO_PAIRS";
    Hand[Hand["THREE_OF_A_KIND"] = 4] = "THREE_OF_A_KIND";
    Hand[Hand["STRAIGHT"] = 5] = "STRAIGHT";
    Hand[Hand["FLUSH"] = 6] = "FLUSH";
    Hand[Hand["FULL_HOUSE"] = 7] = "FULL_HOUSE";
    Hand[Hand["FOUR_OF_A_KIND"] = 8] = "FOUR_OF_A_KIND";
    Hand[Hand["STRAIGHT_FLUSH"] = 9] = "STRAIGHT_FLUSH";
    Hand[Hand["ROYAL_FLUSH"] = 10] = "ROYAL_FLUSH";
})(Hand || (Hand = {}));
export default class PokerHand {
    constructor(hand) {
        this.flush = false;
        this.straight = false;
        this.pairs = [];
        this.highCard = '';
        const sortedCards = this.sortCards(hand);
        this.sorted = sortedCards;
        this.highCard = this.getHighCard(sortedCards);
        this.generateHash(sortedCards);
        this.checkIfStraight(sortedCards);
        this.hand = this.returnBestHand();
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
    get handValue() {
        return this.hand;
    }
    getHighCard(hand) {
        const highestCard = hand.split(' ');
        return highestCard[highestCard.length - 1];
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
            .map(card => [card.slice(0, -1), card.slice(-1)]);
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
            const num = cardWeight(number);
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
        const numbers = hand.split(' ').map(card => card.slice(0, -1));
        const handSequence = numbers
            .sort((a, b) => parseInt(a) - parseInt(b))
            .join('');
        this.straight = sequence.indexOf(handSequence) > -1;
    }
    returnBestHand() {
        if (this.flush && this.straight) {
            if (this.highCard.indexOf('A') > -1) {
                return Hand.ROYAL_FLUSH;
            }
            return Hand.STRAIGHT_FLUSH;
        }
        else if (this.fourOfAKind) {
            return Hand.FOUR_OF_A_KIND;
        }
        else if (this.threeOfAKind && this.pairs.length) {
            return Hand.FULL_HOUSE;
        }
        else if (this.flush) {
            return Hand.FLUSH;
        }
        else if (this.straight) {
            return Hand.STRAIGHT;
        }
        else if (this.threeOfAKind) {
            return Hand.THREE_OF_A_KIND;
        }
        else if (this.pairs.length) {
            if (this.pairs.length === 2) {
                return Hand.TWO_PAIRS;
            }
            return Hand.PAIR;
        }
        return Hand.HIGHCARD;
    }
    compareWith(hand) {
        const oppositionHand = hand.handValue;
        if (this.hand > oppositionHand) {
            return Result.WIN;
        }
        if (this.hand < oppositionHand) {
            return Result.LOSS;
        }
        return Result.TIE;
    }
}
