// REF: http://survivejs.com/react/implementing-kanban/react-and-flux/#setting-up-a-provider-
import React from 'react';
import AltContainer from 'alt-container';
import alt from '../../libs/alt';
import setup from './setup';

setup(alt);

export default ({children}) =>
  <AltContainer flux={alt}>
    {children}
  </AltContainer>
