import React, { useState } from 'react';

const AuthContext = React.createContext({
	token: '',
	isLoggedIn: false,
	login: (token) => {},
	logout: () => {},
});

const AuthContextProvider = (props) => {
	const [token, setToken] = useState(null);

	// !! convert object to boolean, example if object is 0, null or undefined
	const userIsLoggedIn = !!token;
	const loginHandler = (token) => {
		setToken(token);
	};
	const logoutHandler = () => {
		setToken(null);
	};
	const contextValue = {
		token: token,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};
