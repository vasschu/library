import React, {useState} from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Books from './components/Books/Books';
import User from './components/User/User';
import NotFound from './components/NotFound';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import IndividualBook from './components/IndividualBook/IndividualBook';
import { AuthContext } from './components/Context/AuthContext';

function App() {
	const [authValue, setAuthValue] = useState(false);

	return (
  <div className='App'>
    <BrowserRouter>
      <AuthContext.Provider
        value={{ isLoggedIn: authValue, setLoginState: setAuthValue }}
      >
        <Header />
        <Switch>
          {/* We can add conditional for redirect auth user -> homepage / unauth user -> landingpage */}
          <Redirect path='/' exact to='/landing' />
          <Route path='/landing' component={LandingPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/books' exact component={Books} />
          <Route path='/books/:id' component={IndividualBook} />
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
