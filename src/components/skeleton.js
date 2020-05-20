import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styleTheme from '../theme';
import { withTheme } from 'styled-components';

const SkeletonWrapper = ({ theme,  ...other }) => {
  let color = styleTheme.skeletonColor({theme});
  let highlightColor = styleTheme.skeletonHighlightColor({theme});
  return (
    <SkeletonTheme color={`${color}`} highlightColor={`${highlightColor}`}>
      <Skeleton {...other} />
    </SkeletonTheme>
  );
};

export default withTheme(SkeletonWrapper);