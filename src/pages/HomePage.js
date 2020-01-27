import React, { Component } from 'react';
import UserList from '../components/UserList';

class HomePage extends Component {
    state = {  }

    render() { 
        return (
                
            <div className="container">
                <div data-testid="homepage">Homepage
                    <UserList />
                </div>
            </div>
       
        );
    }
}
 
export default HomePage;