import React, { Component } from 'react'
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { connect } from 'react-redux';
import * as apiCalls from '../api/apiCalls';
import ButtonWithProgress from './ButtonWithProgress';
import Input from './Input';
import exclamationSecurity from '../assets/exclamationSecurity.png';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class HoaxSubmit extends Component {
    state ={
        focused: false,
        content: undefined,
        pendingApiCall: false,
        errors: {},
        file: undefined,
        image: undefined,
        attachment: undefined,

        blocking: false,
    };

    onChangeContent = (event) => {
        const value = event.target.value;

        // if click on Choose File second time, the previous error will be remove
        this.setState({
            content: value,
            errors: {}
        })
    };

    // #1
    onFileSelect = (event) => {

        this.setState({
            errors: {}
        })

        // make sure the file array contain 1 file
        if(event.target.files.length === 0) {
            return;
        }

        const file = event.target.files[0];

        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                image: reader.result,
                file,
                // errors: {}
            }, () => {
                this.uploadFile()
            });
        };
        reader.readAsDataURL(file);
    };

    // #2
    uploadFile = () => {
        const body = new FormData();
        body.append('file', this.state.file)
        apiCalls.postHoaxFile(body)
            .then(response => {
                this.setState({ attachment: response.data })
            })
            .catch((error) => {
                // let errors = {}
                // if(error.response && error.response.message) {
                //     errors = {content: 'The maximum allowed image size is 1MB.'}
                // }

                this.setState({ 
                    pendingApiCall: false,
                    errors: {content: 'The maximum allowed image size is 1MB.'},
                    image: undefined,
                    file: undefined,
                    attachment: undefined
                })
            })
    }

    resetState = () => {
        this.setState({
            pendingApiCall: false,
            focused: false,
            content: '',
            errors: {},
            image: undefined,
            file: undefined,
            attachment: undefined
        });
    };

    // #1
    onClickHoaxify = () => {
        const body = {
            content: this.state.content,
            attachment: this.state.attachment
        };
        this.setState({ pendingApiCall: true });
        apiCalls.postHoax(body)
        .then((response) => {
            this.resetState();
        })
        .catch((error) => {
            let errors = {}
            if(error.response.data && error.response.data.validationErrors) {
                errors = error.response.data.validationErrors
            }
            this.setState({ pendingApiCall: false, errors })
        })
    };

    onFocus = () => {
        this.setState({
            focused: true
        });
    };

    render() {
        let textAreaClassName = 'form-control w-100';
        if(this.state.errors.content) {
            textAreaClassName += ' is-invalid'
            // textAreaClassName = 'is-invalid form-control-hoaxsubmit w-100'
        }

        return (
            <div>
                {this.props.loggedInUser.emailVerificationStatus && ( 
                    <div className="card d-flex flex-row p-1">
    
                        <ProfileImageWithDefault 
                            className="rounded-circle m-1"
                            width="32"
                            height="32"
                            image={this.props.loggedInUser.image}
                        />
                        
                        <div className="flex-fill">
                         

                            <textarea 
                                className={textAreaClassName}
                                // if this.onFocus == true set rows to 3 if isn't set default to 1
                                rows={this.state.focused ? 3 : 1}
                                onFocus={this.onFocus}
                                value={this.state.content}
                                onChange={this.onChangeContent}
                            />
    
                            {this.state.errors.content && 
                                <span className="invalid-feedback">
                                    {this.state.errors.content}
                                </span>
                            }
    
                            {this.state.focused &&(
                                <div className="">
                                    <div className="pt-1">
                                        <Input 
                                            type="file"
                                            onChange={this.onFileSelect}
                                        />
                                            {this.state.image && 
                                                <img 
                                                    className="mt-1 img-thumbnail"
                                                    src={this.state.image}
                                                    alt="upload"
                                                    width="128"
                                                    height="65"
                                                />
                                            }
                                    </div>
    
                                    <div className="text-right mt-1">
                                        <button 
                                            disabled={this.state.pendingApiCall}
                                            className="cancelButtonHoaxSubmit"
                                            onClick={this.resetState}
                                        >
                                            {/* <i className="fas fa-times mr-1"></i> */}
                                            Cancel
                                        </button>
    
                                        <ButtonWithProgress
                                            // className="btn btn-success" 
                                            disabled={this.state.pendingApiCall}
                                            onClick={this.onClickHoaxify}
                                            pendingApiCall={this.state.pendingApiCall}
                                            text="Post"
                                        /> 

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>  
                )}


                {!this.props.loggedInUser.emailVerificationStatus && ( 
                    // <div className="card d-flex flex-row p-1 pl-2">
                    //     You need validate your email for post.
                    // </div>

                    <div className="card mt-4 mb-3 verticalLineHoaxSubmit">
                        <Row>
                            <Col xs={11} md={11} lg={11} xl={10}>
                                <div className="card-body d-flex flex-column ">

                                    <p className="text-secondary mb-0">
                                        Need to be
                                        <span className="font-weight-bold mb-0"> Authenticated </span>
                                        and
                                        <span className="font-weight-bold mb-0"> validate the email </span>
                                        to have access for post Hoax.
                                    </p>

                                </div>
                            </Col>

                            <Col xs={1} md={1} lg={1} xl={2}>
                                <div className="d-flex justify-content-center exclamationHoaxSubmit"> 
                                    <img className="m-auto" src={exclamationSecurity} width="26" alt="Hoaxify" />
                                </div>
                            </Col>
                            
                        </Row>
                    </div>  
                )}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
}

export default connect(mapStateToProps)(HoaxSubmit);