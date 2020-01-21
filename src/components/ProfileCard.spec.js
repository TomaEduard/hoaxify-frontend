import React from 'react';
import { render } from '@testing-library/react';
import ProfileCard from './ProfileCard';

const user = {
    id: 1,
    username: 'user1',
    displayName: 'display1',
    image: 'profile1.png'
};

describe('ProfileCard', () => {
    describe('Layout', () => {

        it('display the displayName@username ', () => {
            const { queryByText } = render(<ProfileCard user={user} />);
            const userInfo = queryByText('display1@user1');
            expect(userInfo).toBeInTheDocument();
        });
        
        it('has image', () => {
            const { container } = render(<ProfileCard user={user} />);
            const image = container.querySelector('img');
            expect(image).toBeInTheDocument();
        });

        it('display default image when user does not have one', () => {
            const userWithoutImage = {
                ...user,
                image: undefined
            }
            const { container } = render(<ProfileCard user={userWithoutImage} />);
            const image = container.querySelector('img');
            expect(image.src).toContain('/profile.png');
        });

        it('display user image if user has one', () => {
             const { container } = render(<ProfileCard user={user} />);
            const image = container.querySelector('img');
            expect(image.src).toContain('/images/profile/'+ user.image);
        });

        it('display the edit button when editable property set as true', () => {
            const { queryByText } = render(<ProfileCard user={user} isEditable={true}/>);
            const editButton = queryByText('Edit');
            expect(editButton).toBeInTheDocument();
        });

        it('does not display the edit button when isEditable not provide', () => {
            const { queryByText } = render(<ProfileCard user={user} />);
            const editButton = queryByText('Edit');
            expect(editButton).not.toBeInTheDocument();
        });
    });
});