import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../../util/MyButton'
import dayjs from 'dayjs'
import {Link} from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';
import {connect} from 'react-redux'
import {getScream, clearErrors} from '../../redux/actions/dataActions'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import LikeButton from './LikeButton'
import Comments from './Comments'
import CommentForm from './CommentForm'

const styles = (theme) => ({

    ...theme.spreadThis,

    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    expandButton: {
        position: 'absolute',
        left: '90%'  
    },
    expandColor: {
        color:'#808080'
    },
    SpinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    changeColor: {
        color: '#808080'
    },
    invisibleSeparator : {
        border: 'none',
        margin: 4 
    }
    
})

class ScreamDialog extends Component{

    state = {
       open: false,
       oldPath: '',
       newPath: ''
    }

    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen()
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname
        const {userName, screamId} = this.props
        const newPath = `/users/${userName}/scream/${screamId}`
        if(oldPath === newPath) oldPath = `/users/${userName}`
        window.history.pushState(null, null, newPath)
        this.setState({open: true, oldPath, newPath})
        this.props.getScream(this.props.screamId)
    }

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath)
        this.setState({open: false})
        this.props.clearErrors()
    }

    render(){
        const {classes, scream: {
            screamId, 
            body, 
            createdAt, 
            likeCount, 
            commentCount, 
            userImage, 
            userName,
            comments
           }, 
            UI: {loading}
        } = this.props

        const dialogMarkup = loading ? (
            <div className={classes.SpinnerDiv}>
            <CircularProgress size={200} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography component={Link} color="primary" variant="h5" to={`users/${userName}`}>
                        @{userName}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body2" className={classes.changeColor}>
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body1">{body}</Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                </Grid>
                <hr className={classes.invisibleSeparator}/>
                <CommentForm screamId={screamId}/>
                <Comments comments={comments}/>
            </Grid>
        )

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Expand scream" tipClassName={classes.expandButton}>
                    <UnfoldMoreIcon className={classes.expandColor}/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                <MyButton tip="Close" onClick={this.handleClose} className={classes.closeButton}>
                    <CloseIcon/>
                </MyButton>        
                <DialogContent className={classes.DialogContent}>
                    {dialogMarkup}
                </DialogContent> 
                </Dialog>
            </Fragment>
        )
    }

   
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
})

const mapActionsToProps = {
    getScream,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog))