{/* Category */}
    <div className="mt-2 pb-3 pl-4 row ">

            {/* <h5 className="pb-1">
            <strong>Category</strong>
            </h5> */}
        <Form>

            <div
                key="custom-inline-1"
                className="mb-2 pt-3" 
            >
                {/* checked={(this.state.rating === 0.5 ? true : false)} */}
                <Form.Check
                    className="category-text"
                    // ***
                    // checked={this.state.favorite}
                    // ***
                    // onChange={() => this.setFavorite(!this.state.favorite)}
                    
                    // onChange={this.state.favorite === null ? true : !this.state.favorite}
                    // onChange={() => this.setRating(4.5)}
                    // checked={(this.state.rating === 4.5 ? true : false)}
                    custom
                    inline
                    label="Favorite"
                    type="checkbox"
                    // key="custom-inline-12"
                />
            </div>

            <div 
                key="custom-inline-2"
                className="mb-2" 
            >
                <Form.Check
                    // onChange={() => this.setWatchlater(this.state.watchlist == n)}
                    // onChange={() => this.setBookmark(!this.state.bookmark)}
                    className="category-text"
                    // ***
                    // checked={this.state.watchlist}
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
                    className="category-text"
                    // ***
                    // checked={this.state.watchlist}
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


        {/* <h5 className="mt-1 pl-1">
            <strong>Search</strong>
        </h5> */}

        <div className="d-flex align-items-start flex-column pl-4">

            <Form.Group
                className="search mt-auto pl-2">
                {/* <Form.Label>Search </Form.Label> */}
                <Form.Control
                    // className="mt-auto"
                    type="search"
                    placeholder="Search..."
                    onChange={this.doSearch}
                />
                <Form.Text className="te xt-muted">
                    *Not impelemted yet(Search by display name)
                </Form.Text>
            </Form.Group>

        </div>
        
        {/* <Button
            className="button mt-auto ml-4 mb-2 pl-2"
            variant="outline-warning"
            onClick={() => this.resetState()}>

            Reset
        </Button> */}

    </div>