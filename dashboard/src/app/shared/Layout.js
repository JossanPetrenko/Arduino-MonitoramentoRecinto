import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import MenuButton from './MenuButton';
import './layout.css'


class Layout extends React.Component {

    render() {
        return (
            <div>
                <AppBar iconElementLeft={<span />} title='Prototipo Monitoramento de Recinto' />
                <Paper zDepth={1} className="header">
                    <MenuButton to="/comandos" label='Comandos' />
                    <MenuButton to="/relatorios" label='Relatorio' />
                </Paper>
                {this.props.children}

            </div>
        );


    }
}

export default Layout;
