import React, { FC } from 'react';
import { Router as BaseRouter, Switch, Route, Redirect } from 'react-router';
import Home from './Home';
import history from '../utils/history';
import AdminUsers from './AdminUsers';

const ConnectedRouter: FC = () => (
    <Switch>
        <Route path="/" exact>
            <Home />
        </Route>
        <Route path="/admin" exact>
            <Redirect to="/admin/users" />  
        </Route>
        <Route path="/admin/users" exact>
            <AdminUsers />
        </Route>
        <Redirect to="/" />        
    </Switch>
);

const DisconnectedRouter: FC = () => (
    <Switch>
        <Route path="/" exact>
            <Home />
        </Route>
        <Redirect to="/" />
    </Switch>
);

interface RoutesProps {
    userIsConnected: boolean;
}

const Routes: FC<RoutesProps> = ({ userIsConnected }: RoutesProps) => {
    return userIsConnected ? <ConnectedRouter /> : <DisconnectedRouter />;
};

const Router: FC = () => {
    return (
        <BaseRouter history={history}>
            <Routes userIsConnected={true} />
        </BaseRouter>
    );
};

export default Router;
