import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'
//components
import Navbar from './components/layout/Navbar'
import AuthRoute from './util/AuthRoute'
//pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup' 
import user from './pages/user'
//redux
import store from './redux/store'
import { SET_AUTHENTICATED} from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'
import axios from 'axios'

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken
if(token){
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/login'
  }else{
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

axios.defaults.baseURL = "https://us-central1-maniac-talkers.cloudfunctions.net/api"


export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
          <Navbar/>
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <Route exact path="/users/:name" component={user}/>
                <Route exact path="/users/:name/scream/:screamId" component={user}/>
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    )
  }
}
