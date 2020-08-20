import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Personas from '../pages/Personas';
import PersonasNew from '../pages/PersonasNew';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

function Routes(){

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/personas" component={Personas}/>
                <Route exact path="/personas/new" component={PersonasNew}/>
                <Route exact path="/personas/edit/:id"  component={PersonasNew} />
                <Route component={NotFound}/>
            </Switch>
        </Router>

    );


}

export default Routes; 