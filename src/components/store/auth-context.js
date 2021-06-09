import React, { useState, useEffect } from 'react';

 const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


  // useEffect will run AFTER this component renders, and will rerender if the dependency changes only
  // since it has no dependencies  it behaves just like ngOninit
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

    const loggoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1')
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: loggoutHandler,
                onLogin: loginHandler,
            }}
            >
                {props.children}
       </AuthContext.Provider> 
    );
};

export default AuthContext;


// kinda looks like a service