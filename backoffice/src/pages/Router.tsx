import React, { FC } from 'react';
import { Router as BaseRouter, Switch, Route, Redirect } from 'react-router';
import Home from './Home';
import history from '../utils/history';
import AdminUsers from './AdminUsers';
import Servers from './Servers';
import AdminTournaments from './AdminTournaments';
import Server from './Server';

const ConnectedRouter: FC = () => (
    <Switch>
        <Route path="/" exact>
            <Home />
        </Route>
        <Route path="/servers" exact>
            <Servers />
        </Route>
        <Route path="/server/:serverId" component={Server}>
        </Route>
        <Route path="/admin" exact>
            <Redirect to="/admin/users" />  
        </Route>
        <Route path="/admin/users" exact>
            <AdminUsers />
        </Route>
        <Route path="/admin/tournaments" exact>
            <AdminTournaments />
        </Route>
        <Redirect to="/" />        
    </Switch>
);

const DisconnectedRouter: FC = () => (
    <Switch>
        <Route path="/" exact>
            <Home />
        </Route>
        <Route path="/servers" exact>
            <Servers />
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
