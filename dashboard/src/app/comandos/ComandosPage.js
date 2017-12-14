import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon'
import Dialog from 'material-ui/Dialog'
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import comandosApi from '../../services/api/comandos.api';
import './comandos-page.css';

class ComandosPage extends React.Component {

    state = {
        title: null,
        message: null,
        successMessage: null,
        loading: {
            turnOn: false,
            turnOff: false,
            turnAuto: false
        }

    }

    turnLedOn() {
        this.setState({
            loading: {
                turnOn: true
            }
        });
        setTimeout(() => {
            comandosApi.turnLedOn().then(() => {
                this.setState({
                    loading: {
                        turnOn: false,
                    },
                    successMessage: "Comando enviado!"
                });

                setTimeout(() => {
                    this.setState({
                        successMessage: null

                    });
                }, 1500);
            })
                .catch(() => {
                    alert("Não foi possivel enviar o comando!");
                    this.setState({
                        loading: {
                            turnOn: false
                        }
                    });
                });;
        }, 1000);

    }

    turnLedOff() {
        this.setState({
            loading: {
                turnOff: true
            }
        });
        setTimeout(() => {
            comandosApi.turnLedOff().then(() => {
                this.setState({
                    loading: {
                        turnOff: false
                    },
                    successMessage: "Comando enviado!"
                });

                setTimeout(() => {
                    this.setState({
                        successMessage: null

                    });
                }, 1500);
            })
                .catch(() => {
                    alert("Não foi possivel enviar o comando!");
                    this.setState({
                        loading: {
                            turnOff: false
                        }
                    });
                });;
        }, 1000);
    }


    turnLedAuto() {
        this.setState({
            loading: {
                turnAuto: true
            }
        });

        setTimeout(() => {
            comandosApi.turnLedAuto().then(() => {
                this.setState({

                    loading: {
                        turnAuto: false
                    },
                    successMessage: "Comando enviado!"
                });

                setTimeout(() => {
                    this.setState({
                        successMessage: null

                    });
                }, 1500);


            })
                .catch(() => {
                    alert("Não foi possivel enviar o comando!");
                    this.setState({
                        loading: {
                            turnAuto: false
                        }
                    });
                });;
        }, 1000);
    }


    handleCloseDialog() {
        this.setState({
            message: null,
            title: null
        });
    }

    render() {
        return (
            <div className="comandos-page">

                <Dialog
                    title={this.state.title}
                    actions={[
                        <FlatButton
                            label="Ok"
                            primary={true}
                            keyboardFocused={true}
                            onClick={this.handleCloseDialog}
                        />
                    ]}
                    modal={false}
                    open={!!this.state.message}
                    onRequestClose={this.handleCloseDialog}
                >
                    {this.state.message}
                </Dialog>


                <Paper className={"mensagem-sucesso " + (this.state.successMessage ? "" : "hide")}>
                    {this.state.successMessage}
                </Paper>


                <Paper className="painel-comandos">
                    <RaisedButton
                        label="Acender Luz"
                        secondary={true}
                        disabled={this.state.loading.turnOn}
                        onClick={() => this.turnLedOn()}
                        className="btn-comando"
                        icon={<FontIcon className="mdi mdi-lightbulb" />}
                    />
                    <RaisedButton
                        label="Apagar Luz"
                        secondary={true}
                        disabled={this.state.loading.turnOff}
                        onClick={() => this.turnLedOff()}
                        className="btn-comando"
                        icon={<FontIcon className="mdi mdi-lightbulb-outline" />}
                    />
                    <RaisedButton
                        label="Luz Automática"
                        secondary={true}
                        disabled={this.state.loading.turnAuto}
                        onClick={() => this.turnLedAuto()}
                        className="btn-comando"
                        icon={<FontIcon className="mdi mdi-lightbulb-on" />}
                    />
                </Paper>


            </div>
        );


    }
}

export default ComandosPage;
