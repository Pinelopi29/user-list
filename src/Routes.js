import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import UserList from "./UserList";
import User from "./User";
import history from './history';


export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={UserList} />
                    <Route path="/User" component={User} />
                </Switch>
            </Router>
        )
    }
}