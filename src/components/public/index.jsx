import React from 'react';
import Routers from './routers';
import {withRouter} from 'react-router-dom';

const Index = ({history}) => {
    return(
        <div>
            <Routers />
        </div>
    )
}

export default withRouter(Index);