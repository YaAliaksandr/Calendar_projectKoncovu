import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import moment from "moment/moment";



const GridWrapper = styled.div`
display:grid;
grid-template-columns:repeat(7,1fr);
grid-gap:1px;
background-color:${props => props.isHeader ? '#1E1F21' : '#4D4C4D'};
${props => props.isHeader && 'border-bottom:1px solid #4D4C4D'};
`;


const CellWrapper = styled.div`
min-height:${props => props.isHeader ? 24 : 80}px;
min-width:140px;
background-color: ${props =>
		props.isHoliday
			? "orange"
			: props.isWeekend
				? "#27282A"
				: "#1E1F21"};
color:${props => props.isSelectedMonth ? '#DDDDDD' : '#555759'};
`;
const RowInCeil = styled.div`
display:flex;
flex-direction:column;
justify-content:${({ justCon }) => justCon ? justCon : 'flex-start'};
${props => props.pr && 'padding-right:8px'};
`;

const DayInWrapper = styled.div`
height:31px;
width:31px;
display:flex;
align-items:center;
justify-content:center;
margin:2px;
cursor:pointer;
`;
const CurrentDay = styled('div')`
height:100%;
width:100%;
background-color:#f00;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
`;
const ShowDayWrapper = styled.div`
	display:flex;
	justify-content:flex-end;
	`;
const EventsListWrapper = styled.ul`
margin:unset;
list-style-position:inside;
padding-left:4px;
`;
const EventItemWrapper = styled.button`
position:relative;
left:-14px;
text-overflow:ellipsis;
overflow:hidden;
white-space:nowrap;
width:114px;
border:unset;
background:unset;
color:#DDDDDD;
cursor:pointer;
margin:0;
padding:0;
text-align:left;
`

export const Calendar = ({ startDay, today, totalDays, events, openFormHandler }) => {
	// totalDays = 42;// max 6 weeks(in mounth) * 7(num of Day in week)
	const day = startDay.clone().subtract(1, 'day'); // было 1.08 применяем вычитание subtract и получаем на один день меньше
	// console.log(day);
	const daysArray = [...new Array(totalDays)].map((it) => { return it = day.add(1, 'day').clone(); });
	const [holidayArr, setHolidayArr] = useState([]);
	const isCurrentDay = (day) => {
		return moment().isSame(day, 'day');
	}

	const isSelectedMonth = (day) => {
		return today.isSame(day, 'month');
	}

	useEffect(() => {/////
		fetch(`https://fer-api.coderslab.pl/v1/holidays?key=e92601251-c0a2-4s63-v73f-54041195480f&country=PL`)
			.then((res) => res.json())
			.then((response) => {
				setHolidayArr(response.holidays);

			});
	}, []);
	const isHoliday = (day) => { ///////
		let str = `2018-${day.format('MM')}-${day.format('DD')}`;//// 
		for (let val of holidayArr) {
			if (str === val.date && val.public) {
				return true;
			}
		}
		return false;
	}

	return (
		<>
			<GridWrapper isHeader>
				{[...Array(7)].map((it, ind) => (
					<CellWrapper key={ind} isHeader isSelectedMonth={true}>
						<RowInCeil justCon='flex-end' pr >
							{moment().day(ind + 1).format('dddd').charAt(0).toUpperCase() + moment().day(ind + 1).format('dddd').slice(1)}
						</RowInCeil>
					</CellWrapper>
				)
				)}
			</GridWrapper>
			<GridWrapper>
				{
					daysArray.map((it) => {
						return (
							<CellWrapper
								key={it.format('MMDD')}
								isWeekend={it.day() === 6 || it.day() === 0}
								isSelectedMonth={isSelectedMonth(it)}
								isHoliday={isHoliday(it)}
							>
								<RowInCeil justCon='flex-end'>
									<ShowDayWrapper>
										<DayInWrapper onDoubleClick={() => openFormHandler('Utworz')}>
											{
												isCurrentDay(it)
													? (<CurrentDay>{it.format('DD')}</CurrentDay>)
													: it.format('DD')
											}
										</DayInWrapper>
									</ShowDayWrapper>
									<EventsListWrapper>
										{events.filter((filEv) => filEv.date >= it.clone().format('X') && filEv.date <= it.clone().endOf('day').format('X'))
											.map((mapEv, ind) =>
												<li key={ind}>
													<EventItemWrapper onDoubleClick={() => openFormHandler('Edytuj', mapEv)}>
														{mapEv.title}
													</EventItemWrapper>
												</li>)
										}
									</EventsListWrapper>

								</RowInCeil>

							</CellWrapper>
						)
					})
				}

			</GridWrapper>
		</>
	)
}


