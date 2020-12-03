import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


import LoginPage from "./Pages/Login/index.js";


class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/signup" component={SignupPage} /> */}
          {/* <Route exact path='/login' component={LoginPage}/> */}
          <Route path="/" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;