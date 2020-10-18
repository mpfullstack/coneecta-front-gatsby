import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import styled from 'styled-components';

const StartRatingComponentWrapper = styled.div`
  display: flex;
  justify-content: center;
  label {
    font-size: ${props => `${props.size}px`};
    margin-bottom: 0;
  }
`;

const Rating = ({ name, value = 0, starCount, editing, size = 26, onStarClick }) => {
  return (
    <StartRatingComponentWrapper size={size}>
      <StarRatingComponent
        name={name} /* name of the radio input, it is required */
        value={value} /* number of selected icon (`0` - none, `1` - first) */
        starCount={starCount} /* number of icons in rating, default `5` */
        editing={editing} /* is component available for editing, default `true` */
        onStarClick={(...params) => typeof onStarClick === 'function' ? onStarClick(...params) : null}
      />
    </StartRatingComponentWrapper>
  );
}

export default Rating;