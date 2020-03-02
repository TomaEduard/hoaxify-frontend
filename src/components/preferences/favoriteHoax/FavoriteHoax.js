import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './FavoriteHoax.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

class FavoriteHoax extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  render() {
    let entering = this.props.entering;
    // if emailVerificationStatus is true => rend normal values of component
    let imageSrouce = "far fa-heart fa-lg text-decoration-none heart-false p-1";
    let toolTipBookmarkNoAuthenticated = "Need to be Authenticated";
    let toolTipBookmarkNoValidatedEmail = "Email must be validated";

    if(this.props.emailVerificationStatus === true) {
      if(this.props.favorite) {
        imageSrouce = "fa fas fa-heart fa-lg text-decoration-none heart-true p-1"
      }
    }

    return (
      <React.Fragment>
        {!this.props.emailVerificationStatus && (
            <div className="row">
            
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
                  className={imageSrouce}
                >
                </Link>
                
              </OverlayTrigger>

          </div>
        )}

        {this.props.emailVerificationStatus && (
          <div className="row">
            <Link to="#" className="nav-link m-2 menu-item"
              className={imageSrouce}
              onClick={() => this.props.changeFavorite()}
            >
            </Link>
          </div>
        )}

      </React.Fragment>
    );
  }
}

export default FavoriteHoax;




