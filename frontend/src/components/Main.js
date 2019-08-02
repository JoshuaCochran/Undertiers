import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Units from "./Units";
import UnitInfo from "./UnitInfo";
import AllianceInfo from "./AllianceInfo";
import Maps from "./MapTest/Maps";
import SignIn from "./LoginForm";
import { UserContext } from "./usercontext";
import SignUp from "./Register";
import BoardCard from "./MapTest/BoardCard"

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
          contextValue.loggedIn ? <Maps board_id={props.match.params.id} /> : <SignIn />}
        />
        <Route path="/register" component={SignUp}/>
        <Route
          path="/signin"
          render={() =>
            contextValue.loggedIn ? <Redirect to="/boards/2" /> : <SignIn />
          }
        />
        <Route path="/" component={BoardCard}/>
      </Switch>
    </main>
  );
}

export default Main;
