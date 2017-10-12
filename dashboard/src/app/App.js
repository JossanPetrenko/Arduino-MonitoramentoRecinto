import React from 'react'
import Layout from './shared/Layout';
import Paper from 'material-ui/Paper';


class App extends React.Component {

    render() {
        return (
            <Layout>
                <Paper zDepth={1} className="header">
                
                </Paper>
                {this.props.children}
            </Layout>
        );


    }
}

export default App;

