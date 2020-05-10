import { useEffect, useState } from 'react';
import throttle from 'lodash.throttle';

export default (offset = 0) => {
	const [ref, setRef] = useState(null);
	const [inView, setInView] = useState(false);
	useEffect(() => {
		const elementYPos = () => {
			return (
				ref.getBoundingClientRect().top +
				window.pageYOffset -
				window.innerHeight +
				offset
			);
		};

		const elementYBottomPos = () => {
			return (
				ref.getBoundingClientRect().top +
				window.pageYOffset +
				offset
			);
		};

		if (!ref) {
			return;
		}

		const handleScroll = throttle(() => {
			if (!ref) {
				return;
			}

			if (window.pageYOffset >= elementYPos() && window.pageYOffset <= elementYBottomPos()) {
				setInView(true);
			} else {
				setInView(false);
			}
		}, 200);

    window.addEventListener('scroll', handleScroll, {passive: true});

		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, [ref, offset]);

	return [setRef, inView];
};
