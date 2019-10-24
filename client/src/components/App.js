import React from 'react';
import '../css/App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../components/Home';
import SignUp from '../components/SignUp';

class App extends React.Component {
  render() {
      return (
        <div> 
          <BootStrapHeader/>

        <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/signup'} className="nav-link">Sign Up</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/signup' component={SignUp} />
          </Switch>
        </div>
      </Router>
      </div>

      );
  }
}

export default App;

function BootStrapHeader(props) {
  return (
      <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
      </head>
  );
}
