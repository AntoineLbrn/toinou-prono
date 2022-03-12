import React, { FC } from 'react';
import { Router as BaseRouter, Switch, Route, Redirect } from 'react-router';
import Home from './Home';
import history from '../utils/history';
import AdminUsers from './AdminUsers';
import Servers from './Servers';
import AdminTournaments from './AdminTournaments';
import Server from './Server';
import Tournaments from './Tournaments';
import Tournament from './Tournament';
import AdminServers from './AdminServers';
import AdminSubscription from './AdminSubscription';
import AdminTournamentCreate from './AdminTournamentCreate';
import AdminTournamentEdit from './AdminTournamentEdit';
import MyBets from './MyBets';
import { getToken } from '../utils/session';

const ConnectedRouter: FC = () => (
    <Switch>
        <Route path="/" exact>
            <Home />
        </Route>
        <Route path="/tournaments" exact>
            <Tournaments />
        </Route>
        <Route path="/my-bets/:tournamentId" component={MyBets}/>
        <Route path="/my-bets" component={MyBets}/>
        <Route path="/tournament/:tournamentId" component={Tournament}/>
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
        <Route path="/admin/tournaments/create" exact>
            <AdminTournamentCreate />
        </Route>
        <Route path="/admin/tournaments/edit/:id" component={AdminTournamentEdit} />
        <Route path="/admin/servers/subscription/:id" component={AdminSubscription}>
        </Route>
        <Route path="/admin/servers" exact>
            <AdminServers />
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
    const isConnected = !!getToken();
    return (
        <BaseRouter history={history}>
            <Routes userIsConnected={isConnected} />
        </BaseRouter>
    );
};

export default Router;
