import React, { Component } from 'react';
import { render } from '@testing-library/react';
import HomePage from './HomePage';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import authReducer from '../redux/authReducer';

const defaultState = {
    id: 1,
    username: 'user1',
    displayName: 'display1',
    image: 'profile1.png',
    password: 'P4ssword',
    isLoggedIn: true
  };
  
  let store;
  
  const setup = (state = defaultState) => {
    store = createStore(authReducer, state);
    return render(
      <Provider store={store}>
          <HomePage />
      </Provider>
    );
  };

describe('HomePage', () => {

    describe('Layout', () => {
        it('has root page div', () => {
            const {queryByTestId} = setup();
            const homePageDiv = queryByTestId('homepage');
            expect(homePageDiv).toBeInTheDocument();
        });


    });
});

