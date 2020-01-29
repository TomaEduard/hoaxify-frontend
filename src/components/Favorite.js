import React, { Component } from 'react'
import { connect } from 'react-redux';
import image from '../assets/authenticated.png';

class Favorite extends Component {
   

    render() {
        
        return (
            <div className="card d-flex p-1">
             
                <div className="alert text-center pt-4" role="alert">
                    <i className="fas fa-heart text-secondary pr-2"></i>
                    <h4>Favorite content</h4>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
}

export default connect(mapStateToProps)(Favorite);