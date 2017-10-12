import React from 'react'
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import LinearProgress from 'material-ui/LinearProgress';
import sensorsApi from '../../services/api/sensors.api';
import './relatorios-page.css';

class RelatoriosPage extends React.Component {

    state = {
        dados: [],
        loading: true
    }

    componentWillMount() {
        this.loadItems();
    }

    loadItems() {

        this.setState({ loading: true });

        sensorsApi
            .getAll()
            .then(data => this.setState({ dados: data, loading: false }))
            .catch(error => alert("Ocorreu um erro ao solicitar os dados"));

    }

    renderItem(dado) {

        var luzLigada = dado.light > 600 ? false : true;
        var label = luzLigada ? "Luz Ligada" : "Luz Desligada";
        var data = moment(dado.date).format("DD/MM/YYYY [às] HH:mm");
        var lighClassname = luzLigada ? "mdi mdi-lightbulb" : "mdi mdi-lightbulb-outline";

        return (
            <ListItem
                primaryText={label}
                secondaryText={data}
                leftIcon={<FontIcon className={lighClassname} />} />
        );

    }

    render() {
        return (
            <div className="relatorios-page">

                <Paper rounded={false} className="painel-relatorios">
                    <FlatButton onClick={() => this.loadItems()} disabled={this.state.loading} style={{ position: "absolute", right: 0, top: 0, width: 50, minWidth: 50 }} >
                        <FontIcon className="mdi mdi-refresh" />
                    </FlatButton>
                    <List>
                        <Subheader> Iluminação </Subheader>
                        {this.state.loading ? <LinearProgress mode="indeterminate" /> : null}
                        {this.state.dados.map(dado => this.renderItem(dado))}

                    </List>


                </Paper>
            </div>
        );


    }
}

export default RelatoriosPage;
