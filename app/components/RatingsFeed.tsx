import React from 'react';
import {IoMdStar} from 'react-icons/io';
import {IoStarHalfSharp} from 'react-icons/io5';

type RatingFeedProps = {
  RatingObject: {
    rating: number;
    feedBack: string;
    sender: string;
  };
  rateSize: number;
  fontStyle: React.CSSProperties;
};
export default function RatingFeed({
  RatingObject,
  rateSize,
  fontStyle,
}: RatingFeedProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <Rating
        rating={RatingObject.rating}
        isHalfRatingsAllowed={true}
        size={rateSize}
      />
      <p style={fontStyle} className="m-2">
        {RatingObject.feedBack}
      </p>
      <p style={{color: fontStyle.color}}>{RatingObject.sender}</p>
    </div>
  );
}
type RatingProps = {
  rating: number;
  size: number;
  isHalfRatingsAllowed: boolean;
};
export const Rating = ({
  rating,
  size,
  isHalfRatingsAllowed = false,
}: RatingProps) => {
  return (
    <div className="flex flex-row items-center">
      {[1, 2, 3, 4, 5].map((num) => (
        <div key={num} className="mr-1">
          {rating >= num ? (
            <IoMdStar className={`text-yellow-400`} size={size} />
          ) : rating === num - 0.5 && isHalfRatingsAllowed ? (
            <IoStarHalfSharp className={`text-yellow-400`} size={size} />
          ) : (
            <IoMdStar className={`text-gray-300`} size={size} />
          )}
        </div>
      ))}
    </div>
  );
};

type ReviewsNRatingProps = {
  count: Array<number>;
  label: Array<string>;
  reviews: Array<string>;
};

export function ReviewsNRating({count, label, reviews}: ReviewsNRatingProps) {
  return (
    <div
      className="text-center flex flex-row justify-center items-center text-transparent text-8xl bg-clip-text bg-gradient-to-b from-indigo-700 to-indigo-950 m-5"
    >
      <div className="flex flex-col justify-center items-center mx-20">
        <p className="text-4xl">5000</p>
        <p className="text-4xl">reviews </p>
      </div>
      <div title="" className="flex flex-col justify-center items-center mx-20">
        <p className="text-4xl">123452</p>
        <p className="text-4xl">Happy Customers</p>
      </div>
    </div>
  );
}
