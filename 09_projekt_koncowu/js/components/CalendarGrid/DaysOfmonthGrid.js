import React, { useEffect, useState } from "react";
// import moment from "moment";
import { DivCellWrapper,DivRowInCeil } from "../StyledComponents/StyledComponentsForCalendarGridHeader";
import { styled } from "styled-components";
import { $isHoliday, $isSelectedMonth, isCurrentDay } from "../FunctionForHelp/functionForHelp";





const DivDayInWrapper = styled.div`
height:31px;
width:31px;
display:flex;
align-items:center;
justify-content:center;
margin:2px;
cursor:pointer;
`;
const DivCurrentDay = styled('div')`
height:100%;
width:100%;
background-color:#f00;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
`;
const DivHolidayNameWrapper = styled.div`
color:#1E1F21;
font-size:14px;
white-space:pre-wrap;
`;
const DivShowDayWrapper = styled.div`
	display:flex;
	justify-content:flex-end;
	`;
const UlEventsListWrapper = styled.ul`
margin:unset;
padding-left:4px;
list-style-position:inside;
`;
const PEventItemWrapper = styled.p`
font-size:14px;
display:inline-block;
text-overflow:ellipsis;
overflow:hidden;
white-space:nowrap;
width:114px;

position:relative;
left:-14px;
bottom:-4px;

color:#DDDDDD;
cursor:pointer;
margin:0;
padding:0;
text-align:left;
`;

export const DaysOfMonthGrid=({startDay,today,totalDays,openFormHandler,events})=>{
	const day = startDay.clone().subtract(1, 'day'); // было 1.08 применяем вычитание subtract и получаем на один день меньше
	// console.log(day);
	const daysArray = [...new Array(totalDays)].map((it) => { return it = day.add(1, 'day').clone(); });
	const [holidayArr, setHolidayArr] = useState([]);

	useEffect(() => {/////
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
		const isHoliday = $isHoliday(it,holidayArr);
		const holidayName = isHoliday ? holidayArr.find(val => `2018-${it.format('MM')}-${it.format('DD')}` === val.date && val.public).name : null;
		return (
			<DivCellWrapper
				key={it.format('MMDD')}
				$isWeekend={it.day() === 6 || it.day() === 0}
				$isSelectedMonth={$isSelectedMonth(it,today)}
				$isHoliday={$isHoliday(it,holidayArr)}
			>
				<DivRowInCeil $justCon='flex-end'>

					<DivShowDayWrapper>

						<DivDayInWrapper onDoubleClick={() => openFormHandler('Utworz', null, it)}>
							{
								isCurrentDay(it)
									? (<DivCurrentDay>{it.format('DD')}</DivCurrentDay>) : it.format('DD')
							}
						</DivDayInWrapper >
					</DivShowDayWrapper>
					{$isHoliday(it,holidayArr) && <DivHolidayNameWrapper>
						{holidayName}
					</DivHolidayNameWrapper>}

					<UlEventsListWrapper >
						{events.filter((filEv) => filEv.date >= it.clone().format('X') && filEv.date <= it.clone().endOf('day').format('X'))
							.map((mapEv, ind) =>
								<li key={ind}>
									<PEventItemWrapper onDoubleClick={() => openFormHandler('Edytuj', mapEv)}>
										{mapEv.title}
									</PEventItemWrapper >
								</li>)
						}
					</UlEventsListWrapper >

				</DivRowInCeil >

			</DivCellWrapper >
		)
	})
}
</>
)
}