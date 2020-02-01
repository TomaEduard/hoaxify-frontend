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

    describe('postHoax', () => {
      it('calls /api/1.0/hoaxes', () => {
        const mockPostHoax = jest.fn();
        axios.post = mockPostHoax;
        apiCalls.postHoax();
  
        // history and parameters [][]
        const path = mockPostHoax.mock.calls[0][0];
        expect(path).toBe('/api/1.0/hoaxes');
      });
    });

    describe('loadHoaxes', () => {
      it('calls /api/1.0/hoaxes?page=0&size=5&sort=id,desc when no param provided', () => {
        const mockGetHoaxes = jest.fn();
        axios.get = mockGetHoaxes;
        apiCalls.loadHoaxes();
        expect(mockGetHoaxes).toBeCalledWith('/api/1.0/hoaxes?page=0&size=5&sort=id,desc')
      });

      it('calls /api/1.0/users/user1/hoaxes?page=0&size=5&sort=id,desc when user param provided', () => {
        const mockGetHoaxes = jest.fn();
        axios.get = mockGetHoaxes;
        apiCalls.loadHoaxes('user1');
        expect(mockGetHoaxes).toBeCalledWith('/api/1.0/users/user1/hoaxes?page=0&size=5&sort=id,desc')
      });
    });

    describe('loadOldHoaxes', () => {
      it('calls /api/1.0/hoaxes/5?direction=before?page=0&size=5&sort=id,desc when hoax id is provided', () => {
        const mockGetHoaxes = jest.fn();
        axios.get = mockGetHoaxes;
        apiCalls.loadOldHoaxes(5);
        expect(mockGetHoaxes).toBeCalledWith('/api/1.0/hoaxes/5?direction=before?page=0&size=5&sort=id,desc')
      });

      it('calls /api/1.0/user3/hoaxes/5?direction=before?page=0&size=5&sort=id,desc when hoax id and username is provided', () => {
        const mockGetHoaxes = jest.fn();
        axios.get = mockGetHoaxes;
        apiCalls.loadOldHoaxes(5, 'user3');
        expect(mockGetHoaxes).toBeCalledWith('/api/1.0/users/user3/hoaxes/5?direction=before?page=0&size=5&sort=id,desc')
      });
      
    });

    describe('loadNewHoaxes', () => {
      it('calls /api/1.0/hoaxes/5?direction=after&sort=id,desc when hoax id is provided', () => {
        const mockGetHoaxes = jest.fn();
        axios.get = mockGetHoaxes;
        apiCalls.loadNewHoaxes(5);
        expect(mockGetHoaxes).toBeCalledWith('/api/1.0/hoaxes/5?direction=after&sort=id,desc')
      });

      it('calls /api/1.0/user3/hoaxes/5?direction=after&sort=id,desc when hoax id and username is provided', () => {
        const mockGetHoaxes = jest.fn();
        axios.get = mockGetHoaxes;
        apiCalls.loadNewHoaxes(5, 'user3');
        expect(mockGetHoaxes).toBeCalledWith('/api/1.0/users/user3/hoaxes/5?direction=after&sort=id,desc')
      });
      
    });

    describe('loadNewHoaxCount', () => {
      it('calls /api/1.0/hoaxes/5?direction=after&count=true', () => {
        const mockGetHoaxes = jest.fn();
        axios.get = mockGetHoaxes;
        apiCalls.loadNewHoaxCount(5);
        expect(mockGetHoaxes).toBeCalledWith('/api/1.0/hoaxes/5?direction=after&count=true')
      });

      it('calls /api/1.0/user3/hoaxes/5?direction=after&count=true is provided', () => {
        const mockGetHoaxes = jest.fn();
        axios.get = mockGetHoaxes;
        apiCalls.loadNewHoaxCount(5, 'user3');
        expect(mockGetHoaxes).toBeCalledWith('/api/1.0/users/user3/hoaxes/5?direction=after&count=true');
      });

      
    });
  }); 
});
