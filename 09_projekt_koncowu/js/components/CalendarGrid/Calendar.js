import React from "react";
import { styled } from "styled-components";
import moment from "moment/moment";



const GridWrapper = styled.div`
display:grid;
grid-template-columns:repeat(7,1fr);
grid-template-rows:repeat(6,1fr);
background-color:#404040;
grid-gap:1px;
`;
const CellWrapper = styled.div`
min-height:80px;
min-width:140px;
background-color:${({ isWeekend }) => isWeekend ? 'rgb(36,34,38)' : 'rgb(27,28,31)'};
color:rgb(148,149,152);
`;

const RowInCeil = styled.div`
display:flex;
justify-content:${({ justCon }) => justCon ? justCon : 'flex-start'};
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
background-color:rgb(223 223 0);
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
`;

export const Calendar = ({ startDay }) => {
	const totalDays = 42;// max 6 weeks(in mounth) * 7(num of Day in week)
	const day = startDay.clone().subtract(1, 'day'); // было 1.08 применяем вычитание subtract и получаем на один день меньше
	// console.log(day);
	const daysArray = [...new Array(totalDays)].map((it) => { return it = day.add(1, 'day').clone(); });
	console.log(daysArray);

	const isCurrentDay = (day) => {
		return moment().isSame(day, 'day');

	}
	return (<>
		<GridWrapper>
			{
				daysArray.map((it) => {
					return <CellWrapper key={it.format('YYYYMMDD')} isWeekend={it.day() === 6 || it.day() === 0}
					>
						<RowInCeil justCon='flex-end'>
							<DayInWrapper>
								{
									isCurrentDay(it) ? (<CurrentDay>{it.format('DD')}</CurrentDay>) : it.format('DD')
								}


							</DayInWrapper>
						</RowInCeil>

					</CellWrapper>
				})
			}

		</GridWrapper>
	</>)
}