import React, { Component } from 'react';
import UserList from '../components/UserList';

class HomePage extends Component {
    state = {  }

    render() { 
        return (
            <div data-testid="homepage">Homepage
                <UserList />
            </div>
        );
    }
}
 
export default HomePage;