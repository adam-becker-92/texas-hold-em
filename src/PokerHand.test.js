import PokerHand, { Result } from './PokerHand.js';

describe('PokerHand', () => {

	describe('isFlushHand', () => {
		it('is true if hand is a flush', () => {
			const flushHand = new PokerHand('2S 4S 6S 8S 9S');
			expect(flushHand.isFlushHand).toBe(true);
		});

		it('is false if hand is not a flush', () => {
			const notFlushHand = new PokerHand('3C 5C 6H 8H 9S');
			expect(notFlushHand.isFlushHand).toBe(false);
		});
	});

	describe('compareWith()', () => {

		it(`ties`, () => {

			const hand1 = new PokerHand('AC 4S 5S 8C AH');
			const hand2 = new PokerHand('4S 5S 8C AS AD');

			expect(hand1.compareWith(hand2)).toBe(Result.TIE);

		});

	});

});
