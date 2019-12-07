import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UserSignupPage } from './UserSignupPage';
import { exportAllDeclaration } from '@babel/types';

describe('UserSignupPage', () => {
    
    describe('Layout', () => {

        it('has header of Sign up', () => {
            const { container } = render(<UserSignupPage />)
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Sign Up')
        })

    })
})