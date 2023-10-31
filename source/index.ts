/**
 * Get the amount of months between two dates.
 * Only returns absolute month differences, e.g. `2021-03-25` to `2021-04-24` would be 0, yet `2021-03-25` to `2021-04-25` would be 1.
 */
export function getMonthsBetween(
	suspectedEarlierDate: Date,
	suspectedLaterDate: Date,
	mode: 'relative' | 'absolute' | 'positive' = 'relative',
) {
	const min = getEarlierDate(suspectedEarlierDate, suspectedLaterDate)
	const max = getLaterDate(suspectedEarlierDate, suspectedLaterDate)
	if (mode === 'positive' && min === suspectedLaterDate) return 0

	let current = max
	let months = 0
	while (true) {
		current = getMonthPrior(current)
		if (min.getTime() <= current.getTime()) ++months
		else break
	}

	if (mode === 'relative' && min === suspectedLaterDate) return months * -1
	return months
}

/** Given a date, get its time a month earlier. */
export function getMonthPrior(date: Date) {
	return new Date(
		date.getFullYear(),
		date.getMonth() - 1,
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
		date.getMilliseconds(),
	)
}

/** Given two dates, return the one that is later than the other. */
export function getLaterDate(date1?: Date, date2?: Date) {
	if (!date1) return date2!
	if (!date2) return date1!
	return date1.getTime() > date2.getTime() ? date1 : date2
}

/** Given two dates, return the one that is earlier than the other. */
export function getEarlierDate(date1?: Date, date2?: Date) {
	if (!date1) return date2!
	if (!date2) return date1!
	return date1.getTime() < date2.getTime() ? date1 : date2
}

/**
 * Compare two dates, returning their relationship.
 * @returns `-1` if date1 is earlier than date2, `1` if date1 is later than date2, `0` if they are equal.
 */
export function compareDates(date1: Date, date2: Date): -1 | 0 | 1 {
	const a = date1.getTime()
	const b = date2.getTime()
	if (a === b) return 0
	if (a < b) return -1
	return 1
}

/** Sort an array of dates, from earliest to latest. */
export function sortDates(dates: Array<Date>) {
	return dates.sort((a, b) => a.getTime() - b.getTime())
}

/**
 * Get the amount of months between a start and an end date, with an optional filter date to start from.
 * Filtering is done internally, counting is doing by {@link getMonthsBetween}.
 */
export function getMonthsAfter(
	startDate: Date,
	endDate: Date,
	filterDate?: Date,
) {
	const monthsActive = getMonthsBetween(
		getLaterDate(startDate, filterDate),
		getEarlierDate(endDate, new Date()),
		'positive',
	)
	return monthsActive
}
