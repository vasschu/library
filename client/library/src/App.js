import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Books from './components/Books/Books';
import User from './components/User/User';
import NotFound from './components/NotFound';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage.jsx';
import RegisterPage from './components/RegisterPage/RegisterPage.jsx';
import IndividualBook from './components/IndividualBook/IndividualBook';
import { AuthContext } from './components/Context/AuthContext';
import { BooksProvider } from './components/Context/BooksContext'


function App() {
	const isAuth = !!localStorage.getItem('token');
	const [auth, setAuth] = useState(isAuth);
	const setLoginState = (isLogged, token = null) => {
		if (isLogged) {
			localStorage.setItem('token', token);
			setAuth(true);
		} else {
			localStorage.removeItem('token');
			setAuth(false);
		}
  };

	return (
  <div className='App'>
    <BrowserRouter>
      <AuthContext.Provider value={{ isLoggedIn: auth, setLoginState }}>
        <Header />
        <Switch>
          {/* We can add conditional for redirect auth user -> homepage / unauth user -> landingpage */}
          <Redirect path='/' exact to='/landing' />
          <Route path='/landing' component={LandingPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <BooksProvider>
            <Route path='/books' exact component={Books} />
            <Route path='/books/:id' component={IndividualBook} />
          </BooksProvider>
          <Route path='/user' exact component={User} />
          <Route path='*' component={NotFound} />
        </Switch>
        <Footer />
      </AuthContext.Provider>
    </BrowserRouter>
  </div>
	);
}

export default App;
