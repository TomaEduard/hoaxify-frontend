import React, { Component } from 'react'
import { connect } from 'react-redux';

class Fallow extends Component {

    render() {
        
        return (
            <div className="card d-flex p-1">
             
                <div className="alert text-center pt-4" role="alert">

                    <i className="fas fa-user-plus text-secondary pr-2"></i>
                    
                    <h4>Fallow content</h4>

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

export default connect(mapStateToProps)(Fallow);