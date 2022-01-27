import React from 'react';
import {useLocation} from "react-router-dom";

const Whoops404 = () => {
    const location = useLocation();
    console.log('UseLocation: ', location);
    return (
        <div>
            <h1>Страница не найдена по пути: {location.pathname}</h1>
        </div>
    );
};

export default Whoops404;