import React from "react";
import { styled } from "styled-components";
import moment from "moment/moment";



const GridWrapper = styled.div`
display:grid;
grid-template-columns:repeat(7,1fr);
grid-gap:1px;
background-color:${props => props.isHeader ? '#1E1F21' : '#4D4C4D'};
${props => props.isHeader && 'border-bottom:1px solid #4D4C4D'};
`;
// grid-template-rows:repeat(6,1fr);
const CellWrapper = styled.div`
min-height:${props => props.isHeader ? 24 : 80}px;
min-width:140px;
background-color:${({ isWeekend }) => isWeekend ? '#27282A' : '#1E1F21'};
color:#DDDDDD;
`;

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
		<GridWrapper isHeader>
			{[...Array(7)].map((it, ind) => (<CellWrapper key={ind} isHeader>
				<RowInCeil justCon='flex-end' pr >
					{moment().day(ind + 1).format('dddd')}
				</RowInCeil>
			</CellWrapper>))}
		</GridWrapper>
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