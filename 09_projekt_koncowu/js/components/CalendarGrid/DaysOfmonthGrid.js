import React, { useEffect, useState } from "react";
import { $isHoliday, isEventInCurrentDay } from "../FunctionForHelp/functionForHelp";
import { CeilOfCalendar } from "./CalendarCeil/DivCellWrapper";

export const DaysOfMonthGrid = ({ startDay, today, totalDays, openFormHandler, events, scrol, setScrol }) => {
	const day = startDay.clone().subtract(1, 'day'); // было 1.08 применяем вычитание subtract и получаем на один день меньше
	const daysArray = [...new Array(totalDays)].map((it) => { return it = day.add(1, 'day').clone(); });
	const [holidayArr, setHolidayArr] = useState([]);

	useEffect(() => {
		fetch(`https://fer-api.coderslab.pl/v1/holidays?key=e92601251-c0a2-4s63-v73f-54041195480f&country=PL`)
			.then((res) => res.json())
			.then((response) => {
				setHolidayArr(response.holidays);

			});
	}, []);



	return (
		<>
			{
				daysArray.map((it) => {
					const isHoliday = $isHoliday(it, holidayArr);
					const holidayName = isHoliday ? holidayArr.find(val => `2018-${it.format('MM')}-${it.format('DD')}` === val.date && val.public).name : null;
					return (
						<CeilOfCalendar key={it.format('MMDD')}
							it={it}
							today={today}
							holidayArr={holidayArr}
							isholiday={isHoliday}
							holidayName={holidayName}
							openFormHandler={openFormHandler}
							events={events.filter((filEv) => isEventInCurrentDay(filEv, it))}
							scrol={scrol}
							setScrol={setScrol} />
					)
				})
			}
		</>
	)
}