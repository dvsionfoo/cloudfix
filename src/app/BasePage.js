import React, { Suspense} from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../theme/layout";
import Dashboard from "./pages/Dashboard";
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Team } from './pages/Team';
import { Terms } from './pages/Terms';
import { Logout } from "./pages/Logout";
import { Instructions } from './pages/Instructions';
import { ArnDetails } from './pages/ArnDetails';
import Accounts from './pages/Accounts';
import  { Setup } from './pages/Setup';
import { Home  } from './pages/Home';
import LinkAccount from './pages/LinkAccount';
import ChangePassword from './pages/ChangePassword';

export default function BasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/login" />
        }
        <ContentRoute path="/home" component={Home} />
        <ContentRoute path="/link-account" component={LinkAccount} />
        <ContentRoute path="/logout" component={Logout} />
        <ContentRoute path="/dashboard" component={Dashboard} />
        <ContentRoute path="/about" component={About}/>
        <ContentRoute path="/contact" component={Contact}/>
        <ContentRoute path="/team" component={Team}/>
        <ContentRoute path="/terms-conditions" component={Terms}/>
        <ContentRoute path="/instructions" component={Instructions}/>
        <ContentRoute path="/arn-details" component={ArnDetails}/>
        <ContentRoute path="/accounts" component={Accounts}/>
        <ContentRoute path="/setup" component={Setup}/>
        <ContentRoute path="/change-password" component={ChangePassword} />
        <Redirect to="error/" />
      </Switch>
    </Suspense>
  );
}
