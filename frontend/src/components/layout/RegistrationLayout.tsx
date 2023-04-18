import { Button, Card } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'

const RegistrationLayout = () => {
    return (
        <div className='full-height full-width center-flex'>
            <Outlet />
        </div>
    )
}

export default RegistrationLayout