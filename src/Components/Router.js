import React from "react";
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import Home from "Routes/Home";
import TV from "Routes/TV";
import Search from "Routes/Search";
import Header from "Components/Header";
import Detail from "Routes/Detail";
import { Seasons } from "Routes/Seasons";
import { Season } from "Routes/Season";

export default () => {
    return (
        <Router>
            <>
                <Header/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/tv" component={TV}/>
                    <Route path="/search" component={Search}/>
                    <Route path="/movie/:id" component={Detail}/>
                    <Route path="/show/:id" component={Detail}/>
                    <Route path="/seasons/:id" exact component={Seasons}/>
                    <Route path="/seasons/:id/:number" component={Season}/>
                    <Redirect from="*" to="/"/>
                </Switch>
            </>
        </Router>
    )
}