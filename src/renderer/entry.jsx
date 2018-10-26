import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './components/App.jsx'
import UserLogin from './components/UserLogin.jsx'
import AdminTables from './components/AdminTables.jsx'
import UserCreate from './components/UserCreate.jsx'
import PasswordChange from './components/PasswordChange.jsx'
import ProjectPage from './components/ProjectPage.jsx'
import Projects from './components/Projects.jsx'


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={UserLogin} />
        <Route path="create" component={UserCreate} />
        <Route path="change" component={PasswordChange} />
        <Route path="tables" component={Projects}>
          <IndexRoute component={ProjectPage} />
          <Route path=":id" component={AdminTables} />
        </Route>
      </Route>
    </Router>,
    document.getElementById('root')
  );
});
