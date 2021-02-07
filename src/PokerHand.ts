export default class PokerHand {
	private flush: boolean | undefined;

	constructor(hand: string) {
		this.checkIfFlush(hand);
	}

	get isFlushHand(): boolean | undefined {
		return this.flush;
	}

	private checkIfFlush(hand: string): void {
		const hash = <{ [key: string]: boolean }>{};
		const suits = hand.split(' ').map(card => card[1]);
		suits.forEach((suit: string) => {
			if(!hash[suit]) {
				hash[suit] = true
			}
		});
		this.flush = Object.keys(hash).length === 1;
	}

	public compareWith(): Result {
		console.log(Result.TIE);
		return Result.TIE;
	}

}

export enum Result {
	WIN = 1,
	LOSS = 2,
	TIE = 3
}
