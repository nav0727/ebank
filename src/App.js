import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'

import Ebank from './components/EbankLogin'
import Home from './components/EbankHome'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/ebank/login" component={Ebank} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
