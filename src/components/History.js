import React, { Component } from 'react'
import { connect } from 'react-redux';
import HoaxFeed from '../../../components/HoaxFeed';

class History extends Component {

    render() {
        
        return (
            <div className="row">
                <div className="col">
                    <HoaxFeed user={this.props.match.params.username} />
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

export default connect(mapStateToProps)(History);