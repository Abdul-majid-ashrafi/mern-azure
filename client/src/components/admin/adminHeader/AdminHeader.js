import React from 'react'
import { NavigationBar } from '../..'
import {AdminBoxesContainer} from '../../../containers'

const AdminHeaderComponent = () => {
    return (
        <React.Fragment>
            <AdminBoxesContainer />
            <NavigationBar />
        </React.Fragment>
    )
}

export default AdminHeaderComponent
