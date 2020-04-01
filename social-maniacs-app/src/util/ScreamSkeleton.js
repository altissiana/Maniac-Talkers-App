import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import NoImg from '../images/no-img.png'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from '@material-ui/core/styles/withStyles'

const styles = (theme) => ({
    ...theme.spreadThis,
    card: {
        display: 'flex',
        marginBottom: 20
    },
    CardContent: {
        width: '100%',
        flexDirection: 'column',
        padding: 25
    },
    cover: {
        minWidth: 200,
        objectFit: 'cover'
    },
    name: {
        width: 60,
        height: 40,
        backgroundColor: theme.palette.primary.light,
        marginBottom: 7
    },
    date: {
        height: 14,
        width: 100,
        backgroundColor: '#D0D1D4',
        marginBottom: 10
    },
    fullLine: {
        height: 15,
        width: '90%',
        marginBottom: 10,
        backgroundColor: '#D0D1D4'
    },
    halfLine: {
        height: 15,
        width: '50%',
        marginBottom: 10,
        backgroundColor: '#D0D1D4'
    }  
})

const ScreamSkeleton = (props) => {
    const {classes} = props

    const content = Array.from({ length: 5}).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={NoImg}/>
            <CardContent className={classes.CardContent}>
                <div className={classes.name}/>
                <div className={classes.date}/>
                <div className={classes.fullLine}/>
                <div className={classes.fullLine}/>
                <div className={classes.fullLine}/>
            </CardContent>
        </Card>
    ))

    return <Fragment>{content}</Fragment>
}

ScreamSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ScreamSkeleton)