import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from 'react-redux'
import {deleteScream} from '../../redux/actions/dataActions'
import { Dialog} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';



// const styles = (theme) => ({
//     ...theme.spreadThis,
const styles = {
    deleteButton: {
        position: 'absolute',
        left: '90%',
        color: '#cd5c5c',
        top: '10%'  
    },
    deleteBtn: {
        color: '#cd5c5c'
    },
    cancelBtn: {
        color: '#808080'
    }
}

class DeleteScream extends Component {

    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    deleteScream = () => {
        this.props.deleteScream(this.props.screamId)
        this.setState({open: false})
    }

    render() {
        const {classes} = this.props
        return (
            <Fragment>
                <MyButton tip="Delete Scream"
                onClick={this.handleOpen}
                btnClassName={classes.deleteButton}>
                    <DeleteOutlineIcon/>
                </MyButton>
                <Dialog 
                open={this.state.open} 
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm">
                    <DialogTitle>Are you sure you want to delete this scream ?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} className={classes.cancelBtn}>Cancel</Button>
                        <Button onClick={this.deleteScream} className={classes.deleteBtn}>Delete</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}

export default connect(null, { deleteScream })(withStyles(styles)(DeleteScream))
