import React from 'react';
import {Link} from 'react-router-dom';

export default () => {
    return (
        <div>I am the other page. I am the page who knocks!!
        <Link to="/">Go back home you're drunk</Link>
        </div>
    );
};