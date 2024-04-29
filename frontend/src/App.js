import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import * as timeago from "timeago.js";
import hu from "timeago.js/lib/lang/hu";

import Sidebar from "./components/Sidebar/Sidebar";
import Map from "./components/Map/Map";
import SortByRate from "./components/SortByRate/SortByRate";
import CommentsPage from "./components/CommentsPage/CommentsPage";
import Profile from "./components/Profile/Profile";
import NewestPins from "./components/NewestPins/NewestPins";
import Recommender from "./components/Recommender/Recommender";

import "./App.scss";

timeago.register("hu", hu);

function App() {
  const [pins, setPins] = useState([]);
  const { REACT_APP_SERVER_URL } = process.env;

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get(`${REACT_APP_SERVER_URL}/pins`);
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  return (
    <div className="app" style={{ height: "100vh", width: "100%" }}>
      <Router>
        <Switch>
          <Route path="/sort-by-rate">
            <SortByRate pins={pins} />
          </Route>
          <Route path="/recommender">
            <Recommender pins={pins} />
          </Route>
          <Route path="/newest-pins">
            <NewestPins pins={pins} />
          </Route>
          <Route path="/comments/:id">
            <CommentsPage />
          </Route>
          <Route path="/users/:id">
            <Profile pins={pins} />
          </Route>
          <Route exact path="/">
            <Sidebar />
            <Map pins={pins} setPins={setPins} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
