import React, { Component } from 'react'
import * as apiCalls from '../api/apiCalls';
import Spinner from './Spinner';
import HoaxView from './HoaxView';

export default class HoaxFeed extends Component {

    state = {
        page: {
            content: []
        },
        isLoadingHoaxes: false,
    };

    componentDidMount() {
        this.setState({ isLoadingHoaxes: true })
        apiCalls.loadHoaxes(this.props.user).then(response => {
            this.setState({ page: response.data, isLoadingHoaxes: false })
        })
    };

    render() {
        if(this.state.isLoadingHoaxes) {
            return (
                <Spinner value="Loading..."/>
            );
        }

        if(this.state.page.content.length === 0) {
            return (
                <div className="card card-header text-center text-secondary">
                    There are no hoaxes
                </div>
            );
        }
        return <div>
            {this.state.page.content.map((hoax) => {
                return (
                    <HoaxView 
                        key={hoax.id}
                        hoax={hoax}
                    />
                )
            })}
            {this.state.page.last === false && (
                <div className="card card-header text-center">
                    Load More
                </div>
            )}
        </div>
        
    }
}
