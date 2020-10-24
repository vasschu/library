import { createContext } from 'react';

export const AuthContext = createContext({
	isLoggedIn: false,
	setLoginState: (isLoggedIn, token = null) => {},
});
