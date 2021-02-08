import PokerHand, { Result } from './PokerHand.js';

describe('PokerHand', () => {

	describe('isFlushHand', () => {
		it('is true if hand is a flush', () => {
			const flushHand = new PokerHand('2S 4S 9S 6S 8S');
			expect(flushHand.isFlushHand).toBe(true);
		});

		it('is false if hand is not a flush', () => {
			const notFlushHand = new PokerHand('3C 8H 5C 6H 9S');
			expect(notFlushHand.isFlushHand).toBe(false);
		});
	});

	describe('isStraightHand', () => {
		it('is true if hand is a flush', () => {
			const straightHand = new PokerHand('5D 6H 2S 3H 4H');
			expect(straightHand.isStraightHand).toBe(true);
		});

		it('is false if hand is not a flush', () => {
			const notStraightHand = new PokerHand('3C 8H 9S 5C 6H');
			expect(notStraightHand.isStraightHand).toBe(false);
		});
	});

	describe('isFourOfAKind', () => {
		it('returns card number if four of the same card', () => {
			const fourOfAKind = new PokerHand('5D 5H 5S 5C 4H');
			expect(fourOfAKind.isFourOfAKind).toBe(5);
		});

		it(`is undefined if there aren't four of the same card`, () => {
			const notFourOfAKind = new PokerHand('3C 8H 9S 5C 6H');
			expect(notFourOfAKind.isFourOfAKind).toBe(undefined);
		});
	});

	describe('isThreeOfAKind', () => {
		it('returns card number if three of the same card', () => {
			const threeOfAKind = new PokerHand('5D 9H 5S 5C 4H');
			expect(threeOfAKind.isThreeOfAKind).toBe(5);
		});

		it(`is undefined if there aren't three of the same card`, () => {
			const notThreeOfAKind = new PokerHand('3C 8H 9S 5C 6H');
			expect(notThreeOfAKind.isThreeOfAKind).toBe(undefined);
		});
	});

	describe('isTwoPair', () => {
		it('returns an array of card numbers that have pair', () => {
			const pairs = new PokerHand('5D 9H 5S 9C 4H');
			expect(pairs.hasPairs).toEqual([5, 9]);
		});

		it(`is an empty array if no pairs in the hand`, () => {
			const noPairs = new PokerHand('3C 8H 9S 5C 6H');
			expect(noPairs.hasPairs).toEqual([]);
		});
	});

	describe('evaluates correct hand', () => {
		it('returns an array of card numbers that have pair', () => {
			const pairs = new PokerHand('5D 9H 5S 9C 4H');
			expect(pairs.hasPairs).toEqual([5, 9]);
		});
	});

	describe('compare', () => {

		it(`straight flush loses to royal flush`, () => {

			const straightFlush = new PokerHand('3S 6S 4S 7S 5S');
			const royalFlush = new PokerHand('AH QH JH 10H KH');
			expect(straightFlush.compareWith(royalFlush)).toBe(Result.LOSS);

		});

		it(`four of a kind beats full house`, () => {

			const fourOfAKind = new PokerHand('4C 4S 5S 4D 4H');
			const fullHouse = new PokerHand('KS KC KD 7S 7D');

			expect(fourOfAKind.compareWith(fullHouse)).toBe(Result.WIN);

		});

		it(`straight loses to flush`, () => {

			const straight = new PokerHand('2C 3S 5S 4C 6H');
			const flush = new PokerHand('4S 5S 8S AS AS');

			expect(straight.compareWith(flush)).toBe(Result.LOSS);

		});

		it(`three of a kind beats two pair`, () => {
			const threeOfAKind = new PokerHand('AC AS 5S 8C AH');
			const twoPair = new PokerHand('4S 5S 4C AS 5D');
			expect(threeOfAKind.compareWith(twoPair)).toBe(Result.WIN);

		});

	});

});
