import React from "react";
import PropTypes from "prop-types"
import { Animated } from "react-animated-css";
import useInView from './hooks/useInView';

const AnimatedInView = ({ children, offset, animationIn, ...otherOptions }) => {
	const [ref, inView] = useInView(offset);

	return (
    <div className={inView ? 'in-view' : ''} ref={ref}>
      {
        inView
        &&
        <Animated animationIn={animationIn} {...otherOptions}>
          {children}
        </Animated>
      }
    </div>
	);
};

AnimatedInView.defaultProps = {
  animationIn: 'fadeIn',
  offset: 400
}

AnimatedInView.propTypes = {
  animationIn: PropTypes.string,
  offset: PropTypes.number
}

export default AnimatedInView;
