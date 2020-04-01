import React from 'react'
import Tooltip from '@material-ui/core/Tooltip' 
import Button from '@material-ui/core/Button'


export default ({ children, onClick, tip, btnClassName, tipClassName}) => (
    <Tooltip title={tip} className={tipClassName} placement="top">
        <Button onClick={onClick} className={btnClassName}>
            {children}
        </Button>
    </Tooltip>
)
