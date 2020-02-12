import React, { Component } from 'react'
import { connect } from 'react-redux';
// import image from '../../../assets/authenticated.png';

class PeopleAndSharing extends Component {

    render() {
        
        return (
            <div className="">
             
               <p>PeopleAndSharing</p>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
}

export default connect(mapStateToProps)(PeopleAndSharing);