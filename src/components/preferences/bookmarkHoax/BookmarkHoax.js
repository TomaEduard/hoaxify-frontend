import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './BookmarkHoax.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

class BookmarkHoax extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  render() {
    let entering = this.props.entering;
    // if emailVerificationStatus is true => rend normal values of component
    let imageSrouce = "far fa-bookmark text-decoration-none bookmark-false p-1";
    let toolTipBookmarkFalse = "Email must be validated"

    if(this.props.emailVerificationStatus === true) {
      if(this.props.bookmark) {
        imageSrouce = "fas fa-bookmark text-decoration-none bookmark-true p-1"
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
                    {toolTipBookmarkFalse}
                  </Tooltip>
                }
              >
                <Link to="/verification/confirmationEmail" className="nav-link m-2 menu-item"
                  className={imageSrouce}
                >
                </Link>
                
              </OverlayTrigger>
              {/* <p class="text-secondary pt-2 pl-2 text-favorite"> {favoriteText} </p> */}

          </div>
        )}

        {this.props.emailVerificationStatus && (
          <div className="row">
            <Link to="#" className="nav-link m-2 menu-item"
              className={imageSrouce}
              onClick={() => this.props.changeBookmark()}
            >
            </Link>
          </div>
        )}

      </React.Fragment>
    );
  }
}

export default BookmarkHoax;




