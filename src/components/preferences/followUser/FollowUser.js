import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

class FollowUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  render() {

  let toolTipLikeFalse = "Email must be validated"
  let pageContent;

  if(!this.props.emailVerificationStatus) {
    pageContent = (
      <OverlayTrigger
        key={'bottom'}
        placement={'bottom'}
        // overlay={this.tooltip} 
        onEntering={this.props.entering}
        overlay={
          <Tooltip 
          id="tooltip-bottom" 
          >
            {toolTipLikeFalse}
          </Tooltip>
        }
      >
        <Link to="/verification/confirmationEmail">

          <button className="btn btn-outline-dark btn-sm ml-2 mb-2 disabled">
              <span className="followButtonText">Follow 1</span>
          </button>

        </Link>
      </OverlayTrigger>

    )

  } else if (this.props.follow) {
    // active
    pageContent = (
      <button className="btn btn-outline-dark btn-sm ml-2 mb-2 active">
        <span className="followButtonTextActive">Follow 2</span>
      </button>  
    )

  } else if (!this.props.follow) {
    pageContent = (
      <button className="btn btn-outline-dark btn-sm ml-2 mb-2">
          <span className="followButtonText">Follow 3</span>
      </button>
    )
  }

    return (
      <>

        {pageContent}

      </>
    );
  }
}

export default FollowUser;