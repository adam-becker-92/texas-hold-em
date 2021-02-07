export default class PokerHand {
	hand: string;
	constructor(hand: string) {
		this.hand = hand;
	}

	public isFlush() {
		const hash = <{ [key: string]: boolean }>{};
		const suits = this.hand.split(' ').map(card => card[1]);
		suits.forEach((suit: string) => {
			if(!hash[suit]) {
				hash[suit] = true
			}
		});
		return Object.keys(hash).length === 1;
	}

	public compareWith() {
		console.log(Result.TIE);
		return Result.TIE;
	}

}

export enum Result {
	WIN = 1,
	LOSS = 2,
	TIE = 3
}
