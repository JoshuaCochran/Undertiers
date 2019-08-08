import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Units from "./Units";
import UnitInfo from "./UnitInfo";
import AllianceInfo from "./AllianceInfo";
import Maps from "./MapTest/Maps";
import SignIn from "./LoginForm";
import { UserContext } from "./usercontext";
import SignUp from "./Register";
import BoardList from "./MapTest/BoardList";
import MapsViewMode from "./MapTest/MapsViewMode";
import BoardCreateField from "./MapTest/BoardCreateField";

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
        <Route path="/boards/create" component={BoardCreateField}/>
        <Route
          path="/boards/me"
          render={() =>
            contextValue.loggedIn ? <BoardList all={false} /> : <SignIn />
          }
        />
        <Route
          path="/boards/edit/:id"
          render={props => contextValue.loggedIn ? <Maps board_id={props.match.params.id}/> : <Redirect to="/"/>}/>
        />
        <Route
          path="/boards/:id"
          render={props => <MapsViewMode loggedIn={contextValue.loggedIn} board_id={props.match.params.id} />}
        />
        <Route path="/register" component={SignUp} />
        <Route
          path="/signin"
          render={() =>
            contextValue.loggedIn ? <Redirect to="/" /> : <SignIn />
          }
        />
        <Route path="/" render={() => <BoardList all={true} />} />
      </Switch>
    </main>
  );
}

export default Main;
