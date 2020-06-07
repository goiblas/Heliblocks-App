import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import Home from "pages/home";
import Explore from "pages/explore";
import Documentation from "pages/documentation";
import NotFound from "pages/notFound";
import User from "pages/user";
import Edit from "pages/edit";
import View from "pages/view";
import Create from "pages/create";

const ScrollTo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollTo />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/documentation" component={Documentation} />
        <Route exact path="/user/:id" component={User}></Route>
        <Route exact path="/edit/:heliblockId" component={Edit}></Route>
        <Route exact path="/view/:heliblockId" component={View}></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
