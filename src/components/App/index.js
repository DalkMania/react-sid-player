import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom'
import WebFont from 'webfontloader'
import Header from '../Header'
import Home from '../Home'
import Footer from '../Footer'
import NotFound from '../NotFound'
import About from '../About'
import Player from '../../containers/Player'
import '../../assets/css/app.css'

WebFont.load({
    google: {
      families: ['Lato:300', 'sans-serif']
    }
})

const App = () => (
    <Fragment>
        <Header />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/player/:id" component={Player} />
            <Route exact path="/about" component={About} />
            <Route component={NotFound}/>
        </Switch>
        <Footer />
    </Fragment>
)

export default App