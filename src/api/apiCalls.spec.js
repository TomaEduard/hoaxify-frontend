import axios from 'axios';
import * as apiCalls from './apiCalls';

describe('apiCalls', () => {
  describe('signup', () => {
    it('calls /api/1.0/users', () => {
      const mockSignup = jest.fn();
      axios.post = mockSignup;
      apiCalls.signup();

      // history and parameters [][]
      const path = mockSignup.mock.calls[0][0];
      expect(path).toBe('/api/1.0/users');
    });
  });

  describe('login', () => {
    it('calls /api/1.0/login', () => {
      const mockSignup = jest.fn();
      axios.post = mockSignup;
      apiCalls.login({username: 'test-user', password: "P4ssword"});

      // history and parameters [][]
      const path = mockSignup.mock.calls[0][0];
      expect(path).toBe('/api/1.0/login');
    });
  });
});
