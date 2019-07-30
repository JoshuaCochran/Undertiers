import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Units from "./Units";
import UnitInfo from "./UnitInfo";
import AllianceInfo from "./AllianceInfo";
import Maps from "./MapTest/Maps";
import SignIn from "./LoginForm";
import { UserContext } from "./usercontext";

function Main() {
  const contextValue = useContext(UserContext);
  return (
    <main>
      <Switch>
        <Route exact path="/units" render={() => <Units maps={false} />} />
        <Route
          path="/units/:id"
          render={props => <UnitInfo id={props.match.params.id} />}
        />
        <Route
          path="/alliances/:id"
          render={props => <AllianceInfo id={props.match.params.id} />}
        />
        <Route path="/test" component={Maps} />
        <Route
          path="/boards/:id"
          render={props => 
          contextValue.token === null ? <Redirect to="/signin"/> : <Maps board_id={props.match.params.id} />}
        />
        <Route
          path="/signin"
          render={() =>
            contextValue.token !== null ? <Redirect to="/boards/2" /> : <SignIn />
          }
        />
      </Switch>
    </main>
  );
}

export default Main;
