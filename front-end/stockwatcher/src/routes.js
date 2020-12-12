import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./Pages/Login";
import MainPage from "./Pages/Main/index";
import isAuthenticated from "./auth";

function PrivateRoute({ component: Component, ...rest }) {
  const isLogged = isAuthenticated();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}
class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <PrivateRoute exact path="/main" component={MainPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
