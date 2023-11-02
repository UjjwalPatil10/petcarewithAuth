
import { createContext, useContext, useReducer } from 'react';

export const AuthContext = createContext();

const initialState = {
    loggedIn: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { loggedIn: true };
        case 'LOGOUT':
            return { loggedIn: false };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

// export const useAuth = () => {
//     return useContext(AuthContext);
// };