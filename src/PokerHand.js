export default class PokerHand {
    constructor(hand) {
        this.checkIfFlush(hand);
    }
    get isFlushHand() {
        return this.flush;
    }
    checkIfFlush(hand) {
        const hash = {};
        const suits = hand.split(' ').map(card => card[1]);
        suits.forEach((suit) => {
            if (!hash[suit]) {
                hash[suit] = true;
            }
        });
        this.flush = Object.keys(hash).length === 1;
    }
    compareWith() {
        console.log(Result.TIE);
        return Result.TIE;
    }
}
export var Result;
(function (Result) {
    Result[Result["WIN"] = 1] = "WIN";
    Result[Result["LOSS"] = 2] = "LOSS";
    Result[Result["TIE"] = 3] = "TIE";
})(Result || (Result = {}));
