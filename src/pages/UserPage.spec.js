import React from 'react';
import { render, waitForElement, fireEvent} from '@testing-library/react';
import UserPage from './UserPage';
import * as apiCalls from '../api/apiCalls';
import { Provider } from 'react-redux';
import configureStore from '../redux/configureStore';
import axios from 'axios';

const mockSuccessGetUser = {
    data: {
        id: 1,
        username: 'user1',
        displayName: 'display1',
        image: 'profile1.png'
    }
};

const mockFailGetUser = {
    response: {
        data: {
            message: 'User not found'
        }
    }
};

const mockSuccessUpdateUser = {
    response: {
        data: {
            id: 1,
            username: 'user1',
            displayName: 'display1-update',
            image: 'profile1-update.png'
        }
    }
};

const match = {
    params: {
        username: 'user1'
    }
};

const setup = (props) => {
    const store = configureStore(false);
    return render(
       <Provider store={store}>
            (<UserPage {...props} />)
        </Provider>
    );
};

beforeEach(() => {
    localStorage.clear();
    delete axios.defaults.headers.common['Authorization'];
});

const setUser1LoggedStorage = () => {
    localStorage.setItem(
      'hoax-auth',
      JSON.stringify({
        id: 1,
        username: 'user1',
        displayName: 'display1',
        image: 'profile1.png',
        password: 'P4ssword',
        isLoggedIn: true
      })
    );
  }

describe('UserPage', () => {
    describe('Layout', () => {
        it('has root page div', () => {
        const { queryByTestId } = setup();
        const userPageDiv = queryByTestId('userpage');
        expect(userPageDiv).toBeInTheDocument();
        });

        it('displays the displayName@username when user data loaded', async () => {
            apiCalls.getUser = jest.fn().mockResolvedValue(mockSuccessGetUser);
            const { queryByText } = setup({ match });
            const text = await waitForElement(() => queryByText('display1@user1'));
            expect(text).toBeInTheDocument();
        });

        it('displays not found alert when user not found', async () => {
            apiCalls.getUser = jest.fn().mockRejectedValue(mockFailGetUser);
            const { queryByText } = setup({ match });
            const alert = await waitForElement(() => queryByText('User not found!'));
            expect(alert).toBeInTheDocument();
        });

        it('displays spinner while loading user data',() => {
            const mockDelayedResponse = jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(mockSuccessGetUser)
                    }, 300)
                })
            })
            apiCalls.getUser = mockDelayedResponse;
            const { queryByText } = setup({ match });
            const spinner = queryByText('Loading...');
            expect(spinner).toBeInTheDocument();
        });

        it('displays the edit button when loggedInUser matches to user in url', async () => {
            setUser1LoggedStorage();    // save the user in localstorage
            apiCalls.getUser = jest.fn().mockResolvedValue(mockSuccessGetUser); // mock success result
            const { queryByText } = setup({ match });   
            await waitForElement(() => queryByText('display1@user1'));
            const editButton = queryByText('Edit')
            expect(editButton).toBeInTheDocument();
        });
    });

    describe('Lifecycle', () => {
        it('calls getUser when it is rendered', () => {
            apiCalls.getUser = jest.fn().mockResolvedValue(mockSuccessGetUser);
            setup({ match });
            expect(apiCalls.getUser).toHaveBeenCalledTimes(1);
        });

        it('calls getUser for user1 when it is rendered with user1 in match', () => {
            apiCalls.getUser = jest.fn().mockResolvedValue(mockSuccessGetUser);
            setup({ match });
            expect(apiCalls.getUser).toHaveBeenCalledWith('user1');
        });
    });

    describe('ProfileCard Interactions', () => {
        const setupForEdit = async () => {
            setUser1LoggedStorage();    // save the user in localstorage
            apiCalls.getUser = jest.fn().mockResolvedValue(mockSuccessGetUser); // mock success result
            const rendered = setup({ match });   
            const editButton = await waitForElement(() =>  rendered.queryByText('Edit'))
            fireEvent.click(editButton);
            return rendered;
        }

        it('displays edit layour when clicking edit button', async () => {
            const { queryByText } = await setupForEdit();
            expect(queryByText('Save')).toBeInTheDocument();
        });

        it('return back to none edit mode after clicking cancel', async () => {
            const { queryByText } = await setupForEdit();
           
            const cancelButton = queryByText('Cancel');
            fireEvent.click(cancelButton);

            expect(queryByText('Edit')).toBeInTheDocument();
        });

        it('calls updateUser api when clicking save', async () => {
            const { queryByText } = await setupForEdit();
            apiCalls.updateUser = jest.fn().mockResolvedValue(mockSuccessGetUser);

            const saveButton = queryByText('Save');
            fireEvent.click(saveButton);

            expect(apiCalls.updateUser).toHaveBeenCalledTimes(1);
        });

        it('calls updateUser api with user id', async () => {
            const { queryByText } = await setupForEdit();
            apiCalls.updateUser = jest.fn().mockResolvedValue(mockSuccessGetUser);

            const saveButton = queryByText('Save');
            fireEvent.click(saveButton);
            const userId = apiCalls.updateUser.mock.calls[0][0];

            expect(userId).toBe(1);
        }); 
        
        it('calls updateUser api with request body haveing changed displayName', async () => {
            const { queryByText, container} = await setupForEdit();
            apiCalls.updateUser = jest.fn().mockResolvedValue(mockSuccessGetUser);

            const displayInput = container.querySelector('input');
            fireEvent.change(displayInput, {target: {value: 'display1-update'}})

            const saveButton = queryByText('Save');
            fireEvent.click(saveButton);

            const requestBody = apiCalls.updateUser.mock.calls[0][1];

            expect(requestBody.displayName).toBe('display1-update');
        });

        it('return to non edit mode after sucessful updateUser api call', async () => {
            const { queryByText, container} = await setupForEdit();
            apiCalls.updateUser = jest.fn().mockResolvedValue(mockSuccessGetUser);

            const displayInput = container.querySelector('input');
            fireEvent.change(displayInput, {target: {value: 'display1-update'}})

            const saveButton = queryByText('Save');
            fireEvent.click(saveButton);

            const editButtonAfterClickingSave = await waitForElement(() => queryByText('Edit'));

            expect(editButtonAfterClickingSave).toBeInTheDocument();
        });

    });

});

console.error = () => {};
