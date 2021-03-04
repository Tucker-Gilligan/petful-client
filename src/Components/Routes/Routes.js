import { Route, Switch } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import AdoptionPage from '../AdoptionPage/AdoptionPage';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/adopt" component={AdoptionPage} />
    </Switch>
  );
}

export default Routes;
