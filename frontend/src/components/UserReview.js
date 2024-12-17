import React from 'react'
import empty from "../assets/empty_image.png";
import "../css/UserReview.css"

function UserReview() {
  return (
    <div className='review-item'>
      <div className='review-header'>
        <div className="review-header-left">
          <img src={empty} className='user-profile-picture'/>
          <div className='user-profile-name'>Username</div>
        </div>
        <div className='review-header-right'>
          12/21/20
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
      </div>
      <div className='review-contents'>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    </div>
  )
}

export default UserReview