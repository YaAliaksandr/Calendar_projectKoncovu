import moment from "moment/moment";



export const isCurrentDay = (day) => {
	return moment().isSame(day, 'day');
};

export const $isSelectedMonth = (day, today) => {
	return today.isSame(day, 'month');
};
export const $isHoliday = (day, someArr) => {
	const str = `2018-${day.format('MM')}-${day.format('DD')}`;
	return someArr.some(val => str === val.date && val.public);
};

export const isEventInCurrentDay = (event, it) => {
	return event.date >= it.clone().startOf('day').format('X') && event.date <= it.clone().endOf('day').format('X')
};