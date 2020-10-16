import React from 'react';
import { BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Main from './components/Main/Main'
import NotFound from './components/NotFound'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Redirect path="/" exact to="/landing" />
          <Route path="/landing" component={Main} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
