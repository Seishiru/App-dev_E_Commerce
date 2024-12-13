import React from 'react';

function StarRating({ rating }) {
  const fullStars = Math.floor(rating); // Number of full stars
  const emptyStars = 5 - fullStars; // Remaining empty stars

  return (
    <div>
      {/* Display the rating with one decimal place */}
      <span>{rating.toFixed(1)} </span>
      
      {/* Render full stars */}
      {Array(fullStars)
        .fill()
        .map((_, index) => (
          <i key={`full-${index}`} className="fa-solid fa-star review-star"></i>
        ))}
      
      {/* Render empty stars */}
      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <i key={`empty-${index}`} className="fa-regular fa-star review-star"></i>
        ))}
    </div>
  );
}

export default StarRating;
