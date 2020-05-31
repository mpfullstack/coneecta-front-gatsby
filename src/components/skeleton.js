import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from 'styled-components';
import styleTheme from '../theme';
import { withTheme } from 'styled-components';

const Wrapper = styled.div`
  .react-loading-skeleton {
    line-height: inherit;
    margin-bottom: 6px;
    border-radius: 5px;
  }
`;

const SkeletonWrapper = ({ theme,  ...other }) => {
  let color = styleTheme.skeletonColor({theme});
  let highlightColor = styleTheme.skeletonHighlightColor({theme});
  return (<Wrapper>
      <SkeletonTheme color={`${color}`} highlightColor={`${highlightColor}`}>
        <Skeleton {...other} />
      </SkeletonTheme>
    </Wrapper>
  );
};

export default withTheme(SkeletonWrapper);