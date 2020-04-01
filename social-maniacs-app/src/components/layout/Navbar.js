import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
//material ui stuff
import AppBar from '@material-ui/core/AppBar'
import Tollbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home';
import PostScream from '../scream/PostScream'
import Notifications from './Notifications'


class Navbar extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <AppBar>
                <Tollbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <PostScream />
                            <Link to="/"> 
                                <MyButton tip="Home">
                                    <HomeIcon color="primary"/>
                                </MyButton>
                            </Link>
                            <Notifications />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="signup">Signup</Button>
                        </Fragment>
                    )}
                </Tollbar>
            </AppBar>
        
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar) 