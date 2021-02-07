import PokerHand, { Result } from './PokerHand.js';

describe('PokerHand', () => {

	describe('isFlush()', () => {
		it('returns true if flush', () => {
			const flush = new PokerHand('2S 4S 6S 8S 9S');
			expect(flush.isFlush()).toBe(true);
		});

		it('returns flase if not a flush', () => {
			const notFlush = new PokerHand('3C 5C 6H 8H 9S');
			expect(notFlush.isFlush()).toBe(false);
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
