import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Routes, Route, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import HomePage from './HomePage';
import Login from './Login';

import PrivateRoute from './PrivateRoute';

const Header = () => {
    const { state, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const isUserLoggedIn = state.loggedIn;

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    };

    const canNavigateToHome = isUserLoggedIn; // Check if the user is logged in

    return (
        <div>
            <AppBar position="sticky" style={{ backgroundColor: '#262424' }}>
                <Toolbar>
                    <Box display={'flex'}>
                        <Button
                            className="btn bg-danger text-light"
                            LinkComponent={Link}
                            to={canNavigateToHome ? '/home' : '/login'} // Conditionally set the link destination
                            sx={{ margin: 1, color: 'white', fontWeight: 400 }}
                            disabled={!canNavigateToHome} // Disable the button when the user is not logged in
                        >
                            Home
                        </Button>

                        <Button
                            className="btn text-light"
                            LinkComponent={Link}
                            to={canNavigateToHome ? '/userprofile' : '/login'}
                            disabled={!canNavigateToHome}
                            sx={{ margin: 1, color: 'white', fontWeight: 400 }}
                        >
                            User Profile
                        </Button>
                        <Button
                            className="btn text-light"
                            LinkComponent={Link}
                            to={canNavigateToHome ? '/petdetails' : '/login'}
                            disabled={!canNavigateToHome}
                            sx={{ margin: 1, color: 'white', fontWeight: 400 }}
                        >
                            Pet Details
                        </Button>
                        <Button
                            className="btn text-light"
                            LinkComponent={Link}
                            to={canNavigateToHome ? '/contactUs' : '/login'}
                            disabled={!canNavigateToHome}
                            sx={{ margin: 1, color: 'white', fontWeight: 400 }}
                        >
                            Contact
                        </Button>
                    </Box>
                    <Box display={'flex'} style={{ marginLeft: 'auto' }}>
                        {isUserLoggedIn ? (
                            <Button
                                className="btn bg-success"
                                onClick={handleLogout}
                                sx={{ margin: 1, color: 'white', fontWeight: 400 }}
                            >
                                Logout
                            </Button>
                        ) : (
                            <>
                                <Button
                                    className="btn"
                                    LinkComponent={Link}
                                    to="/login"
                                    sx={{ margin: 1, color: 'white', fontWeight: 400 }}
                                >
                                    Login
                                </Button>
                                <Button
                                    className="btn bg-primary text-light fw-bolder"
                                    LinkComponent={Link}
                                    to="/register"
                                    sx={{ margin: 1, color: 'white', fontWeight: 400 }}
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Outlet />
                    }
                />
                <Route path="/home" element={<PrivateRoute />} />
            </Routes>
        </div>
    );
};

export default Header;
