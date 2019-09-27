import React, { Component } from 'react';
import MainScreen from './components/mainScreen/MainScreen.js'
import SecondPage from './components/secondPage/SecondPage.js'
import { BrowserRouter as Router, Route } from "react-router-dom";


class App extends Component {

  render () {
    return (
      <Router>
        <Route exact path='/' component={MainScreen} />
        <Route exact path="/cocktail/:id" component={SecondPage} />
      </Router>
    )
  }
}

export default App;
