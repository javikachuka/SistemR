import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PersonasContainer from '../containers/PersonasContainer';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import PersonaNewContainer from '../containers/PersonaNewContainer';

function Routes(){

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/personas" component={PersonasContainer}/>
                <Route exact path="/personas/new" component={PersonaNewContainer}/>
                <Route exact path="/personas/edit/:id"  component={PersonaNewContainer} />
                <Route component={NotFound}/>
            </Switch>
        </Router>

    );


}

export default Routes; 