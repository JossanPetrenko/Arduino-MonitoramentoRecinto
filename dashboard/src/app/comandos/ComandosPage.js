import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import './comandos-page.css';

class ComandosPage extends React.Component {

    render() {
        return (
            <div className="comandos-page">

                <Paper className="painel-comandos">
                    <RaisedButton
                        label="Acender Luz"
                        secondary={true}
                        className="btn-comando"
                        icon={<FontIcon className="mdi mdi-lightbulb" />}
                    />
                    <RaisedButton
                        label="Apagar Luz"
                        secondary={true}
                        className="btn-comando"
                        icon={<FontIcon className="mdi mdi-lightbulb-outline" />}
                    />
                    <RaisedButton
                        label="Luz Automática"
                        secondary={true}
                        className="btn-comando"
                        icon={<FontIcon className="mdi mdi-lightbulb-on" />}
                    />
                </Paper>


            </div>
        );


    }
}

export default ComandosPage;
