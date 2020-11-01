import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Books from './containers/Books/Books';
import User from './containers/User/User';
import UsersAdmin from './containers/UsersAdmin/UsersAdmin.jsx';
import NotFound from './components/NotFound';
import LandingPage from './containers/LandingPage/LandingPage';
import LoginPage from './containers/LoginPage/LoginPage.jsx';
import RegisterPage from './containers/RegisterPage/RegisterPage.jsx';
import IndividualBook from './containers/IndividualBook/IndividualBook';
import { AuthContext } from './context/AuthContext';

function App() {
	const isAuth = !!localStorage.getItem('token');
	const [auth, setAuth] = useState(isAuth);
	const setLoginState = (isLogged, token = null) => {
		if (isLogged) {
			localStorage.setItem('token', token);
			setAuth((prev) => !prev);
		} else {
			localStorage.removeItem('token');
			setAuth((prev) => !prev);
		}
	};

	return (
  <div className='App'>
    <BrowserRouter>
      <AuthContext.Provider value={{ isLoggedIn: auth, setLoginState }}>
        <Header />
        <Switch>
          {auth ? (
            <Redirect path='/' exact to='/books' />
							) : (
  <Redirect path='/' exact to='/landing' />
							)}
          <Route path='/register' component={RegisterPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/landing' component={LandingPage} />
          {auth && (
            <>
              <Route path='/books' exact component={Books} />
              <Route path='/books/:id' component={IndividualBook} />
              <Route path='/user' exact component={User} />
            </>
							)}
          <Route path='*' component={NotFound} />
        </Switch>
        {/* <Footer /> */}
      </AuthContext.Provider>
    </BrowserRouter>
  </div>
	);
}

export default App;
