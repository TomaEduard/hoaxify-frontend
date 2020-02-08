import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './FavoriteHoax.css';

class FavoriteHoax extends Component {
  
  render() {

    let imageSrouce = "far fa-heart fa-lg text-decoration-none heart-false p-1";
    if(this.props.favorite) {
      imageSrouce = "fa fas fa-heart fa-lg text-decoration-none heart-true p-1"
    }

    let favoriteText = "Remove from Favorite"
    if(this.props.favorite) {
      favoriteText = "Add to Favorite"
    }

    return (
      <div className="row p-2 m-2 px-5">
        <Link to="#" className="nav-link m-2 menu-item"
          className={imageSrouce}
          onClick={() => this.props.changeFavorite()}
        >
        </Link>

        {/* <p class="text-secondary pt-2 pl-2 text-favorite"> {favoriteText} </p> */}

      </div>
    );
  }

}

export default FavoriteHoax;


