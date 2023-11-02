// PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ element }) => {
    const { state } = useContext(AuthContext);

    return state.loggedIn ? (
        element
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateRoute;
