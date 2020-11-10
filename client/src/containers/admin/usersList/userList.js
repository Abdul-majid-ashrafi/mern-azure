import React, { Component } from 'react';
import { UsersListComponent } from '../../../components'

export class UserListContainer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
    }
    render() {
        return (
            <div>
                <UsersListComponent />
            </div>
        )
    }
}

export default UserListContainer
