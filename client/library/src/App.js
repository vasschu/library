import React from 'react';
import { BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Books from './components/Books/Books'
import NotFound from './components/NotFound'
import LandingPage from './components/LandingPage/LandingPage'
import IndividualBook from './components/Books/IndividualBook/IndividualBook'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          {/* We can add conditional for redirect auth user -> homepage / unauth user -> landingpage */}
          <Redirect path="/" exact to="/landing" />
          <Route path="/landing" component={LandingPage} />
          <Route path="/books" exact component={Books} />
          <Route path='/books/:id' component={IndividualBook} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
