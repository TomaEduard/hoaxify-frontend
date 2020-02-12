import React, { Component } from 'react'
import { connect } from 'react-redux';
// import image from '../../../assets/authenticated.png';

class Home extends Component {

    render() {
        
        return (
            <div className="">
             
               <p>Home</p>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
}

export default connect(mapStateToProps)(Home);