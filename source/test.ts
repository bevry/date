import { deepEqual, equal } from 'assert-helpers'
import kava from 'kava'
import { getMonthsAfter, sortDates } from './index.js'

kava.suite('@bevry/date', function (suite, test) {
	test('months', function () {
		equal(
			getMonthsAfter(
				new Date('2020-01-01T00:00:00Z'),
				new Date('2020-03-01T00:00:00Z')
			),
			2,
			'2 months'
		)
		equal(
			getMonthsAfter(
				new Date('2020-01-01T00:00:00Z'),
				new Date('2020-03-01T00:00:00Z'),
				new Date('2020-02-01T00:00:00Z')
			),
			1,
			'1 months'
		)
		equal(
			getMonthsAfter(
				new Date('2020-01-10T00:00:00Z'),
				new Date('2020-02-01T00:00:00Z')
			),
			0,
			'0 months'
		)
		equal(
			getMonthsAfter(
				new Date('2020-01-30T00:00:00Z'),
				new Date('2020-02-10T00:00:00Z')
			),
			0,
			'0 months'
		)
		equal(
			getMonthsAfter(
				new Date('2020-01-30T00:00:00Z'),
				new Date('2020-03-01T00:00:00Z')
			),
			1,
			'1 months'
		)
		equal(
			getMonthsAfter(
				new Date('2020-03-02T00:00:00Z'),
				new Date('2020-03-01T00:00:00Z')
			),
			0,
			'0 months'
		)
		equal(
			getMonthsAfter(
				new Date('2020-04-01T00:00:00Z'),
				new Date('2020-03-01T00:00:00Z')
			),
			0,
			'0 months'
		)
		equal(
			getMonthsAfter(
				new Date('2020-01-01T00:00:00Z'),
				new Date('2020-03-01T00:00:00Z'),
				new Date('2020-03-02T00:00:00Z')
			),
			0,
			'0 months'
		)
		equal(
			getMonthsAfter(
				new Date('2020-01-01T00:00:00Z'),
				new Date('2020-03-02T00:00:00Z'),
				new Date('2020-03-01T00:00:00Z')
			),
			0,
			'0 months'
		)
		equal(
			getMonthsAfter(
				new Date('2020-01-01T00:00:00Z'),
				new Date('2020-03-01T00:00:00Z'),
				new Date('2020-04-01T00:00:00Z')
			),
			0,
			'0 months'
		)
	})
	test('sort', function () {
		const d1 = new Date('2020-01-01T00:00:00Z'),
			d2 = new Date('2020-02-01T00:00:00Z'),
			d3 = new Date('2020-03-01T00:00:00Z')
		deepEqual(sortDates([d1, d3, d2]), [d1, d2, d3])
	})
})
