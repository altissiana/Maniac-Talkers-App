import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.jpg'
import { Link } from 'react-router-dom'
//material ui stuff
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
//redux stuff
import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userActions'


const styles = (theme) => ({
    ...theme.spreadThis,
    form : {
        textAlign: 'center'
      },
      image: {
          margin: '20px auto 20px auto'
      },
      pageTitle: {
          margin: '10px auto 20px auto'
      },
      textField: {
          margin: '10px auto 20px auto'
      },
      button: {
          marginTop: 20,
          position: 'relative'
      },
      customError: {
          color: 'red',
          fontSize: "0.8rem",
          marginTop: 10
      },
      progress: {
          position: 'absolute'
      }
}) 

class signup extends Component {

    state={
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI){
            this.setState({ errors: nextProps.UI.errors })
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        this.setState({
            loading: true
        })
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            name: this.state.name
        }
        this.props.signupUser(newUserData, this.props.history)   
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        
        const { classes, UI: {loading} } = this.props
        const errors = this.state.errors

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="face" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                        id="email" 
                        name="email" 
                        type="email" 
                        label="Email" 
                        className={classes.textField} 
                        helperText={errors ? errors.email: null}
                        error={errors && errors.email ? true : false}
                        value={this.state.email}
                        onChange={this.handleChange}
                        fullWidth/>
                        <TextField 
                        id="password" 
                        name="password" 
                        type="password" 
                        label="password" 
                        className={classes.textField} 
                        helperText={errors ? errors.password : ''}
                        error={errors && errors.password ? true : false}
                        value={this.state.password}
                        onChange={this.handleChange}
                        fullWidth/>
                        <TextField 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        label="confirm password" 
                        className={classes.textField} 
                        helperText={errors ? errors.confirmPassword : ''}
                        error={errors && errors.confirmPassword ? true : false}
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        fullWidth/>
                        <TextField 
                        id="name" 
                        name="name" 
                        type="text" 
                        label="Name" 
                        className={classes.textField} 
                        helperText={errors ? errors.name : null}
                        error={errors && errors.name ? true : false}
                        value={this.state.name}
                        onChange={this.handleChange}
                        fullWidth/>
                        {errors && errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button 
                        type="submit" 
                        variant="contained" 
                        color="secondary" 
                        className={classes.button}
                        disabled={loading}
                        >
                        Signup
                        {loading && (
                            <CircularProgress size={30} className={classes.progress} />
                        )}
                        </Button>
                        <br/><br/>
                        <small>
                        Already have an account ? login <Link to="/login">here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
})


export default connect(mapStateToProps, {signupUser})(withStyles(styles)(signup))
