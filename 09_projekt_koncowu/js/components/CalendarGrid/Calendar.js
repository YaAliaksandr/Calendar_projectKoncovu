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
// posinion:relative;

// &:hover::before {
// 	content: "${props => props.holidayText}"; // Отображаем атрибут title в подсказке
// 	position: absolute;
// 	top: -20px; // Позиционируем надпись над компонентом
// 	left: 50%;
// 	transform: translateX(-50%);
// 	background-color: #333;
// 	color: #fff;
// 	padding: 4px 8px;
// 	border-radius: 4px;
// 	font-size: 12px;
// 	opacity: 0.8;
// 	pointer-events: none; // Предотвращаем перехват событий подсказки
// }


// background-color:${({ isWeekend }) => isWeekend ? '#27282A' : '#1E1F21'}; //сначала было так 
// ${props => props.isHoliday ? 'background-color:orange' : props.isWeekend ?'background-color:#27282A': 'background-color:#1E1F21'};

const RowInCeil = styled.div`
display:flex;

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

export const Calendar = ({ startDay, today, totalDays }) => {
	// totalDays = 42;// max 6 weeks(in mounth) * 7(num of Day in week)
	const day = startDay.clone().subtract(1, 'day'); // было 1.08 применяем вычитание subtract и получаем на один день меньше
	// console.log(day);
	const daysArray = [...new Array(totalDays)].map((it) => { return it = day.add(1, 'day').clone(); });
	// console.log(daysArray);

	const [holidayArr, setHolidayArr] = useState([]);
	// const [holidayText, setHolidayText] = useState('');
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
				//holidayArr = response.holidays;//response.holidays
				// setHolidays(response.holidays);
				setHolidayArr(response.holidays);

			});
	}, []);
	const isHoliday = (day) => { ///////
		let str = `2018-${day.format('MM')}-${day.format('DD')}`;//// 

		for (let val of holidayArr) {

			if (str === val.date && val.public) {
				// setHolidayText(val.name);
				return true;
				// console.log(val.date);/////
			}
		}
		// console.log(holidayArr);
		// setHolidayText("");////
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
								isHoliday={isHoliday(it)}////
							// holidayText={holidayText}
							>
								<RowInCeil justCon='flex-end'>
									<DayInWrapper>
										{
											isCurrentDay(it) ? (<CurrentDay>{it.format('DD')}</CurrentDay>) : it.format('DD')
										}


									</DayInWrapper>
								</RowInCeil>

							</CellWrapper>
						)
					})
				}

			</GridWrapper>
		</>
	)
}


