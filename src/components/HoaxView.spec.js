import React from 'react';
import { render, fireEvent, waitForDomChange, queryAllByTestId, queryByText } from '@testing-library/react';
import HoaxView from './HoaxView';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import authReducer from '../redux/authReducer';

const loggedInStateUser1 = {
  id: 1,
  username: 'user1',
  displayName: 'display1',
  image: 'profile1.png',
  password: 'P4ssword',
  isLoggedIn: true
};

const loggedInStateUser2 = {
  id: 2,
  username: 'user2',
  displayName: 'display2',
  image: 'profile2.png',
  password: 'P4ssword',
  isLoggedIn: true
};

const hoaxWithoutAttachment = {
    id: 10,
    content: 'This is the first hoax',
    user: {
      id: 1,
      username: 'user1',
      displayName: 'display1',
      image: 'profile1.png'
    }
};

const hoaxWithAttachment = {
    id: 10,
    content: 'This is the first hoax',
    user: {
      id: 1,
      username: 'user1',
      displayName: 'display1',
      image: 'profile1.png'
    },
    attachment: {
        fileType: 'image/png',
        name: 'attachmed-image.png'
    }
};

const hoaxWithPdfAttachment = {
    id: 10,
    content: 'This is the first hoax',
    user: {
      id: 1,
      username: 'user1',
      displayName: 'display1',
      image: 'profile1.png'
    },
    attachment: {
        fileType: 'application/pdf',
        name: 'attachmed.pdf'
    }
};

const setup = (hoax = hoaxWithoutAttachment, state = loggedInStateUser1) => {
    const oneMinute = 60 * 1000;
    const date = new Date(new Date() - oneMinute);
    hoax.date = date;
    const store = createStore(authReducer, state);

    return render(
        <Provider store={store}>
            <MemoryRouter>
                <HoaxView hoax={hoax} />
            </MemoryRouter>
        </Provider>
    );
};

describe('HoaxView', () => {
    describe('Layout', () => {
        it('display hoax content', () => {
            const { queryByText } = setup();
            expect(queryByText('This is the first hoax')).toBeInTheDocument();
        });

        it('display user image', () => {
            const { container } = setup();
            const image = container.querySelector('img');
            expect(image.src).toContain('/images/profile/profile1.png');
        });

        it('display displayName', () => {
            const { queryByText } = setup();
            expect(queryByText('display1@user1')).toBeInTheDocument();
        });

        it('display relative time', () => {
            const { queryByText } = setup();
            expect(queryByText('1 minute ago')).toBeInTheDocument();
        });

        it('has link to user page', () => {
            const { container } = setup();
            const anchor = container.querySelector('a');
            expect(anchor.getAttribute('href')).toBe('/user1');
        });

        it('display file attachment image', () => {
            const { container } = setup(hoaxWithAttachment);
            const images = container.querySelectorAll('img');
            expect(images.length).toBe(2);
        });

        it('display file attachment image', () => {
            const { container } = setup(hoaxWithAttachment);
            const images = container.querySelectorAll('img');
            expect(images.length).toBe(2);
        });
        
        it('display file attachment when attachment type is not image', () => {
            const { container } = setup(hoaxWithPdfAttachment);
            const images = container.querySelectorAll('img');
            expect(images.length).toBe(1);
        });

        it('sets the attachment path as source for file attachment image', () => {
            const { container } = setup(hoaxWithAttachment);
            const images = container.querySelectorAll('img');
            const attachmentImage = images[1];
            expect(attachmentImage.src).toContain('/images/attachments/' + hoaxWithAttachment.attachment.name
            );
        });

        it('displays delete button when hoax owned by logged in user', () => {
            const { container } = setup();
            expect(container.querySelector('button')).toBeInTheDocument();
        });

        
    });
});