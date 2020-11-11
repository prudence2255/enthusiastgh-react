import React, {useContext} from 'react';
import {Route, withRouter, Redirect} from 'react-router-dom';
import {DataContext} from '../store/store';

const AuthRoute = ({children, ...rest}) => {
    const {loggedIn} = useContext(DataContext);
    return ( 
        <Route 
            {...rest}
            render={() => 
                loggedIn() ? (
                    children
                ) : (
                    <Redirect to="/admin/dev"/>
                )
            }
        />
     );
}
 
export default AuthRoute;