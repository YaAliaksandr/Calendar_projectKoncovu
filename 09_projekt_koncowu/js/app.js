import React, { Component, useState } from "react";
import { createRoot } from "react-dom/client";
import moment from "moment/moment";
import { styled } from "styled-components";
import { Calendar } from "./components/CalendarGrid/Calendar";
import { Header } from "./components/Header/Header";
import { Monitor } from "./components/Monitor/Monitor";



// const DayInWrapper = styled.div`
// height:31px;`;
const AppWrapper = styled.div`
border: 2px solid blue;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 0 0 1px #1A1A1A,0 8px 20px 6px #888;
`;

const App = () => {
	moment.updateLocale('en', { week: { dow: 1 } });//устанавливаем начало недели с понедельника (Monday) а не с воскресенья

	// const today = moment();
	const [day, setDay] = useState(moment());
	const monthStart = day.startOf('month');
	const startWeekMonthstart = monthStart.clone().startOf('week');//first week date of months start
	console.log(startWeekMonthstart);
	const monthEnd = moment().endOf('month');
	const weekEndMonthEnd = monthEnd.endOf('week');//last day in this page Calendar 


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

	return (<AppWrapper >
		<Header />
		<Monitor today={day} next={nextMonth} prev={prevMonth} current={currentDay} />
		<Calendar startDay={startWeekMonthstart} />
	</AppWrapper>)
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);