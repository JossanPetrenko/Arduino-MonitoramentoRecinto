import React from 'react';
import App from '../app/App';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ComandosPage from '../app/comandos/ComandosPage'
import RelatoriosPage from '../app/relatorios/RelatoriosPage'

export default (
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <Route path='comandos' component={ComandosPage} />
           <Route path='relatorios' component={RelatoriosPage} />

        </Route>
    </Router>
)