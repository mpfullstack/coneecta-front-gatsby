import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import styled from 'styled-components';

const StartRatingComponentWrapper = styled.div`
  label {
    font-size: ${props => `${props.size}px`};
    margin-bottom: 0;
  }

`;

const Rating = ({ name, value, starCount, editing, size = 26 }) => {
  return (
    <StartRatingComponentWrapper size={size}>
      <StarRatingComponent
        name={name} /* name of the radio input, it is required */
        value={value} /* number of selected icon (`0` - none, `1` - first) */
        starCount={starCount} /* number of icons in rating, default `5` */
        editing={editing} /* is component available for editing, default `true` */
      />
    </StartRatingComponentWrapper>
  );
}

export default Rating;