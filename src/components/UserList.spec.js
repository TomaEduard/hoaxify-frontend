import React from 'react';
import { render, waitForDomChange, waitForElement, fireEvent} from '@testing-library/react';
import UserList from './UserList';
import * as apiCalls from '../api/apiCalls';

const setup = () => {
    return render(<UserList />);
}

apiCalls.listUsers = jest.fn().mockResolvedValue({
    data: {
      content: [],
      number: 0,
      size: 3
    }
});

const mockedEmptySuccessResponse = {
    data:{
        content: [],
        number: 0,
        size: 3
    }
}

const mockSuccessGetSinglePage = {
    data: {
        content: [
            {
                username: 'user1',
                displayName: 'display1',
                image: ''
            },
            {
                username: 'user2',
                displayName: 'display2',
                image: ''
            },
            {
                username: 'user3',
                displayName: 'display3',
                image: ''
            },
        ],
        number: 0,
        first: true,
        last: true,
        size: 3,
        totalPages: 1
    }
};

const mockSuccessGetMultiPageFirst = {
    data: {
        content: [
            {
                username: 'user1',
                displayName: 'display1',
                image: ''
            },
            {
                username: 'user2',
                displayName: 'display2',
                image: ''
            },
            {
                username: 'user3',
                displayName: 'display3',
                image: ''
            },
        ],
        number: 0,
        first: true,
        last: false,
        size: 3,
        totalPages: 2
    }
};

const mockSuccessGetMultiPageLast = {
    data: {
        content: [
            {
                username: 'user4',
                displayName: 'display4',
                image: ''
            },
            {
                username: 'user5',
                displayName: 'display5',
                image: ''
            },
            {
                username: 'user6',
                displayName: 'display6',
                image: ''
            },
        ],
        number: 1,
        first: false,
        last: true,
        size: 3,
        totalPages: 2
    }
};

describe('UserList', () => {

    describe('Layout', () => {
        it('has header of Users', () => {
            const { container } = setup();
            const header = container.querySelector('h3');
            expect(header).toHaveTextContent('Users');
        });

        it('display three items when listUser api return 3 users', async () => {
            apiCalls.listUsers = jest.fn().mockResolvedValue(mockSuccessGetSinglePage);
            const { queryByTestId } = setup();
            await waitForDomChange();
            const userGroup = queryByTestId('usergroup');
            expect(userGroup.childElementCount).toBe(3);
        });

        it('display the displayName@username when listUser api returns users', async () => {
            apiCalls.listUsers = jest.fn().mockResolvedValue(mockSuccessGetSinglePage);
            const { queryByText } = setup();
            const firstUser = await waitForElement(() => 
                queryByText('display1@user1')
            );
            expect(firstUser).toBeInTheDocument();
        });

        it('display the next button when response has last value as false', async () => {
            apiCalls.listUsers = jest.fn().mockResolvedValue(mockSuccessGetMultiPageFirst);
            const { queryByText } = setup();
            const nextLink = await waitForElement(() => 
                queryByText('next >')
            );
            expect(nextLink).toBeInTheDocument();
        });

        it('hide the next button when response has last = true', async () => {
            apiCalls.listUsers = jest.fn().
            mockResolvedValue(mockSuccessGetMultiPageLast);
            const { queryByText } = setup();
            const nextLink = await waitForElement(() => 
                queryByText('next >')
            );
            expect(nextLink).not.toBeInTheDocument();
        });

        it('display the previous button when response has first value = false', async () => {
            apiCalls.listUsers = jest.fn().
            mockResolvedValue(mockSuccessGetMultiPageLast);
            const { queryByText } = setup();
            const previousLink = await waitForElement(() => 
                queryByText('< previous')
            );
            expect(previousLink).toBeInTheDocument();
        });
        
        it('hide the previous button when response has first value = true', async () => {
            apiCalls.listUsers = jest.fn().
            mockResolvedValue(mockSuccessGetMultiPageFirst);
            const { queryByText } = setup();
            const previousLink = await waitForElement(() => 
                queryByText('< previous')
            );
            expect(previousLink).not.toBeInTheDocument();
        });
    });

    describe('Lifecyle', () => {

        it('calls listUsers api when it is rendered', () => {
            apiCalls.listUsers = jest.fn().mockResolvedValue(mockedEmptySuccessResponse);
            setup();
            expect(apiCalls.listUsers).toHaveBeenCalledTimes(1);
        });

        it('calls listUsers method with page 0 and size 3', () => {
            apiCalls.listUsers = jest.fn().mockResolvedValue(mockedEmptySuccessResponse);
            setup();
            expect(apiCalls.listUsers).toHaveBeenCalledWith({ page:0, size: 3 });
        });

    });

    describe('Interactions', () => {

        it('load next page when click to next button', async () => {
            apiCalls.listUsers = jest.fn()
            .mockResolvedValueOnce(mockSuccessGetMultiPageFirst)
            .mockResolvedValueOnce(mockSuccessGetMultiPageLast);
            const { queryByText } = setup();
            const nextLink = await waitForElement(() => 
                queryByText('next >')
            );
            fireEvent.click(nextLink);

            const secondPageUser = await waitForElement(() => queryByText('display4@user4'))
            expect(secondPageUser).toBeInTheDocument();
        });

        it('load previous page when click to previuos button', async () => {
            apiCalls.listUsers = jest.fn()
            .mockResolvedValueOnce(mockSuccessGetMultiPageLast)
            .mockResolvedValueOnce(mockSuccessGetMultiPageFirst);
            const { queryByText } = setup();
            const previousLink = await waitForElement(() => 
                queryByText('< previous')
            );
            fireEvent.click(previousLink);

            const firstPageUser = await waitForElement(() => queryByText('display1@user1'))
            expect(firstPageUser).toBeInTheDocument();
        });

    });
});

console.error = () => {};
