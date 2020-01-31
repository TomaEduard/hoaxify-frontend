import React from 'react';
import { render } from '@testing-library/react';
import HoaxView from './HoaxView';
import { MemoryRouter } from 'react-router-dom';


const setup = () => {
    const oneMinute = 60 * 1000;
    const date = new Date(new Date() - oneMinute);
    const hoax = {
        id:10,
        content: 'This is the first hoax',
        date: date,
        user: {
            id: 1,
            username: 'user1',
            displayName: 'display1',
            image: 'profile1.png'
        }
    };
    return render(
        <MemoryRouter>
            <HoaxView hoax={hoax} />
        </MemoryRouter>
    )
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
    });
});