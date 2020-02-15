import React, { Component } from 'react'
import { connect } from 'react-redux';
import lunamikTeamWork from '../assets/lunamikTeamWork.png';

class SocialSettings extends Component {

    render() {
        
        return (
            <div>
                <div className="container d-flex">
                    <div className="alert text-center" role="alert">
                        <div className=""> 
                            <img className="m-auto pt-1" src={lunamikTeamWork} width="600" alt="Hoaxify" />
                        </div>

                        <div className="confirmation-header display-4">
                            Page on working...
                        </div>
                
                        <div className="display-5">
                            Social Settings
                        </div>

                    </div>

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

export default connect(mapStateToProps)(SocialSettings);