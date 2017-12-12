import React from 'react';
import { Route, Switch } from 'react-router-dom'
import NotFound from '../notfound'
import Header from '../header'
import Footer from '../footer'
import Player from '../player'
import About from '../about'

const App = () => (
  <div>
    <Header />
      <Switch>
        <Route exact path="/" component={Player} />
        <Route exact path="/about" component={About} />
        <Route component={NotFound}/>
      </Switch>
    <Footer />
  </div>
)

export default App
