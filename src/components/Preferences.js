import React, { Component } from 'react'
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as apiCalls from '../api/apiCalls';
import HoaxView from './HoaxView';
import SpinnerForComponents from './SpinnerForComponents';
import InputForCloseAccount from '../components/InputForCloseAccount';

class Preferences extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.loggedInUser.id,
            favorite: false,
            like: false,
            bookmark: false,
            partialName: '',
            isLoadingHoaxes: false,

            content: []
        };
        console.log('FAVORITE  ' + this.state.favorite);
        
    }

    componentDidMount() {
       this.fetchLocalItems();
    };

    fetchLocalItems = () => {
        // console.log("#1 fetchLocalItems - Before  " + this.state.favorite);
        this.setState({ 
            isLoadingHoaxes: true,
            content: [] 
        })

        let body = ({
            "favorite": this.state.favorite,
            "like": this.state.like,
            "bookmark": this.state.bookmark
        })
        // console.log("#2 fetchLocalItems - After  " + this.state.favorite);

        apiCalls.loadHoaxesByPreferences(this.props.loggedInUser.id, body, this.props.loggedInUser.jwt)
            .then(response => {
        //    console.log("#4 Preferences - componentDidMount - response => ", response);
            this.setState({ 
                content: response.data, 
                isLoadingHoaxes: false 
            });
            
        });
    }

    setFavorite = () => {
        console.log("setFavorite - before - ", this.state.favorite);
        this.setState({ favorite: !this.state.favorite }, () => {
            console.log("setFavorite - after - ", this.state.favorite);
            this.fetchLocalItems();
        });
    }
    
    setBookmark = () => {
        console.log("setFavorite - before - ", this.state.bookmark);
        this.setState({ bookmark: !this.state.bookmark }, () => {
            console.log("setFavorite - after - ", this.state.bookmark);
            this.fetchLocalItems();
        });
    }

    setLike = () => {
        console.log("setFavorite - before - ", this.state.like);
        this.setState({ like: !this.state.like }, () => {
            console.log("setFavorite - after - ", this.state.like);
            this.fetchLocalItems();
        });
    }

    resetState = () => {
        this.setState({ 
            favorite: false,
            bookmark: false,
            like: false,
            }, () => {
            this.fetchLocalItems();
        });
    }

    render() {
        return (
            <div className="">

                <div className="card sticky-preferences cardPreferences shadow-sm">
                <div className="pl-3 mt-2 pb-3 pl-4 row ">
                    <Form>
                        <div
                            key="custom-inline-1"
                            className="mb-2 pt-3" 
                        >
                            {/* checked={(this.state.rating === 0.5 ? true : false)} */}
                            <Form.Check
                                className="category-text"
                                checked={this.state.favorite}
                                onChange={this.setFavorite}
                                // onClick={() => this.setFavorite(!this.state.favorite)}

                                custom
                                inline
                                label="Favorite"
                                type="checkbox"
                                id="custom-inline-1"
                                key="custom-inline-1"
                            />
                        </div>

                        <div 
                            key="custom-inline-2"
                            className="mb-2" 
                        >
                            <Form.Check
                                // onChange={() => this.setWatchlater(this.state.watchlist == n)}
                                // ***
                                // onChange={() => this.setBookmark(!this.state.bookmark)}
                                // checked={this.state.watchlist}

                                checked={this.state.bookmark}
                                onChange={this.setBookmark}
                                className="category-text"
                                custom
                                inline
                                label="Bookmark"
                                type="checkbox"
                                id="custom-inline-2"
                            />
                        </div>

                        <div 
                            key="custom-inline-3"
                            className="mb-2" 
                        >
                            <Form.Check
                                // onChange={() => this.setWatchlater(this.state.watchlist == n)}
                                // onChange={() => this.setWatchlater(!this.state.watchlist)}
                                // ***
                                // checked={this.state.watchlist}
                                checked={this.state.like}
                                onChange={this.setLike}
                                className="category-text"
                                custom
                                inline
                                label="Like"
                                type="checkbox"
                                id="custom-inline-3"
                            />
                        </div>

                        <div key="custom-inline-4" className="mb-2">
                            <Form.Check
                                className="category-text"
                                disabled
                                custom
                                inline
                                label="Fallow(disabled)"
                                type="checkbox"
                                id="custom-inline-4"
                            />
                        </div>

                    </Form>

                    <div className="d-flex align-items-start flex-column pl-5 searchPreferences">
                        <InputForCloseAccount
                            label="Search by display Name"
                            placeholder="Search by display Name"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            // hasError={this.state.errors.newEmail && true}
                            // error={this.state.errors.newEmail}
                        />
                        <Form.Text className="text-muted textSearchPreferences">
                            *Not impelemted yet(Search by display name)
                        </Form.Text>

                        {/* <Form.Group
                            className="search mt-auto">
                            <Form.Control
                                type="search"
                                placeholder="Search..."
                                onChange={this.doSearch}
                            />
                            <Form.Text className="text-muted">
                                *Not impelemted yet(Search by display name)
                            </Form.Text>
                        </Form.Group> */}

                    </div>

                    <Button
                        className="button resetButtonPreferences"
                        variant="outline-warning"
                        onClick={this.resetState}>
                        Reset
                    </Button>
                </div>
                </div>

                    {this.state.isLoadingHoaxes && (
                        <div className="mt-2 pt-3">
                            <SpinnerForComponents value="Loading..."/>
                        </div>
                    )}

                {this.state.content.map((hoax) => {
                    return (
                        <div className="pt-5">
                            <HoaxView
                            // <HoaxViewForPrefferences 
                                key={hoax.id}
                                hoax={hoax}
                                onClickDelete={() => this.onClickDeleteHoax(hoax)}
                            />
                        </div>
                    )
                })}    

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
}

export default connect(mapStateToProps)(Preferences);