import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import { connect } from 'react-redux'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import dayjs from 'dayjs'
import Tooltip from '@material-ui/core/Tooltip' 
import { logoutUser, uploadImage } from '../../redux/actions/userActions'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import EditDetails from './EditDetails'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import ProfileSkeleton from '../../util/ProfileSkeleton'

const styles = (theme) => ({
    ...theme.spreadThis,
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
})


class Profile extends Component {

    handleImageChange = event => {
        const image = event.target.files[0]
        const formData = new FormData()
        formData.append('image', image, image.name)
        this.props.uploadImage(formData)
    }

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click()
    }

    handleLogout = () => {
        this.props.logoutUser()
    }

    render() {
        const {classes, 
            user: {
                credentials: {name, createdAt, imageUrl, bio, website, location},
                loading,
                authenticated
            }
        } = this.props

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange}/>
                        <Tooltip title="Edit profile picture" placement="top">
                            <Button onClick={this.handleEditPicture} className="button">
                                <PhotoCameraIcon color="primary"/>
                            </Button>
                        </Tooltip>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${name}`} color="primary" variant="h5">
                            @{name}
                        </MuiLink>
                        <hr/>
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr/>
                        {location && (
                            <Fragment>
                                <LocationOnIcon color="primary"/> <span>{location}</span>
                                <hr/>
                            </Fragment>
                        )}
                        {website && (
                            <Fragment>
                                <LinkIcon color="primary"/>
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                                <hr/>
                            </Fragment>
                        )}
                        <CalendarTodayIcon color="primary"/>{' '}
                        <span>Joined  {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                    <Tooltip title="Logout" placement="top">
                            <Button onClick={this.handleLogout}>
                                <KeyboardReturnIcon color="primary"/>
                            </Button>
                    </Tooltip>
                    <EditDetails/>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found, please login again
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="secondary" component={Link} to="/login">
                       Login 
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">
                       Signup 
                    </Button>
                </div>
            </Paper>
        )) : (<ProfileSkeleton/>)
        
        return profileMarkup
        
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = { logoutUser, uploadImage }

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}  

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))