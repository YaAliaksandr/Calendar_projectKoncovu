import React from "react";
import { styled } from "styled-components";
import { DaysOfMonthGrid } from "./DaysOfmonthGrid";
import { CalendarGridHeader } from "./CalendarGridHeader";



const DivGridWrapper = styled.div`
display:grid;
grid-template-columns:repeat(7,1fr);
grid-gap:1px;
background-color:${props => props.$isHeader ? '#1E1F21' : '#4D4C4D'};
${props => props.$isHeader && 'border-bottom:1px solid #4D4C4D'};
`;


export const Calendar = ({ startDay, today, totalDays, events, openFormHandler, scrol, setScrol }) => {

	return (
		<>
			<DivGridWrapper $isHeader={true}>
				<CalendarGridHeader />
			</DivGridWrapper>
			<DivGridWrapper>
				<DaysOfMonthGrid
					startDay={startDay}
					today={today}
					totalDays={totalDays}
					events={events}
					openFormHandler={openFormHandler}
					scrol={scrol}
					setScrol={setScrol}
				/>
			</DivGridWrapper>
		</>
	)
}
