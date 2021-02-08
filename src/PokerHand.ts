import { cardWeight } from './helperFunctions';

export enum Result {
	WIN = 1,
	LOSS = 2,
	TIE = 3
}

enum Hand {
	HIGHCARD = 1,
	PAIR = 2,
	TWO_PAIRS = 3,
	THREE_OF_A_KIND = 4,
	STRAIGHT = 5,
	FLUSH = 6,
	FULL_HOUSE = 7,
	FOUR_OF_A_KIND = 8,
	STRAIGHT_FLUSH = 9,
	ROYAL_FLUSH = 10
}

export default class PokerHand {
	private flush: boolean  = false;
	private straight: boolean = false;
	private fourOfAKind: number | undefined;
	private threeOfAKind: number | undefined;
	private pairs: number[] = []; 
	private highCard: string = '';
	private hand: Hand;
	public sorted: string | undefined;

	constructor(hand: string) {
		const sortedCards = this.sortCards(hand);
		this.sorted = sortedCards;
		this.highCard = this.getHighCard(sortedCards);
		this.generateHash(sortedCards);
		this.checkIfStraight(sortedCards);
		this.hand = this.returnBestHand();
	}

	get isFlushHand(): boolean | undefined {
		return this.flush;
	}

	get isStraightHand(): boolean | undefined {
		return this.straight;
	}

	get isFourOfAKind(): number | undefined {
		return this.fourOfAKind;
	}

	get isThreeOfAKind(): number | undefined {
		return this.threeOfAKind;
	}

	get hasPairs(): number[] | undefined {
		return this.pairs;
	}

	get handValue(): Hand {
		return this.hand;
	}

	private getHighCard(hand: string): string {
		const highestCard = hand.split(' ');
		return highestCard[highestCard.length - 1];
	}

	private sortCards(hand: string): string {
		return hand
			.split(' ')
			.map(card => {
				const num = card[0];
				return {
					weight: cardWeight(num),
					card
				}
			})
			.sort((a, b) => a.weight - b.weight)
			.map(({ card }) => card)
			.join(' ');
	}

	private generateHash(hand: string): void {
		const flushHash = <{ [key: string]: boolean }>{};
		const numberHash = <{ [key: string]: number }>{};
		const cards = hand
			.split(' ')
			.map(card => [card.slice(0, -1), card.slice(-1)]);

		cards.forEach((card: string[]) => {
			const [num, suit] = card;
			if(!flushHash[suit]) {
				flushHash[suit] = true
			}

			if(numberHash[num]) {
				numberHash[num] = numberHash[num] + 1;
			} else {
				numberHash[num] = 1;
			}
		});
		this.flush = Object.keys(flushHash).length === 1;

		Object.keys(numberHash).forEach((number) => {
			const count = numberHash[number];
			const num = cardWeight(number);
			if(count === 4) {
				this.fourOfAKind = num;
			}
			if(count === 3) {
				this.threeOfAKind = num;
			}
			if(count === 2) {
				this.pairs.push(num);
			}
		});
	}

	private checkIfStraight(hand: string): void {
		const sequence = '2345678910JQKA' 
		const numbers = hand.split(' ').map(card => card.slice(0, -1));
		const handSequence = numbers
			.sort((a, b) => parseInt(a) - parseInt(b))
			.join('');
		this.straight = sequence.indexOf(handSequence) > -1;
	}

	private returnBestHand(): Hand {
		if(this.flush && this.straight) {
			if(this.highCard.indexOf('A') > -1) {
				return Hand.ROYAL_FLUSH;
			}
			return Hand.STRAIGHT_FLUSH; 
		} else if(this.fourOfAKind) {
			return Hand.FOUR_OF_A_KIND;
		} else if(this.threeOfAKind && this.pairs.length) {
			return Hand.FULL_HOUSE;
		} else if(this.flush) {
			return Hand.FLUSH;
		} else if(this.straight) {
			return Hand.STRAIGHT;
		} else if(this.threeOfAKind) {
			return Hand.THREE_OF_A_KIND; 
		} else if(this.pairs.length) {
			if(this.pairs.length === 2) {
				return Hand.TWO_PAIRS;
			}
			return Hand.PAIR
		}
		return Hand.HIGHCARD;
	}

	public compareWith(hand: PokerHand): Result {
		const oppositionHand = hand.handValue;
		if(this.hand > oppositionHand) {
			return Result.WIN;
		}
		if(this.hand < oppositionHand) {
			return Result.LOSS;
		}
		return Result.TIE;
	}
}
