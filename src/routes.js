import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Explore from "./pages/explore";
import Documentation from "./pages/documentation";
import NotFound from "./pages/notFound";
import User from "./pages/user";
import Edit from "./pages/edit";
import Create from "./pages/create";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/documentation" component={Documentation} />
        <Route exact path="/user/:userId" component={User}></Route>
        <Route exact path="/heliblock/:heliblockId" component={Edit}></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
