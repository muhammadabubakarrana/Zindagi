import React, {Component} from 'react';
import {Wrapper, Text} from '../../../components';
import {appStyles} from '../../../services';


function Splash() {
  return (
    <Wrapper animation={'bounce'} isMain isCenter>
      <Text style={{color: 'red'}} isBoldFont isLargeTitle>
        Splash
      </Text>
    </Wrapper>
  );
}


export default Splash;
