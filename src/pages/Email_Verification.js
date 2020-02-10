import React, { Component } from 'react';
import queryString from 'query-string';
import * as apiCalls from '../api/apiCalls';

class Email_Verification extends Component {
    state = { 
        token: this.props.match.params.token,
        isLoadingToken: false,
        errors: {}
    }
    
    // let urlParams = new URLSearchParams(location.search);
    // if (urlParams.has('token')) {
    //     verifyToken(urlParams.get('token'))
    // }

    componentDidMount() {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        console.log(params);
        console.log(params.token);
        
        this.setState ({
            token: params.token,
            isLoadingToken: true,
        })

        // trimiti in backend tokenul
        // il verifica si face modificarea
        // dupa raspuns primit afisezi eroare sau redirect to homepage in 5.4.3.2.1
    };

    // onClickLogin = () => {
       
    // };

    onClickLogin = () => {
        const body = {
            username: this.state.username,
            password: this.state.password
        };
        this.setState({pendingApiCall: true})
    
    
        // call reformating/rename postLogin dispatch function for jest 
        this.props.actions.postLogin(body)
        .then((response) => {
            this.setState({pendingApiCall: false}, () => {
                this.props.history.push('/');
            })
        })
        .catch((error) => {
            if (error.response) {
                this.setState({ 
                apiError: error.response.data.message,
                pendingApiCall: false,
                });
            }
        });
    };

    render() {
        // let url = this.props.location.search;
        // let params = queryString.parse(url);
        // console.log(params);

        return (
            <div>
                <p>Test email_verification page: {this.state.token}</p>
                
            </div>
        )
    }
}
export default Email_Verification;