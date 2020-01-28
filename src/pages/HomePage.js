import React, { Component } from 'react';
import UserList from '../components/UserList';
import HoaxSubmit from '../components/HoaxSubmit';
import { connect } from 'react-redux';

class HomePage extends Component {
    state = {  }

    render() { 
        return (
                
            <div className="container">
                <div data-testid="homepage">Homepage

                    <div className="row">

                        <div className="col-8">
                            {this.props.loggedInUser.isLoggedIn && <HoaxSubmit />}
                        </div>

                        <div className="col-4">
                            <UserList />
                        </div>
                        
                    </div>
                </div>
            </div>
       
        );
    }
}
 

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
}

export default connect(mapStateToProps)(HomePage);