import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import moment from "moment/moment";



const App = () => {
	console.log("+++");
	console.log(moment());

	return (<>
		<h1>Alex</h1>
	</>)
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);