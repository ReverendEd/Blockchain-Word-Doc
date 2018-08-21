import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import YourProjects from './components/YourProjects/YourProjects';
import InfoAndSettings from './components/InfoAndSettings/InfoAndSettings';
import Editor from './components/Editor/Editor';
import ListItem from './components/YourProjects/ProjectList/ListItem/ListItem'

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Project Base" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/yourprojects"
          component={YourProjects}
        />
        <Route
          path="/infoandsettings"
          component={InfoAndSettings}
        />
        <Route
          path="/editor"
          component={Editor}
        />
      </Switch>
    </Router>
  </div>
);

export default App;
