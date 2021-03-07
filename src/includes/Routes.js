import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import EspectroPolitico from '../pages/Eleicoes/EspectroPolitico';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/eleicoes/espectro-politico" component={EspectroPolitico} />
  </Switch>
);

export default Routes;
