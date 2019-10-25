import React from "react";
import "../css/App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../components/Home";
import SignUp from "../components/SignUp";
import Navbar from "./Layout/Navbar";

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />

        <Router>
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li>
                  <Link to={"/"} className="nav-link">
                    {" "}
                    Home{" "}
                  </Link>
                </li>
                <li>
                  <Link to={"/signup"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </nav>
            <hr />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;


// function nav_bar() {
//   return (
//     <nav class="navbar navbar-expand-lg fixed-top ">
//       <nav class="navbar-brand" href="#">Home</nav>
//       <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//         <span class="navbar-toggler-icon"></span>
//       </button>
//       <div class="collapse navbar-collapse " id="navbarSupportedContent">
//         <ul class="navbar-nav mr-4">
//           <li class="nav-item">
//             <button class="nav-link" data-value="Log-in" href="#">Log-in</button>
//           </li>
//           <li class="nav-item">
//             <button class="nav-link " data-value="Register" href="#">Register</button>
//           </li>
//           <li class="nav-item">
//             <button class="nav-link " data-value="about" href="#">About us</button>
//           </li>
//           <li class="nav-item">
//             <button class="nav-link " data-value="team" href="#">Team</button>
//           </li>
//           <li class="nav-item">
//             <button class="nav-link " data-value="contact" href="#">Contact</button>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }