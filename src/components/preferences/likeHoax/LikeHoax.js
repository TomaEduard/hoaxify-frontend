import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LikeHoax.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

class LikeHoax extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  render() {
    let entering = this.props.entering;
    // if emailVerificationStatus is true => rend normal values of component
    let imageSrouceLike = "fas fa-thumbs-up fa-lg text-decoration-none like-false p-1";
    let toolTipBookmarkNoAuthenticated = "Need to be Authenticated";
    let toolTipBookmarkNoValidatedEmail = "Email must be validated";

    if(this.props.emailVerificationStatus === true) {
      if(this.props.like) {
        imageSrouceLike = "fas fa-thumbs-up fa-lg text-decoration-none like-true p-1"
      }
    }

    return (
      <React.Fragment>
        {!this.props.emailVerificationStatus && (
            <div className="row ">
            
              <OverlayTrigger
                key={'bottom'}
                placement={'bottom'}
                // overlay={this.tooltip} 
                onEntering={entering}
                overlay={
                  <Tooltip 
                  id="tooltip-bottom" 
                  >
                  {!this.props.isLoggedIn && (
                    toolTipBookmarkNoAuthenticated
                  )}

                  {this.props.isLoggedIn && (
                    toolTipBookmarkNoValidatedEmail
                  )}
                  </Tooltip>
                }
              >
                <Link to="/verification/confirmationEmail" className="nav-link m-2 menu-item"
                  className={imageSrouceLike}
                >
                </Link>
                
              </OverlayTrigger>
          </div>
        )}

        {this.props.emailVerificationStatus && (
          <div className="row">
            <Link to="#" className="nav-link m-2 menu-item"
              className={imageSrouceLike}
              onClick={() => this.props.changeLike()}
            >
            </Link>
          </div>
        )}

      </React.Fragment>
    );
  }
}

export default LikeHoax;




