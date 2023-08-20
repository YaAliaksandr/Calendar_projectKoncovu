import React, { Component, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import moment from "moment/moment";
import { styled } from "styled-components";
import { Calendar } from "./components/CalendarGrid/Calendar";
import { Header } from "./components/Header/Header";
import { Monitor } from "./components/Monitor/Monitor";


const DivAppWrapper = styled.div`
border: 2px solid blue;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 0 0 1px #1A1A1A,0 8px 20px 6px #888;
`;
const DivFormPositionWrapper = styled.div`
position:absolute;
z-index:1000;
background-color:rgba(0,0,0,0.35);
top:0;
right:0;
bottom:0;
left:0;
display:flex;
align-items:center;
justify-content:center;
`;

const DivFormWrapper = styled(DivAppWrapper)`
width:300px;
background-color:#1E1F21;
color:#DDDDDD;
box-shadow:unset;
`;

const DivEventTitle = styled.input`
padding:4px 14px;
font-size:0.85rem;
width:100%;
border:unset;
background-color:#1E1F21;
color:#DDDDDD;
outline:unset;
border-bottom:1px solid #464648;
`;
const TextAreaEventBody = styled.textarea`
padding:4px 14px;
font-size:0.85rem;
width:100%;
min-height:200px;
background-color:#1E1F21;
color:#DDDDDD;
outline:unset;
border:unset;
border-bottom:1px solid #464648;

`;
// const InputEventBody  = styled.input`
// padding:4px 14px;
// font-size:0.85rem;
// width:100%;
// border:unset;
// background-color:#1E1F21;
// color:#DDDDDD;
// outline:unset;
// border-bottom:1px solid #464648;
// `;
const DivButtonsWrapper = styled.div`
padding:8px 14px;
display:flex;
justify-content:flex-end;
`;


const url = 'http://localhost:5000';
const totalDays = 42;
const defaultEvent = {
	title: '',
	description: '',
	date: moment().format('X')

};

const App = () => {
	moment.updateLocale('pl', { week: { dow: 1 } });//устанавливаем начало недели с понедельника (Monday) а не с воскресенья

	// const today = moment();
	const [day, setDay] = useState(moment());
	const monthStart = day.clone().startOf('month');
	const startWeekMonthstart = day.clone().startOf('month').startOf('week');//first week date of months start
	// console.log(startWeekMonthstart);
	const monthEnd = day.clone().endOf('month');
	const weekEndMonthEnd = monthEnd.clone().endOf('week');//last day in this page Calendar 


	const nextMonth = () => {
		console.log('Next');
		setDay((prev) => prev.clone().add(1, 'month'));
	}
	const prevMonth = () => {
		console.log('Prev');
		setDay((prev) => prev.clone().subtract(1, 'month'));
	}
	const currentDay = () => {
		setDay(moment());

	}
	const [events, setEvents] = useState([]);
	const [event, setEvent] = useState(null);//my event for update from calendar <EventItemWrapper>
	const [showForm, setShowForm] = useState(false);
	const [method, setMethod] = useState('');

	const startDateQuery = startWeekMonthstart.clone().format('X');//we clone first week date of months start for using in fetch

	const endDateQuery = startWeekMonthstart.clone().add(totalDays, 'days').format('X');//=day.clone().endOf('month').endOf('week')
	useEffect(() => {
		fetch(`${url}/events?date_gte=${startDateQuery}&date_lte=${endDateQuery}`)
			.then(resp => resp.json())
			.then(resp2 => {
				// console.log(startDateQuery);
				// console.log(resp2);
				setEvents(resp2)
			})
	}, [day])

	const openFormHandler = (methodName, eventForUpdate, it) => {
		console.log('onDBl ' + methodName);
		setShowForm(true);
		setEvent(eventForUpdate || { ...defaultEvent, date: it.format('X') });
		setMethod(methodName);

	}
	const cancelButtonHandler = () => {
		setShowForm(false);
		setEvent(null);
	}

	const changeEventHandler = (txt, keyName) => {
		setEvent(prevState => {
			return {
				...prevState,
				[keyName]: txt
			}
		})
	}
	const eventFetchHandler = () => {
		const fetchUrl = method === 'Edytuj' ? `${url}/events/${event.id}` : `${url}/events`;
		const httpMethod = method === 'Edytuj' ? 'PATCH' : 'POST';

		fetch(fetchUrl, {
			method: httpMethod,
			body: JSON.stringify(event),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp1 => resp1.json())
			.then(resp2 => {
				if (method === 'Edytuj') {
					setEvents(prevState => prevState.map(eventEl => eventEl.id === resp2.id ? resp2 : eventEl))
				} else {
					setEvents(prev => [...prev, resp2]);
				}

				cancelButtonHandler();
			})
	}

	const deleteEventFetchHandler = () => {
		fetch(`${url}/events/${event.id}`, {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res1 => res1.json())
			.then(resp2 => {
				setEvents(prev => prev.filter((filIt) => filIt.id !== event.id));
				cancelButtonHandler();
			}
			)
	}



	return (<>
		{
			showForm ? (
				<DivFormPositionWrapper onClick={cancelButtonHandler}>
					<DivFormWrapper onClick={(e) => e.stopPropagation()}>
						<DivEventTitle placeholder="title"
							value={event.title}
							onChange={e => changeEventHandler(e.target.value, 'title')}
						/>
						<TextAreaEventBody placeholder="description"
							value={event.description}
							onChange={e => changeEventHandler(e.target.value, 'description')}
						/>
						<DivButtonsWrapper >
							<button onClick={cancelButtonHandler}>Anuluj</button>
							<button onClick={eventFetchHandler}>{method}</button>
							{method === 'Edytuj' && <button onClick={deleteEventFetchHandler}>Usun</button>}
						</DivButtonsWrapper >

					</DivFormWrapper>
				</DivFormPositionWrapper>
			) : null
		}
		<DivAppWrapper>
			<Header />
			<Monitor today={day} next={nextMonth} prev={prevMonth} current={currentDay} />
			<Calendar startDay={startWeekMonthstart} today={day} totalDays={totalDays} events={events} openFormHandler={openFormHandler} />
		</DivAppWrapper>
	</>)
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);