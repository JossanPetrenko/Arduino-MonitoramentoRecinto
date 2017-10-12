import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {withRouter} from 'react-router';



export default withRouter(function MenuButton({ className, router, to, label }) {

    //const isPrimary = ~className.indexOf("active");

    return (
        <FlatButton onClick={() => router.push(to)} label={label} />
    )


});