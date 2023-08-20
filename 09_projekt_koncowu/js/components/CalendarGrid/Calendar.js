import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import moment from "moment/moment";



const DivGridWrapper = styled.div`
display:grid;
grid-template-columns:repeat(7,1fr);
grid-gap:1px;
background-color:${props => props.$isHeader ? '#1E1F21' : '#4D4C4D'};
${props => props.$isHeader && 'border-bottom:1px solid #4D4C4D'};
`;


const DivCellWrapper = styled.div`
overflow-x:hidden;
overflow-y:auto;
white-space:nowrap;
text-overflow:ellipsis;
height:${props => props.$isHeader ? 24 : 80}px;
width:140px;
background-color: ${props =>
		props.$isHoliday
			? "orange"
			: props.$isWeekend
				? "#27282A"
				: "#1E1F21"};
color:${props => props.$isSelectedMonth ? '#DDDDDD' : '#555759'};
`;
const DivRowInCeil = styled.div`
display:flex;
flex-direction:column;
justify-content:${({ $justCon }) => $justCon ? $justCon : 'flex-start'};
${props => props.$pr && 'padding-right:8px'};
`;

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

export const Calendar = ({ startDay, today, totalDays, events, openFormHandler }) => {
	// totalDays = 42;// max 6 weeks(in mounth) * 7(num of Day in week)
	const day = startDay.clone().subtract(1, 'day'); // было 1.08 применяем вычитание subtract и получаем на один день меньше
	// console.log(day);
	const daysArray = [...new Array(totalDays)].map((it) => { return it = day.add(1, 'day').clone(); });
	const [holidayArr, setHolidayArr] = useState([]);

	const isCurrentDay = (day) => {
		return moment().isSame(day, 'day');
	}

	const $isSelectedMonth = (day) => {
		return today.isSame(day, 'month');
	}

	useEffect(() => {/////
		fetch(`https://fer-api.coderslab.pl/v1/holidays?key=e92601251-c0a2-4s63-v73f-54041195480f&country=PL`)
			.then((res) => res.json())
			.then((response) => {
				setHolidayArr(response.holidays);

			});
	}, []);
	const $isHoliday = (day) => {
		const str = `2018-${day.format('MM')}-${day.format('DD')}`;
		return holidayArr.some(val => str === val.date && val.public);
	}

	return (
		<>
			<DivGridWrapper $isHeader>
				{[...Array(7)].map((it, ind) => (
					<DivCellWrapper key={ind} $isHeader $isSelectedMonth={true}>
						<DivRowInCeil $justCon='flex-end' $pr>
							{moment().day(ind + 1).format('dddd').charAt(0).toUpperCase() + moment().day(ind + 1).format('dddd').slice(1)}
						</DivRowInCeil >
					</DivCellWrapper >
				)
				)}
			</DivGridWrapper>
			<DivGridWrapper>
				{
					daysArray.map((it) => {
						const isHoliday = $isHoliday(it);
						const holidayName = isHoliday ? holidayArr.find(val => `2018-${it.format('MM')}-${it.format('DD')}` === val.date && val.public).name : null;
						return (
							<DivCellWrapper
								key={it.format('MMDD')}
								$isWeekend={it.day() === 6 || it.day() === 0}
								$isSelectedMonth={$isSelectedMonth(it)}
								$isHoliday={$isHoliday(it)}
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
									{$isHoliday(it) && <DivHolidayNameWrapper>
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

			</DivGridWrapper>
		</>
	)
}
