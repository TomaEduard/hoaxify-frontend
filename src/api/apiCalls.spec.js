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

  describe('listUsers', () => {
    
    it('calls /api/1.0/users?page=0&size=3 when no param provided for listUsers', () => {
      const mockListUsers = jest.fn();
      axios.get = mockListUsers;
      apiCalls.listUsers();
      expect(mockListUsers).toBeCalledWith('/api/1.0/users?page=0&size=3');
    });

    it('calls /api/1.0/users?page=5&size=10 when no param provided for listUsers', () => {
      const mockListUsers = jest.fn();
      axios.get = mockListUsers;
      apiCalls.listUsers({ page: 5, size: 10 });
      expect(mockListUsers).toBeCalledWith('/api/1.0/users?page=5&size=10');
    });

    it('calls /api/1.0/users?page=5&size=3 when only page param provided for listUsers', () => {
      const mockListUsers = jest.fn();
      axios.get = mockListUsers;
      apiCalls.listUsers({ page: 5 });
      expect(mockListUsers).toBeCalledWith('/api/1.0/users?page=5&size=3');
    });

    it('calls /api/1.0/users?page=5&size=3 when only size param provided for listUsers', () => {
      const mockListUsers = jest.fn();
      axios.get = mockListUsers;
      apiCalls.listUsers({ size: 5 });
      expect(mockListUsers).toBeCalledWith('/api/1.0/users?page=0&size=5');
    });

    describe('getUser', () => {
      it('calls /api/1.0/users/users5 when user5 is provided for getser', () => {
        const mockGetUser = jest.fn();
        axios.get = mockGetUser;
        apiCalls.getUser('user5');
        expect(mockGetUser).toBeCalledWith('/api/1.0/users/user5');
      });
    });

    describe('updateUser', () => {
      it('calls /api/1.0/users/5 when 5 is provided for updateUser', () => {
        const mockUpdateUser = jest.fn();
        axios.put = mockUpdateUser;
        apiCalls.updateUser('5');
        const path = mockUpdateUser.mock.calls[0][0];
        expect(path).toBe('/api/1.0/users/5');
      });
    });

  });
});
