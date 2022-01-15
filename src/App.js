import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Cards from "./components/Cards";
import Header from "./components/Header";
const dotenv = require('dotenv')

// import Github from "./components/Github";

const App = () => {
	return (
  <Router>
		<div>
			<Header />
			<Cards />
		</div>
  </Router>
	);
};

export default App;
