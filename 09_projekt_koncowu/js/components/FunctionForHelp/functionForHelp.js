import moment from "moment/moment";



export const isCurrentDay = (day) => {
	return moment().isSame(day, 'day');
};

export const $isSelectedMonth = (day,today) => {
	return today.isSame(day, 'month');
};
export 	const $isHoliday = (day,someArr) => {
	const str = `2018-${day.format('MM')}-${day.format('DD')}`;
	return someArr.some(val => str === val.date && val.public);
};