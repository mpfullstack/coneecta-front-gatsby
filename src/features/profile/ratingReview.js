import React, { useState } from 'react';
import Rating from '../../components/rating';

const RatingReview = ({ defaultValue = 5, ref, onChange }) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <Rating
      name={'rating_review'}
      value={value}
      starCount={5}
      size={42}
      editing={true}
      onStarClick={(nextValue, prevValue) => {
        if (prevValue === nextValue) {
          const value = Math.max(0, nextValue-1);
          setValue(value);
          onChange(value);
        } else {
          setValue(nextValue);
          onChange(nextValue);
        }
      }}
      ref={ref} />
  );
}

export default RatingReview;