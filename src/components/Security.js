import React, { Component } from 'react'
import { connect } from 'react-redux';
// import image from '../../../assets/authenticated.png';

class Security extends Component {

    render() {
        
        return (
            <div className="">
             
               <p>Security</p>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
}

export default connect(mapStateToProps)(Security);