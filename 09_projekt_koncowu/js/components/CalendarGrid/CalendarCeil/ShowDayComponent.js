import React from "react";
import { isEventInCurrentDay } from "../../FunctionForHelp/functionForHelp";
import { styled } from "styled-components";
import { UlEventsListWrapper, LiEventItemWrapper, PEventItemWrapper, InputEventTitle, TextAreaEventBody, DivButtonsWrapper } from "../../StyledComponents/StyledComponentsForCalendarGridHeader";



const DivDayShowWrapper = styled.div`
display:flex;
flex-grow:1;
background-color:#1E1F21;
`;

const DivEventsListWrapper = styled.div`
color:#DDDDDD;
width:50%;
max-height:99%;
overflow-y:auto
`;

const DivEventFormWrapper = styled.div`
background-color:#27382A;
color:#DDDDDD;
width:50%;
position:relative;
`;
const DivNoEventMsg = styled.div`
color:#565759;
position:absolute;
top:50%;
right	:50%;
transform:translate(50%,-50%);
`;



export const ShowDayComponent = ({ events, today, selectedEvent, setEvent, changeEventHandler, cancelButtonHandler, eventFetchHandler, method, deleteEventFetchHandler, openFormHandlerForShowDayComponent }) => {

	const listOfEvents = events.filter((filIt) => isEventInCurrentDay(filIt, today))
	return (
		<DivDayShowWrapper>
			<DivEventsListWrapper>
				<UlEventsListWrapper>
					{
						listOfEvents.map(ev => (

							<LiEventItemWrapper key={ev.id}>
								<PEventItemWrapper onClick={() => openFormHandlerForShowDayComponent('Edytuj', ev)}>
									{ev.title}
								</PEventItemWrapper>
							</LiEventItemWrapper>
						))
					}
				</UlEventsListWrapper>

			</DivEventsListWrapper>
			<DivEventFormWrapper>
				{
					selectedEvent
						? (
							<>

								<div>
									<InputEventTitle
										placeholder="title"
										value={selectedEvent.title}
										onChange={e => changeEventHandler(e.target.value, 'title')}
									/>
									<TextAreaEventBody
										placeholder="description"
										value={selectedEvent.description}
										onChange={e => changeEventHandler(e.target.value, 'description')}
									/>
									<DivButtonsWrapper >
										<button onClick={cancelButtonHandler}>Anuluj</button>
										<button onClick={eventFetchHandler}>
											{method}
										</button>

										{method === 'Edytuj' && <button onClick={deleteEventFetchHandler}>Usun</button>}
									</DivButtonsWrapper >
								</div>
							</>
						)
						: (
							<>
								<div>
									<button onClick={() => openFormHandlerForShowDayComponent('Utwórz', null, today)}>Utwórz</button>
								</div>
								<DivNoEventMsg>Nie wybrano wydarzenia</DivNoEventMsg>
							</>
						)
				}
			</DivEventFormWrapper>

		</DivDayShowWrapper>
	)
}