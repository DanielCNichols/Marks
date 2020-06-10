import React from 'react';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import './RatingSpan.css';

export default function RatingSpan(props) {
  let value = props.rating;
  let noStars = value;
  let noEmpty = 5 - value;
  let stars = [];

  if (!value) {
    return <span className="NA">Not Rated</span>;
  }

  for (let i = 0; i < noStars; i++) {
    stars.push(<IoIosStar className="filled" />);
  }

  for (let i = 0; i < noEmpty; i++) {
    stars.push(<IoIosStarOutline />);
  }

  return (
    <div className="rating">
      {stars.map((star, idx) => {
        return <span key={idx}>{star}</span>;
      })}
    </div>
  );
}
