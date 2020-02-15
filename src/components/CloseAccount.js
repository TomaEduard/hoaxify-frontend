import React, { Component } from 'react'
import { connect } from 'react-redux';


class CloseAccount extends Component {

    render() {
        
        return (
            <div className="">
             
               <p>Close Account</p>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
}

export default connect(mapStateToProps)(CloseAccount);