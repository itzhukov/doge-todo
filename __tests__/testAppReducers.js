import * as app from '../source/js/reducers/app'
import * as types from '../source/js/constants/ActionTypes'
import * as matchers from 'jest-immutable-matchers';

const reducer = app.app;
const initialState = app.initialState;

describe('App reducer', () => {
  beforeEach(function () {
    jest.addMatchers(matchers);
  });

  it('passes if the object is immutable', function () {
      expect( initialState ).toBeImmutable();
  });

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqualImmutable(initialState)
  });
})
