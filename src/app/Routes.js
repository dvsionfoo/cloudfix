/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from "react";
import { Switch, Route } from "react-router-dom";
import {Layout} from "../theme/layout";
import BasePage from "./BasePage";
import { Error } from "./pages/Error";
import Login from './pages/Login';
import Register from './pages/Register';
import {ForgotPassword} from './pages/ForgotPassword';
import RefreshToken from './pages/RefreshToken';
import {ForgotPasswordChange} from './pages/ForgotPasswordChange';

export function Routes() {
    return (
        <Switch>
            <Route path="/error" component={Error} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/forgot-password-reset" component={ForgotPasswordChange} />            
            <Route path="/reauth" component={RefreshToken} />
            <Layout>
                <BasePage />
            </Layout>
        </Switch>
    );
}
