import React from 'react';
import {Typography} from '@mui/material';


export default function Header(props) {
    return (
        <header>
            <Typography
                sx={{
                    textAlign: 'center',
                    pb: 2,
                    mb: 2,
                    borderBottom: 1,
                    borderColor: 'gray'
                }}
                variant='h3'
                color={'#9c27b0'}>{props.testConfigs.general.testName}</Typography>
            <Typography
                sx={{
                    pb: 3,
                    my: 2,
                    borderBottom: 1,
                    borderColor: 'gray'

                }}
                variant='h6'>{props.testConfigs.general.testDescription}</Typography>
        </header>

    )
}