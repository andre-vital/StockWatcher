import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import LoginPage from "./Pages/Login";
import MainPage from "./Pages/Main/index";

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/signup" component={SignupPage} /> */}
          {/* <Route exact path='/login' component={LoginPage}/> */}
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/main" component={MainPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
