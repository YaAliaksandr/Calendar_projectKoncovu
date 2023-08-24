import React from "react";
import { isEventInCurrentDay } from "../../FunctionForHelp/functionForHelp";
import { styled } from "styled-components";
import { EventListWrapper, EventItemWrapper, EventListItemWrapper, UlEventsListWrapper, LiEventItemWrapper, PEventItemWrapper } from "../../StyledComponents/StyledComponentsForCalendarGridHeader";



const DayShowWrapper = styled.div`
display:flex;
flex-grow:1;
`;

const EventsListWrapper = styled.div`
background-color:#1E1F21;
color:#DDDDDD;
flex-grow:1;
`;

const EventFormWrapper = styled.div`
background-color:#27382A;
color:#DDDDDD;
width:300px;
position:relative;
`;
const NoEventMsg = styled.div`
color:#565759;
position:absolute;
top:50%;
right	:50%;
transform:translate(50%,-50%);
`;



export const ShowDayComponent = ({ events, today, selectedEvent, setEvent }) => {

	const listOfEvents = events.filter((filIt) => isEventInCurrentDay(filIt, today))
	return (
		<DayShowWrapper>
			<EventsListWrapper>
				
				<UlEventsListWrapper>
					{
						listOfEvents.map(ev => (
							
							<LiEventItemWrapper key={ev.id}>
								{/* <EventItemWrapper onClick={() => setEvent(ev)}> */}
								<PEventItemWrapper onClick={() => setEvent(ev)}>
									{ev.title}
								</PEventItemWrapper>
							</LiEventItemWrapper>
						))
					}
				</UlEventsListWrapper>
				
			</EventsListWrapper>
			<EventFormWrapper>
				{
					selectedEvent ? (
						<div>
							<h3>
								{selectedEvent.title}
							</h3>
						</div>
					) : (
						<NoEventMsg>Nie wybrano wydarzenia</NoEventMsg>
					)
				}
			</EventFormWrapper>
		
		</DayShowWrapper>
	)
}